// Генератор токенов: tools/raw/*.txt (экспорт из Figma «02 — Tokens») -> tokens/*.json + src/styles/tokens.css + src/tokens/registry.json
// Локальные токены (код первичен, в Figma ещё нет): tools/raw/local.txt — секции ## Theme / ## Layout / ## Components, формат строк как в одноимённых raw.
// Запуск: node tools/build-tokens.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const raw = (f) => readFileSync(join(root, 'tools/raw', f), 'utf8').split(/\r?\n/).filter(Boolean);
const out = (p, s) => { mkdirSync(dirname(join(root, p)), { recursive: true }); writeFileSync(join(root, p), s); };

// ---------- парсинг ----------
const prim = new Map(); // "Collection/name" -> {type, value}
let coll = '';
for (const f of ['primitives.txt', 'typography-theme.txt']) {
  let section = '';
  for (const line of raw(f)) {
    if (line.startsWith('## ')) { section = line.slice(3); coll = section.replace('Primitives -- ', ''); continue; }
    if (section.startsWith('Semantic')) continue;
    const [name, t, value] = line.split('|');
    const key = `${coll}/${name}`;
    prim.set(key, { type: t, value: t === 'F' ? Number(value) : value });
  }
}

const theme = new Map(); // name -> {type, value: alias|literal}
{
  let on = false;
  for (const line of raw('typography-theme.txt')) {
    if (line.startsWith('## ')) { on = line === '## Semantic -- Theme'; continue; }
    if (!on) continue;
    const [name, t, value] = line.split('|');
    theme.set(name, { type: t, value });
  }
}

const layout = new Map(); // name -> {type, desktop, mobile}
for (const line of raw('layout.txt').slice(1)) {
  const [name, t, v] = line.split('|');
  const [d, m = d] = v.split(';');
  layout.set(name, { type: t, desktop: d, mobile: m });
}

const comps = new Map();
for (const line of raw('components.txt').slice(1)) {
  const [name, t, value] = line.split('|');
  comps.set(name, { type: t, value });
}

// ---------- локальные токены (tools/raw/local.txt) ----------
// Экспорт из Figma этот файл не затрагивает. Совпадение имени с экспортом Figma — ошибка: строку пора убрать из local.txt.
const localKeys = new Set(); // "layer:name"
const localErrors = [];
let section = '';
for (const line of raw('local.txt')) {
  if (line.startsWith('## ')) { section = line.slice(3).trim(); continue; }
  if (line.startsWith('#')) continue;
  const [name, t, value] = line.split('|');
  const target_ = section === 'Primitives' ? prim : section === 'Theme' ? theme : section === 'Layout' ? layout : section === 'Components' ? comps : null;
  if (!target_) { localErrors.push(`local.txt: неизвестная секция "${section}" для ${name}`); continue; }
  if (target_.has(name)) { localErrors.push(`local.txt: ${section}/${name} уже есть в экспорте Figma — удалите строку из local.txt`); continue; }
  if (section === 'Layout') { const [d, m = d] = value.split(';'); layout.set(name, { type: t, desktop: d, mobile: m }); }
  else if (section === 'Primitives') prim.set(name, { type: t, value: t === 'F' ? Number(value) : value }); // имя целиком: Colors/Black/alpha-32
  else target_.set(name, { type: t, value });
  localKeys.add(`${section.toLowerCase()}:${name}`);
}

// ---------- алиасы ----------
// @Primitives:Colors/Gray/25 | @P:Spacing/Spacing/0 -> prim; @T:name -> theme; @L:name -> layout
function target(alias) {
  const m = alias.match(/^@(Primitives:|P:|T:|L:)(.+)$/);
  if (!m) throw new Error('bad alias ' + alias);
  const [, k, name] = m;
  if (k === 'T:') return { layer: 'theme', name };
  if (k === 'L:') return { layer: 'layout', name };
  return { layer: 'prim', name };
}
const isAlias = (v) => typeof v === 'string' && v.startsWith('@');

