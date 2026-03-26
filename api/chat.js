const https = require('https');
 
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
 
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });
 
  try {
    const body = JSON.stringify(req.body);
 
    const data = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        }
      };
 
      const request = https.request(options, (response) => {
        const chunks = [];
        response.on('data', (chunk) => { chunks.push(chunk); });
        response.on('end', () => {
          try {
            const rawData = Buffer.concat(chunks).toString('utf8');
            resolve({ status: response.statusCode, body: JSON.parse(rawData) });
          } catch (e) {
            reject(new Error('JSON parse error'));
          }
        });
      });
 
      request.on('error', reject);
      request.write(body);
      request.end();
    });
 
    return res.status(data.status).json(data.body);
  } catch (err) {
    console.error('API Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
