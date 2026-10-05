/* Only paste IDs actually issued by Amazon into trackingIds. null keeps the existing ID. */
(() => {
  "use strict";
  const defaultTrackingId = "carila0e-22";
  const trackingIds = Object.freeze({
    bar_recommend: null,
    bar_ingredients: null,
    bar_search: null,
    bar_history: null,
    bar_goods: null
  });
  const trackingId = placement => (Object.prototype.hasOwnProperty.call(trackingIds, placement) &&
    trackingIds[placement]) || defaultTrackingId;
  const searchUrl = (query, placement) => "https://www.amazon.co.jp/s?k=" +
    encodeURIComponent(query) + "&tag=" + encodeURIComponent(trackingId(placement));
  const properties = link => {
    const url = new URL(link.href, location.href);
    const placement = link.dataset.amazonPlacement;
    if (url.protocol !== "https:" || !["amazon.co.jp", "www.amazon.co.jp"].includes(url.hostname) ||
        !Object.prototype.hasOwnProperty.call(trackingIds, placement)) return null;
    return {provider: "amazon", projectId: "bar-carila", placement,
      trackingId: url.searchParams.get("tag") || ""};
  };
  window.CarilaAmazon = Object.freeze({trackingId, searchUrl, properties});
  // Static goods links keep their existing href as the no-JavaScript fallback.
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[data-amazon-placement="bar_goods"]').forEach(link => {
      const url = new URL(link.href, location.href);
      if (!properties(link)) return;
      url.searchParams.set("tag", trackingId("bar_goods"));
      link.href = url.href;
    });
  }, {once: true});
  document.addEventListener("click", event => {
    const link = event.target?.closest?.("a[data-amazon-placement]");
    if (!link) return;
    let payload;
    try { payload = properties(link); } catch (_) { return; }
    if (!payload) return;
    // The Control tracker is the sole sender; GA4 is not used as a second sink.
    const send = attempt => {
      try {
        if (typeof window.carilaTrack === "function") window.carilaTrack("affiliate_click", payload);
        else if (attempt < 8) setTimeout(() => send(attempt + 1), 250);
      } catch (_) { /* Analytics failures must never block navigation. */ }
    };
    send(0);
  }, true);
})();