// ---------- имена CSS ----------
const kebab = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/\/-/g, '/neg-').replace(/\//g, '-');
const primVar = (key) => {
  const [c, ...rest] = key.split('/');
  const n = rest.join('/');
  if (c === 'Colors') return `--prim-color-${kebab(n)}`;
  return `--prim-${kebab(n)}`; // Spacing/400, Radius/600, Font-size/100, Stroke/100 ... — имя уже несёт группу
};
const varName = (layer, name) => layer === 'prim' ? primVar(name) : layer === 'theme' ? `--${kebab(name)}` : `--${kebab(name)}`;
const compVar = (name) => `--c-${kebab(name)}`;

// ---------- форматирование значений ----------
const isOpacity = (name) => /^Opacity\//.test(name);
const unitless = (name) => /^Grid\/columns$|Font-weight/.test(name);
function fmtLiteral(name, type, value) {
  if (type === 'C') return value;
  if (type === 'S') {
    if (/Font-family\/(sans|base)$/.test(name)) return '"Inter", system-ui, sans-serif';
    if (/Font-family\/mono$/.test(name)) return '"Geist Mono", ui-monospace, monospace';
    return /^\d+$/.test(value) ? value : `"${value}"`;
  }
  const n = Number(value);
  if (isOpacity(name)) return String(n / 100);
  if (unitless(name)) return String(n);
  return n === 0 ? '0' : `${n}px`;
}
const ref = (a) => { const t = target(a); return `var(${varName(t.layer, t.name)})`; };

// ---------- проверка алиасов ----------
const errors = [...localErrors];
const check = (where, a) => {
  if (!isAlias(a)) return;
  const t = target(a);
  const ok = t.layer === 'prim' ? prim.has(t.name) : t.layer === 'theme' ? theme.has(t.name) : layout.has(t.name);
  if (!ok) errors.push(`${where} -> ${a}`);
};
theme.forEach((v, k) => check('Theme ' + k, v.value));
layout.forEach((v, k) => { check('Layout ' + k + ' [D]', v.desktop); check('Layout ' + k + ' [M]', v.mobile); });
comps.forEach((v, k) => check('Components ' + k, v.value));

// ---------- разрешение до значения (для витрины и контраста) ----------
function resolve(layer, name, mode = 'desktop') {
  const rec = layer === 'prim' ? prim.get(name) : layer === 'theme' ? theme.get(name) : layout.get(name);
  const v = layer === 'prim' ? rec.value : layer === 'layout' ? rec[mode] : rec.value;
  if (isAlias(v)) { const t = target(v); return resolve(t.layer, t.name, mode); }
  return { type: rec.type, value: layer === 'layout' && /^\d+$/.test(v) ? Number(v) : v, name };
}
const resolvedOf = (layer, name, mode) => {
  const r = resolve(layer, name, mode);
  return r.type === 'F' ? Number(r.value) : r.value;
};

// ---------- tokens/*.json ----------
const jsonTok = (v, layer) => isAlias(v)
  ? { $value: (() => { const t = target(v); return `{${t.layer}.${t.name}}`; })() }
  : { $value: v };

const o = (layer, map, fn) => {
  const res = {};
  map.forEach((v, k) => { res[k] = fn(v, k); });
  return res;
};
out('tokens/primitives.json', JSON.stringify({
  $description: 'Primitives — сырые значения. Источник: Figma «02 — Tokens». Не использовать в компонентах напрямую.',
  tokens: o('prim', prim, (v) => ({ $type: v.type, $value: v.value })),
}, null, 2) + '\n');
out('tokens/semantic-theme.json', JSON.stringify({
  $description: 'Semantic / Theme (Light) — цветовая матрица <Категория>/<Роль>/<слот>. Алиасы на Primitives.',
  tokens: o('theme', theme, (v) => ({ $type: v.type, ...jsonTok(v.value) })),
}, null, 2) + '\n');
out('tokens/semantic-layout.json', JSON.stringify({
  $description: 'Semantic / Layout — отступы, размеры, радиусы, типографика. Режимы: desktop, mobile (<= 767px).',
  tokens: o('layout', layout, (v) => ({ $type: v.type, desktop: jsonTok(v.desktop).$value, mobile: jsonTok(v.mobile).$value })),
}, null, 2) + '\n');
out('tokens/components.json', JSON.stringify({
  $description: 'Components — токены компонентов. Алиасы ТОЛЬКО на Semantic (Theme/Layout).',
  tokens: o('comp', comps, (v) => ({ $type: v.type, ...jsonTok(v.value) })),
}, null, 2) + '\n');

// ---------- styles ----------
const textStyles = raw('styles.txt').filter((l) => /^(display|heading|body|label|caption)\//.test(l)).map((l) => {
  const [name, family, style, fs, lh, ls, wt] = l.split('|');
  return { name, family, style, fontSize: fs, lineHeight: lh, letterSpacing: ls, weight: wt, mono: family === 'Geist Mono', caps: /caps$/.test(name) };
});
const effectStyles = raw('styles.txt').filter((l) => /^(focus|elevation)\//.test(l)).map((l) => {
  const [name, layers] = l.split('|');
  return { name, layers: layers.split('||').map((x) => x.split('~')) };
});
out('tokens/styles.json', JSON.stringify({ text: textStyles, effects: effectStyles }, null, 2) + '\n');

