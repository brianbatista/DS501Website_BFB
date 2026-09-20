import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
function rebuild() {
  const result = spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: root, stdio: 'inherit' });
  return result.status === 0;
}
if (!rebuild()) process.exit(1);
let timer;
for (const dir of ['src', 'public']) watch(resolve(root, dir), { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(rebuild, 100);
});
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(output, `.${path}`);
    if (file !== output && !file.startsWith(output + sep)) { res.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(resolve(output, '404.html')));
  }
}).listen(5173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:5173'));
