/* Only paste IDs actually issued by Amazon into trackingIds. null keeps the existing ID. */
(() => {
  "use strict";
  const defaultTrackingId = "carila0e-22";
  const trackingIds = Object.freeze({
    bar_recommend: "carilabrecommend-22",
    bar_ingredients: "carilabrecipe-22",
    bar_search: "carilabsearch-22",
    bar_history: "carilabhistory-22",
    bar_goods: "carilabgoods-22"
  });
  const trackingId = placement => (Object.prototype.hasOwnProperty.call(trackingIds, placement) &&
    trackingIds[placement]) || defaultTrackingId;
  const searchUrl = (query, placement) => "https://www.amazon.co.jp/s?k=" +
    encodeURIComponent(query) + "&tag=" + encodeURIComponent(trackingId(placement));
  const properties = link => {
    try {
      const url = new URL(link.href, location.href);
      const placement = link.dataset.amazonPlacement;
      if (url.protocol !== "https:" || !["amazon.co.jp", "www.amazon.co.jp"].includes(url.hostname) ||
          !Object.prototype.hasOwnProperty.call(trackingIds, placement)) return null;
      return {provider: "amazon", projectId: "bar-carila", placement,
        trackingId: url.searchParams.get("tag") || ""};
    } catch (_) { return null; }
  };
  window.CarilaAmazon = Object.freeze({trackingId, searchUrl, properties});

  // PWA metadata is bootstrapped here because this helper already loads before main.js on every BarCarila page.
  // Each operation is additive and guarded so PWA decoration can never block the core app.
  const ensureHeadLink = (rel, href, attrs = {}) => {
    if (!document.head || !document.createElement || document.head.querySelector?.(`link[rel="${rel}"]`)) return;
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    Object.entries(attrs).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
  };
  const ensureMeta = (name, content) => {
    if (!document.head || !document.createElement || document.head.querySelector?.(`meta[name="${name}"]`)) return;
    const meta = document.createElement("meta");
    meta.name = name;
    meta.content = content;
    document.head.appendChild(meta);
  };
  try {
    const viewport = document.querySelector?.('meta[name="viewport"]');
    if (viewport && !viewport.content.includes("viewport-fit=cover")) viewport.content += ",viewport-fit=cover";
    ensureHeadLink("manifest", "/manifest.webmanifest?v=20261006-pwa2");
    ensureHeadLink("apple-touch-icon", "/barcarila-icon.svg?v=20261006-pwa2");
    ensureHeadLink("stylesheet", "/assets/css/pwa.css?v=20261006-pwa2");
    ensureMeta("theme-color", "#0a0c0a");
    ensureMeta("apple-mobile-web-app-capable", "yes");
    ensureMeta("apple-mobile-web-app-status-bar-style", "black-translucent");
    ensureMeta("apple-mobile-web-app-title", "Bar Carila");
  } catch (_) { /* PWA decoration must never block core UI. */ }

  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const safeAmazonSearchUrl = (query, placement) => {
    try {
      return typeof window.CarilaAmazon?.searchUrl === "function"
        ? window.CarilaAmazon.searchUrl(String(query ?? ""), placement)
        : "";
    } catch (_) { return ""; }
  };
  const affiliateSearchLinks = searchTerm => {
    const query = String(searchTerm || "").trim();
    if (!query) return "";
    const amazonHref = safeAmazonSearchUrl(query, "bar_search");
    const amazon = amazonHref
      ? `<a class="search-result-link" data-amazon-placement="bar_search" href="${escapeHtml(amazonHref)}" target="_blank" rel="noopener">Amazon で探す</a>`
      : "";
    const rakutenHref = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(query)}/?l2-id=1000&a_id=51ff76f6.9c656021.51ff76f7.1d6ddd8e`;
    return `<div class="search-result-links">${amazon}<a class="search-result-link" href="${escapeHtml(rakutenHref)}" target="_blank" rel="noopener">楽天市場で探す</a></div>`;
  };
  const suggestionHtml = (label, values) => {
    const items = Array.isArray(values) ? values.filter(value => typeof value === "string" && value.trim()).slice(0, 6) : [];
    if (!items.length) return "";
    return `<div class="search-suggest"><div class="search-suggest-label">${escapeHtml(label)}</div><div class="search-suggest-btns">${items.map(value => `<button class="search-suggest-btn" type="button" data-search-name="${escapeHtml(value)}">${escapeHtml(value)}</button>`).join("")}</div></div>`;
  };
  const bindSearchSuggestions = results => {
    results.querySelectorAll?.("[data-search-name]").forEach(button => {
      button.addEventListener("click", () => window.searchFor?.(button.dataset.searchName || ""));
    });
  };
  const parseSearchPayload = data => {
    const text = data?.content?.find?.(item => item?.type === "text")?.text || data?.content?.[0]?.text;
    if (typeof text !== "string" || !text.trim()) throw new Error("missing search payload");
    const clean = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    try { return JSON.parse(clean); } catch (_) {}
    const first = clean.indexOf("{");
    const last = clean.lastIndexOf("}");
    if (first >= 0 && last > first) return JSON.parse(clean.slice(first, last + 1));
    throw new Error("malformed search payload");
  };
  const requestSearchPayload = async (query, system, attempt = 0) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({model: "claude-haiku-4-5-20251001", max_tokens: 450, system,
        messages: [{role: "user", content: `「${query}」について教えてください。JSONだけを返してください。`}]})
    });
    if (!response.ok) throw new Error(`search HTTP ${response.status}`);
    try {
      return parseSearchPayload(await response.json());
    } catch (error) {
      if (attempt < 1) return requestSearchPayload(query, system, attempt + 1);
      throw error;
    }
  };
  const installResilientDrinkSearch = () => {
    if (typeof document.getElementById !== "function" || typeof window.doSearch !== "function") return;
    window.doSearch = async function resilientDrinkSearch() {
      const input = document.getElementById("searchInput");
      const results = document.getElementById("searchResults");
      const query = input?.value?.trim?.() || "";
      if (!query || !results) return;
      results.innerHTML = '<div class="search-empty">……調べています</div>';
      const system = `あなたはお酒の専門家です。ユーザーが入力したお酒名を分析してJSONのみで返答してください。
入力がお酒として特定できる場合: {"found":true,"name":"正式名","category":"カテゴリ","description":"説明2〜3文","tip":"バーでの楽しみ方・豆知識","search_ja":"Amazon/楽天検索用ワード","similar":["似たお酒1","似たお酒2","似たお酒3"]}
特定できない場合: {"found":false,"suggestions":["候補1","候補2","候補3"],"message":"メッセージ"}`;
      try {
        const payload = await requestSearchPayload(query, system);
        if (payload?.found) {
          const name = String(payload.name || query);
          const category = String(payload.category || "");
          const description = String(payload.description || "");
          const tip = String(payload.tip || "");
          let imageUrl = "";
          try { imageUrl = typeof getDrinkImg === "function" ? getDrinkImg(name, category) : ""; } catch (_) {}
          const image = imageUrl
            ? `<div class="search-result-image"><img src="${escapeHtml(imageUrl)}" alt="" loading="lazy"></div>`
            : "";
          // Core search content is committed first. Shopping helpers are appended separately and cannot erase it.
          const core = `<div class="search-result-card">${image}<div class="search-result-name">${escapeHtml(name)}</div><div class="search-result-cat">${escapeHtml(category)}</div><div class="search-result-desc">${escapeHtml(description)}</div>${tip ? `<div class="search-result-tip">${escapeHtml(tip)}</div>` : ""}</div>`;
          results.innerHTML = core + suggestionHtml("似たお酒", payload.similar);
          try {
            const card = results.querySelector?.(".search-result-card");
            const shopping = affiliateSearchLinks(payload.search_ja || name);
            if (card && shopping) card.insertAdjacentHTML("beforeend", shopping);
          } catch (affiliateError) {
            console.warn("BarCarila affiliate links unavailable", affiliateError);
          }
        } else {
          results.innerHTML = `<div class="search-empty">${escapeHtml(payload?.message || "見つかりませんでした")}</div>` + suggestionHtml("もしかしてこちら？", payload?.suggestions);
        }
        bindSearchSuggestions(results);
      } catch (error) {
        console.error("BarCarila drink search failed", error);
        results.innerHTML = '<div class="search-empty">……少し調子が悪いようです。もう一度お試しください。</div>';
      }
    };
    window.searchFor = name => {
      const input = document.getElementById("searchInput");
      if (input) input.value = name;
      return window.doSearch();
    };
  };

  // Static goods links keep their existing href as the no-JavaScript fallback.
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[data-amazon-placement="bar_goods"]').forEach(link => {
      const url = new URL(link.href, location.href);
      if (!properties(link)) return;
      url.searchParams.set("tag", trackingId("bar_goods"));
      link.href = url.href;
    });
    installResilientDrinkSearch();
  }, {once: true});
  document.addEventListener("click", event => {
    const link = event.target?.closest?.("a[data-amazon-placement]");
    if (!link) return;
    const payload = properties(link);
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