// ---------- tokens.css ----------
const lines = [];
const push = (s = '') => lines.push(s);
push('/* СГЕНЕРИРОВАНО tools/build-tokens.mjs из tokens/*.json (Figma «02 — Tokens»). Руками не править. */');
push('/* Слои: --prim-* (Primitives) → семантика (--surface-*, --space-*, ...) → --c-* (компоненты). Компоненты используют только --c-* и семантику. */');
push(':root {');
push('  /* ===== Primitives ===== */');
prim.forEach((v, k) => push(`  ${primVar(k)}: ${fmtLiteral(k, v.type, v.value)};`));
push();
push('  /* ===== Semantic / Theme (Light) ===== */');
theme.forEach((v, k) => push(`  ${varName('theme', k)}: ${isAlias(v.value) ? ref(v.value) : fmtLiteral(k, v.type, v.value)};`));
push();
push('  /* ===== Semantic / Layout (Desktop) ===== */');
layout.forEach((v, k) => push(`  ${varName('layout', k)}: ${isAlias(v.desktop) ? ref(v.desktop) : fmtLiteral(k, v.type, v.desktop)};`));
push();
push('  /* ===== Components ===== */');
comps.forEach((v, k) => push(`  ${compVar(k)}: ${isAlias(v.value) ? ref(v.value) : fmtLiteral(k, v.type, v.value)};`));
push();
push('  /* ===== Effect styles ===== */');
for (const e of effectStyles) {
  const shadow = e.layers.map(([c, x, y, b, s]) => {
    const v = (n) => `var(${varName('layout', n)})`;
    return `${v(x)} ${v(y)} ${v(b)} ${v(s)} var(${varName('theme', c)})`;
  }).join(', ');
  push(`  --effect-${kebab(e.name)}: ${shadow};`);
}
push('}');
push();
const mobileDiff = [...layout].filter(([, v]) => v.desktop !== v.mobile);
const mobileBlock = (ind) => mobileDiff.map(([k, v]) => `${ind}${varName('layout', k)}: ${isAlias(v.mobile) ? ref(v.mobile) : fmtLiteral(k, v.type, v.mobile)};`).join('\n');
push('/* ===== Semantic / Layout (Mobile): ширина <= Breakpoint/sm = 767px; в @media нельзя var(), значение зашито ===== */');
push('@media (max-width: 767px) {');
push('  :root {');
push(mobileBlock('    '));
push('  }');
push('}');
push();
push('/* Принудительный мобильный режим (витрина, превью): <html data-layout="mobile"> */');
push(':root[data-layout="mobile"] {');
push(mobileBlock('  '));
push('}');
push();
out('src/styles/tokens.css', lines.join('\n'));

