// The Pilgrim's Path — dev server
// Usage: node server.js
// Serves the game at http://localhost:3000
// Exposes POST /dev/save to write node edits back to JSON
// Type "oor" in-game to toggle edit mode

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html',
  '.js':   'text/javascript',
  '.json': 'application/json',
  '.css':  'text/css',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
};

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // ── save endpoint ──────────────────────────────
  if (req.method === 'POST' && req.url === '/dev/save') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { character, nodeId, updates } = JSON.parse(body);
        const file = path.join(ROOT, 'story_nodes', `${character}_nodes.json`);
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        const node = data.nodes.find(n => n.id === nodeId);
        if (!node) throw new Error(`Node not found: ${nodeId}`);
        Object.assign(node, updates);
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  // ── static file serving ────────────────────────
  const url  = req.url.split('?')[0];
  const file = path.normalize(path.join(ROOT, url === '/' ? 'index.html' : url));

  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  if (!fs.existsSync(file))   { res.writeHead(404); res.end('Not found'); return; }

  const mime = MIME[path.extname(file)] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': mime });
  fs.createReadStream(file).pipe(res);

}).listen(PORT, () => {
  console.log('\n  ◈  The Pilgrim\'s Path');
  console.log(`  ◈  http://localhost:${PORT}`);
  console.log('  ◈  Type "oor" in-game to toggle edit mode\n');
});
