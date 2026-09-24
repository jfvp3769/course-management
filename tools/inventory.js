/*
 * Inventory: which JS modules under src/ does index.html actually load, and
 * which does sw.js precache? Anything listed in neither is unreachable code.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const html = read('index.html');
const htmlModules = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const sw = read('sw.js');
const swBlock = sw.match(/const MODULES = \[([\s\S]*?)\];/);
const swModules = swBlock ? [...swBlock[1].matchAll(/'([^']+)'/g)].map((m) => m[1].replace(/^\.\//, '')) : [];

const walk = (d) => fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name).replace(/\\/g, '/')]));
const srcJs = walk('src').filter((f) => f.endsWith('.js')).sort();

const norm = (p) => p.replace(/^\.\//, '');
const inHtml = new Set(htmlModules.map(norm));
const inSw = new Set(swModules.map(norm));

console.log(`index.html <script src> tags : ${htmlModules.length}`);
console.log(`sw.js MODULES entries        : ${swModules.length}`);
console.log(`src/**/*.js files on disk    : ${srcJs.length}`);
console.log('');

const notLoaded = srcJs.filter((f) => !inHtml.has(f));
const notCached = srcJs.filter((f) => !inSw.has(f));
console.log(`loaded by index.html? NO  (${notLoaded.length}):`);
notLoaded.forEach((f) => console.log('   ' + f));
console.log('');
console.log(`precached by sw.js?   NO  (${notCached.length}):`);
notCached.forEach((f) => console.log('   ' + f));
console.log('');
console.log(`in index.html but missing on disk (${htmlModules.filter((m) => !fs.existsSync(path.join(ROOT, m))).length})`);
console.log(`duplicate entries in index.html (${htmlModules.length - inHtml.size})`);
console.log(`duplicate entries in sw.js      (${swModules.length - inSw.size})`);