// ---------- typography.css ----------
const t = [];
t.push('/* СГЕНЕРИРОВАНО tools/build-tokens.mjs. Text styles Figma → классы .text-<группа>-<имя>. Руками не править. */');
for (const s of textStyles) {
  const cls = kebab(s.name);
  const fam = s.mono ? 'mono' : 'base';
  t.push(`.text-${cls} {`);
  t.push(`  font-family: var(--typography-font-family-${fam});`);
  t.push(`  font-weight: var(--typography-font-weight-${s.weight});`);
  t.push(`  font-size: var(--typography-${kebab(s.fontSize)});`);
  t.push(`  line-height: var(--typography-${kebab(s.lineHeight)});`);
  t.push(`  letter-spacing: var(--typography-${kebab(s.letterSpacing)});`);
  if (s.caps) t.push('  text-transform: uppercase;');
  t.push('}');
}
out('src/styles/typography.css', t.join('\n') + '\n');

// ---------- registry (витрина токенов) ----------
const reg = [];
const entry = (layer, name, extra) => reg.push({ layer, name, css: layer === 'comp' ? compVar(name) : varName(layer, name), ...(localKeys.has(`${{ primitives: 'primitives', theme: 'theme', layout: 'layout', components: 'components' }[layer]}:${name}`) ? { local: true } : {}), ...extra });
prim.forEach((v, k) => entry('primitives', k, { type: v.type, group: k.split('/')[0] === 'Colors' ? 'Colors/' + k.split('/')[1] : k.split('/')[0], value: v.type === 'F' ? v.value : v.value }));
theme.forEach((v, k) => entry('theme', k, { type: v.type, group: k.split('/').slice(0, 2).join('/'), alias: isAlias(v.value) ? v.value.replace(/^@(Primitives:|P:)/, '') : null, value: resolvedOf('theme', k) }));
layout.forEach((v, k) => entry('layout', k, {
  type: v.type, group: k.split('/')[0], alias: isAlias(v.desktop) ? v.desktop.replace(/^@(Primitives:|P:)/, '') : null,
  aliasMobile: isAlias(v.mobile) ? v.mobile.replace(/^@(Primitives:|P:)/, '') : null,
  value: resolvedOf('layout', k, 'desktop'), valueMobile: resolvedOf('layout', k, 'mobile'),
}));
comps.forEach((v, k) => {
  const tg = target(v.value);
  const val = tg.layer === 'theme' ? resolvedOf('theme', tg.name) : tg.layer === 'layout' ? resolvedOf('layout', tg.name, 'desktop') : resolvedOf('prim', tg.name);
  entry('components', k, { type: v.type, group: k.split('/')[0], alias: v.value.replace(/^@(L:|T:|P:)/, ''), value: val });
});
out('src/tokens/registry.json', JSON.stringify(reg) + '\n');

// ---------- контраст: Surface/<X>/default ↔ Content/on-<x> ≥ 4.5 ----------
const lum = (hex) => {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const contrast = [];
for (const [k] of theme) {
  const m = k.match(/^Surface\/(Brand|Error|Success|Warning|Inverse)\/(default|hover|active)$/);
  if (!m) continue;
  const on = { Brand: 'on-brand', Error: 'on-error', Success: 'on-success', Warning: 'on-warning', Inverse: 'on-inverse' }[m[1]];
  const fg = resolvedOf('theme', `Content/${on}`), bg = resolvedOf('theme', k);
  contrast.push({ pair: `Content/${on} on ${k}`, ratio: +ratio(fg.slice(0, 7), bg.slice(0, 7)).toFixed(2) });
}

// ---------- отчёт ----------
console.log(`prim=${prim.size} theme=${theme.size} layout=${layout.size} (mobile diff ${mobileDiff.length}) comps=${comps.size} local=${localKeys.size} text=${textStyles.length} effects=${effectStyles.length}`);
const names = new Map();
[...theme.keys(), ...layout.keys()].forEach((k) => { const n = varName('theme', k); if (names.has(n)) errors.push(`css name collision ${n}`); names.set(n, k); });
if (errors.length) { console.error('ОШИБКИ:\n' + errors.join('\n')); process.exitCode = 1; }
const low = contrast.filter((c) => c.ratio < 4.5);
console.log('контраст (< 4.5):', low.length ? low.map((c) => `${c.pair}=${c.ratio}`).join('; ') : 'нет');
