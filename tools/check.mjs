// Проверка правил системы в коде. Запуск: npm run check
// Ловит: сырые значения в CSS компонентов и экранов, --prim-*, несуществующие токены в var(--x),
// импорты компонентов мимо src/components, цвет/фон/радиус в inline style экранов.
// Исключить строку: комментарий /* check-ignore: причина */ в той же строке.
// Код выхода 1 — есть нарушения.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');

function walk(dir, exts, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, exts, acc);
    else if (exts.some((e) => name.endsWith(e))) acc.push(p);
  }
  return acc;
}
const rel = (p) => relative(root, p).split(sep).join('/');

// Осознанные исключения (решения владельца; см. страницу «Правила»)
const ALLOW = [
  { file: 'src/components/MegaMenu/MegaMenu.css', match: /--_column-width:\s*298px/ },
];
const allowed = (file, line) => ALLOW.some((a) => a.file === file && a.match.test(line));

const violations = [];
const add = (file, n, msg, line) => violations.push(`${file}:${n}  ${msg}\n    ${line.trim()}`);

// ---------- множество объявленных токенов ----------
const declared = new Set();
for (const f of walk(src, ['.css'])) {
  for (const m of readFileSync(f, 'utf8').matchAll(/(--[\w-]+)\s*:/g)) declared.add(m[1]);
}
for (const f of walk(src, ['.tsx', '.ts'])) {
  for (const m of readFileSync(f, 'utf8').matchAll(/['"](--[\w-]+)['"]\s*:/g)) declared.add(m[1]);
}

// ---------- CSS компонентов и экранов ----------
const cssFiles = [...walk(join(src, 'components'), ['.css']), ...walk(join(src, 'screens'), ['.css'])];
for (const f of cssFiles) {
  const file = rel(f);
  const text = readFileSync(f, 'utf8').replace(/\/\*(?!\s*check-ignore)[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
  text.split(/\r?\n/).forEach((line, i) => {
    const n = i + 1;
    if (/check-ignore/.test(line) || allowed(file, line)) return;
    const isAtRule = /^\s*@(media|container|supports)/.test(line);
    const isSrOnly = /clip-path:\s*inset\(50%\)/.test(line);
    if (!isAtRule && !isSrOnly && /(^|[^\w.-])(?!0(?:\.0+)?px)\d*\.?\d+px\b/.test(line)) add(file, n, 'сырое значение px — нужен токен (или спросить)', line);
    if (/#[0-9a-fA-F]{3,8}\b/.test(line)) add(file, n, 'сырой цвет #hex — нужен токен', line);
    if (/\b(rgba?|hsla?|oklch)\(/.test(line)) add(file, n, 'сырой цвет rgb/hsl — нужен токен', line);
    if (/\d\s?(rem|em)\b/.test(line) && !isAtRule) add(file, n, 'сырое значение rem/em — нужен токен', line);
    if (/font-(size|family|weight)\s*:/.test(line) && !/var\(/.test(line)) add(file, n, 'шрифт без токена — класс .text-* или var(--typography-*)', line);
    if (/--prim-/.test(line)) add(file, n, 'примитив --prim-* в компоненте/экране — только семантика или --c-*', line);
    for (const m of line.matchAll(/var\((--[\w-]+)/g)) {
      if (!declared.has(m[1])) add(file, n, `токен ${m[1]} нигде не объявлен`, line);
    }
  });
}

// ---------- TSX компонентов и экранов ----------
const tsxFiles = [...walk(join(src, 'components'), ['.tsx']), ...walk(join(src, 'screens'), ['.tsx'])];
const STYLE_COLOR = /\b(color|background(?:Color)?|borderRadius|border(?:Color)?|boxShadow|fontSize|fontFamily)\s*:/;
for (const f of tsxFiles) {
  const file = rel(f);
  const lines = readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    const n = i + 1;
    if (/check-ignore/.test(line)) return;
    if (/--prim-/.test(line)) add(file, n, 'примитив --prim-* в компоненте/экране', line);
    if (file.startsWith('src/screens/')) {
      // импорты компонентов только из корня `../components`
      const imp = line.match(/from\s+['"]((?:\.\.\/)+components\/[^'"]+)['"]/);
      if (imp) add(file, n, 'импорт компонента мимо src/components/index.ts', line);
      if (/style=\{\{/.test(line) && STYLE_COLOR.test(line)) add(file, n, 'цвет/фон/радиус/шрифт в inline style — только токены в CSS', line);
    }
  });
}

// ---------- итог ----------
if (violations.length) {
  console.log(violations.join('\n'));
  console.log(`\n✘ нарушений: ${violations.length}`);
  process.exit(1);
}
console.log(`✔ чисто (CSS-файлов: ${cssFiles.length}, TSX: ${tsxFiles.length}, токенов объявлено: ${declared.size})`);
