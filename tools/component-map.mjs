// Карта компонентов для сборки экранов. Запуск: npm run map → docs/COMPONENT-MAP.md
// Источники (всё из кода, руками не правится): JSDoc над компонентом, тип *Props, блоки Doc на витрине
// (src/showcase/components/*.group.tsx) и ручной список шаблонов tools/component-patterns.txt.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const norm = (s) => s.toLowerCase().replace(/[^a-zа-я0-9]/g, '');

// ---------- витрина: группа и «Где используется» по заголовку Preview ----------
const showcase = []; // { group, title, where[], body }
const groupsDir = 'src/showcase/components';
for (const f of readdirSync(join(root, groupsDir)).filter((n) => n.endsWith('.group.tsx'))) {
  const text = read(`${groupsDir}/${f}`);
  const groupTitle = text.match(/title:\s*"([^"]+)"/)?.[1] ?? f;
  for (const chunk of text.split('<Preview title="').slice(1)) {
    const title = chunk.slice(0, chunk.indexOf('"'));
    const whereSrc = chunk.match(/where=\{\[([\s\S]*?)\]\}/)?.[1] ?? '';
    const where = [...whereSrc.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
    showcase.push({ group: groupTitle, title, where, body: chunk });
  }
}

// ---------- компоненты ----------
const names = readdirSync(join(root, 'src/components')).filter((n) => statSync(join(root, 'src/components', n)).isDirectory());
const rows = [];
for (const name of names) {
  const src = read(`src/components/${name}/${name}.tsx`);
  const jsdoc = src.match(new RegExp(String.raw`/\*\*((?:(?!\*/)[\s\S])*)\*/\s*export (?:function|const) ${name}\b`))?.[1];
  const cssHead = read(`src/components/${name}/${name}.css`).match(/^\/\*\s*([\s\S]*?)\s*\*\//)?.[1];
  const doc = (jsdoc ?? cssHead ?? '—').replace(/\s*\n\s*\*?\s*/g, ' ').trim();
  // props: тело `export type NameProps = {…}`
  const typeStart = src.indexOf(`export type ${name}Props`);
  const props = [];
  if (typeStart >= 0) {
    const body = src.slice(src.indexOf('{', typeStart), src.indexOf('\n};', typeStart));
    for (const m of body.matchAll(/^\s{2}(\w+)(\??):\s*([^;\n]+)/gm)) {
      if (['className', 'children'].includes(m[1])) continue;
      props.push(`${m[1]}${m[2]}: ${m[3].trim().replace(/\s+/g, ' ').slice(0, 90)}`);
    }
  }
  // сначала Preview, названный как компонент; затем любой, где компонент используется тегом
  const sc = showcase.find((e) => norm(e.title) === norm(name)) ?? showcase.find((e) => norm(e.title).includes(norm(name))) ?? showcase.find((e) => new RegExp(String.raw`<${name}[\s>/]`).test(e.body));
  rows.push({ name, doc, props, group: sc?.group ?? '—', where: sc?.where ?? [] });
}

// ---------- шаблоны ----------
const patterns = read('tools/component-patterns.txt').split(/\r?\n/).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|').map((s) => s.trim()));

// ---------- вывод ----------
const out = [];
out.push('# Карта компонентов', '');
out.push('Генерируется `npm run map` из кода и витрины; шаблоны — из `tools/component-patterns.txt`. Руками не править. Читать при сборке экрана вместо обхода папок (шаг 2 `/build-screen`).', '');
out.push('## Шаблон макета → компонент', '', '| В макете | Компонент | Замечание |', '|---|---|---|');
for (const [a, b, c = ''] of patterns) out.push(`| ${a} | ${b} | ${c} |`);
out.push('', '## Компоненты', '');
for (const r of rows) {
  out.push(`### ${r.name}`, '', r.doc, '');
  out.push(`Группа витрины: ${r.group}.`);
  if (r.where.length) out.push(`Где используется: ${r.where.join(' ')}`);
  if (r.props.length) out.push('', 'Props:', ...r.props.map((p) => `- \`${p}\``));
  out.push('');
}
writeFileSync(join(root, 'docs/COMPONENT-MAP.md'), out.join('\n'));
console.log(`docs/COMPONENT-MAP.md: компонентов ${rows.length}, шаблонов ${patterns.length}, без описания ${rows.filter((r) => r.doc === '—').length}`);
