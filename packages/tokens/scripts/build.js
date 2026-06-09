#!/usr/bin/env node
/**
 * Lightweight token build pipeline (no external deps).
 * Reads src/tokens.json, flattens it, and emits:
 *   dist/css/variables.css    - CSS custom properties on :root
 *   dist/scss/_variables.scss - SCSS variables
 *   dist/tokens.json          - flattened {cssVar, scssVar, path, value}[]
 *   dist/index.js / index.d.ts / index.mjs - JS/TS exports (nested + flat map)
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src', 'tokens.json');
const OUT = path.join(__dirname, '..', 'dist');

const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));

/** Walk the nested token tree, collecting leaf entries. */
function flatten(node, trail = []) {
  const entries = [];
  if (node && typeof node === 'object') {
    if ('value' in node) {
      entries.push({ path: trail, value: node.value });
      return entries;
    }
    if ('fg' in node || 'bg' in node) {
      if ('fg' in node) entries.push({ path: [...trail, 'fg'], value: node.fg });
      if ('bg' in node) entries.push({ path: [...trail, 'bg'], value: node.bg });
      return entries;
    }
    for (const key of Object.keys(node)) {
      entries.push(...flatten(node[key], [...trail, key]));
    }
  }
  return entries;
}

const entries = flatten(raw).map((e) => {
  const kebabPath = e.path.map(toKebab);
  const camelPath = e.path.map((p, i) => (i === 0 ? p : capitalize(p)));
  return {
    path: e.path,
    value: e.value,
    cssVar: `--mg-${kebabPath.join('-')}`,
    scssVar: `$mg-${kebabPath.join('-')}`,
    jsKey: camelPath.join('.'),
  };
});

function toKebab(s) {
  return String(s).replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

fs.mkdirSync(path.join(OUT, 'css'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'scss'), { recursive: true });

// 1. CSS custom properties
const cssLines = [
  '/**',
  ' * @mygarage/design-tokens — generated, do not edit by hand.',
  ' * Run `npm run build` from packages/tokens to regenerate from src/tokens.json',
  ' */',
  ':root {',
  ...entries.map((e) => `  ${e.cssVar}: ${e.value};`),
  '}',
  '',
];
fs.writeFileSync(path.join(OUT, 'css', 'variables.css'), cssLines.join('\n'));

// 2. SCSS variables
const scssLines = [
  '// @mygarage/design-tokens — generated, do not edit by hand.',
  ...entries.map((e) => `${e.scssVar}: ${e.value};`),
  '',
];
fs.writeFileSync(path.join(OUT, 'scss', '_variables.scss'), scssLines.join('\n'));

// 3. Flattened JSON (useful for style-dictionary-style consumers / theming tools)
fs.writeFileSync(
  path.join(OUT, 'tokens.json'),
  JSON.stringify(entries, null, 2) + '\n'
);

// 4. JS/TS exports — nested object mirroring src + a flat `cssVar` lookup map
function buildNested(node) {
  if (node && typeof node === 'object') {
    if ('value' in node) return node.value;
    if ('fg' in node || 'bg' in node) {
      const out = {};
      if ('fg' in node) out.fg = node.fg;
      if ('bg' in node) out.bg = node.bg;
      return out;
    }
    const out = {};
    for (const key of Object.keys(node)) out[key] = buildNested(node[key]);
    return out;
  }
  return node;
}
const nested = buildNested(raw);

const cssVarMap = {};
for (const e of entries) cssVarMap[e.jsKey] = e.cssVar;

const jsBanner = '// @mygarage/design-tokens — generated, do not edit by hand.\n';
const esmSource =
  jsBanner +
  `export const tokens = ${JSON.stringify(nested, null, 2)};\n\n` +
  `export const cssVar = ${JSON.stringify(cssVarMap, null, 2)};\n\n` +
  'export default tokens;\n';
fs.writeFileSync(path.join(OUT, 'index.mjs'), esmSource);

const cjsSource =
  jsBanner +
  `const tokens = ${JSON.stringify(nested, null, 2)};\n\n` +
  `const cssVar = ${JSON.stringify(cssVarMap, null, 2)};\n\n` +
  'module.exports = { tokens, cssVar };\nmodule.exports.default = tokens;\n';
fs.writeFileSync(path.join(OUT, 'index.js'), cjsSource);

const dtsSource =
  jsBanner +
  'export type TokenTree = Record<string, any>;\n' +
  'export declare const tokens: TokenTree;\n' +
  'export declare const cssVar: Record<string, string>;\n' +
  'declare const _default: TokenTree;\n' +
  'export default _default;\n';
fs.writeFileSync(path.join(OUT, 'index.d.ts'), dtsSource);

console.log(`✓ tokens build complete — ${entries.length} tokens emitted to dist/`);
