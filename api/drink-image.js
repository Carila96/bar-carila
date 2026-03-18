// Vercel Serverless Function: drink-image.js
// Fetches drink images from Unsplash API on-demand and caches results

const UNSPLASH_KEY = 'PvuIbcA8fbAJQHGdYpPoYIHkTBaxtUmwH2jKiFTmjlo';

// Simple in-memory cache (persists within same serverless instance)
const cache = {};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // 24h browser cache
  
  const { name, query } = req.query;
  if (!name && !query) return res.status(400).json({ error: 'name or query required' });
  
  const cacheKey = (name || query).toLowerCase();
  if (cache[cacheKey]) return res.json({ url: cache[cacheKey] });
  
  const searchQuery = query || (name + ' cocktail drink');
  
  try {
    const r = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=3&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );
    const data = await r.json();
    if (data.results && data.results.length > 0) {
      const url = data.results[0].urls.regular.split('?')[0] + '?w=800&auto=format&fit=crop';
      cache[cacheKey] = url;
      return res.json({ url });
    }
    return res.json({ url: null });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
