// Заготовка нового компонента: код, CSS, экспорт и блок Preview + Doc на витрине.
// Запуск: npm run new:component -- Name --group=input [--note="Подпись Preview"]
// Группы — файлы src/showcase/components/<группа>.group.tsx (список печатается, если группа не указана).
// Делает: src/components/<Name>/<Name>.tsx|css, строку в src/components/index.ts, Preview + Doc в группе.
// После — заполнить props/CSS/Doc руками (только токены; новые токены — tools/raw/local.txt) и npm run build, check.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (n) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
const name = args.find((a) => !a.startsWith('--'));
const groupsDir = join(root, 'src/showcase/components');
const groups = readdirSync(groupsDir).filter((f) => f.endsWith('.group.tsx')).map((f) => f.replace('.group.tsx', ''));
const group = opt('group');
const note = opt('note') ?? 'Состояния и варианты';

if (!name || !/^[A-Z][A-Za-z0-9]*$/.test(name) || !group || !groups.includes(group)) {
  console.error(`Использование: npm run new:component -- Name --group=<${groups.join('|')}> [--note="…"]\nName — PascalCase.`);
  process.exit(1);
}
const dir = join(root, 'src/components', name);
if (existsSync(dir)) { console.error(`Компонент ${name} уже есть: ${dir}`); process.exit(1); }

const kebab = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const cls = `at-${kebab}`;
const rd = (p) => readFileSync(p, 'utf8');
const eol = (s) => (s.includes('\r\n') ? '\r\n' : '\n');

// ---------- компонент ----------
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, `${name}.tsx`), `import type { ReactNode } from 'react';
import { cn } from '../cn';
import './${name}.css';

export type ${name}Props = {
  children?: ReactNode;
  className?: string;
};

/** TODO: одна строка — что это и когда использовать (а когда — другой компонент). */
export function ${name}({ children, className }: ${name}Props) {
  return <div className={cn('${cls} text-body-md', className)}>{children}</div>;
}
`);
writeFileSync(join(dir, `${name}.css`), `/* ${name} — TODO: назначение. Только токены: семантика (--surface-*, --content-*, --space-*, --radius-*) или --c-* из tools/raw/local.txt. */
.${cls} {
  box-sizing: border-box;
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background: var(--surface-neutral-muted);
  color: var(--content-primary);
}
`);

// ---------- экспорт ----------
const indexPath = join(root, 'src/components/index.ts');
let index = rd(indexPath);
index = index.replace(/\s*$/, '') + `${eol(index)}export { ${name}, type ${name}Props } from './${name}/${name}';${eol(index)}`;
writeFileSync(indexPath, index);

// ---------- витрина ----------
const gPath = join(groupsDir, `${group}.group.tsx`);
let g = rd(gPath);
const nl = eol(g);
g = g.replace(/import \{ ([^}]*) \} from '\.\.\/\.\.\/components';/, (_, list) => `import { ${list}, ${name} } from '../../components';`);
if (!/import \{[^}]*\bDoc\b[^}]*\} from '\.\/doc-kit'/.test(g)) {
  g = g.replace(/(import[^\n]*'\.\.\/\.\.\/components';)/, `$1${nl}import { Doc, Preview } from './doc-kit';`);
}
const block = [
  `      <Preview title="${name}" note="${note}">`,
  `        <div className="sc-demo"><div className="sc-demo__row"><${name}>${name}</${name}></div></div>`,
  `      </Preview>`,
  `      <Doc`,
  `        where={['TODO: где используется.']}`,
  `        spacing={['TODO: отступы и размеры (токены).']}`,
  `        why={['TODO: почему так (состояния, доступность, исключения).']}`,
  `      />`,
].join(nl);
const tail = `${nl}    </>${nl}  );${nl}}`;
const at = g.lastIndexOf(tail);
if (at < 0) { console.error(`Не нашёл конец <>…</> в ${gPath} — вставьте блок вручную.`); process.exit(1); }
g = g.slice(0, at) + nl + block + g.slice(at);
writeFileSync(gPath, g);

console.log(`✔ ${name}: src/components/${name}/, экспорт в index.ts, Preview + Doc в ${group}.group.tsx.\nДальше: заполнить TODO, npm run build && npm run check && npm run shots -- components, npm run debt.`);
