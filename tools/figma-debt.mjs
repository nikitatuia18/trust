// Список «долга перед Figma»: что есть в коде, но ещё не заведено в Figma. Запуск: npm run debt → docs/FIGMA-DEBT.md
// 1) локальные токены из tools/raw/local.txt;
// 2) компоненты в src/components, у которых нет ни одного компонентного токена --c-* в tools/raw/components.txt.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lines = (f) => readFileSync(join(root, f), 'utf8').split(/\r?\n/).filter(Boolean);

// локальные токены
const local = [];
let section = '';
for (const l of lines('tools/raw/local.txt')) {
  if (l.startsWith('## ')) { section = l.slice(3).trim(); continue; }
  if (l.startsWith('#')) continue;
  const [name, type, value] = l.split('|');
  local.push({ section, name, type, value });
}

// компоненты без компонентных токенов
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const compTokenGroups = new Set(lines('tools/raw/components.txt').map((l) => kebab(l.split('|')[0].split('/')[0]).replace(/\s+/g, '-')));
const components = readdirSync(join(root, 'src/components')).filter((n) => statSync(join(root, 'src/components', n)).isDirectory());
// Имя папки компонента → имя группы токенов в Figma, если они не совпадают
const ALIAS = { TextField: 'Input', SegmentedControl: 'Segment', OrderSummary: 'Summary', BankLogo: 'Asset Logo', CurrencyIcon: 'Asset Logo', NetworkLogo: 'Asset Logo', LogoWithBadge: 'Asset Logo', StatusIcon: 'Status', LanguageSelector: 'Select Trigger' };
const group = (n) => kebab(ALIAS[n] ?? n).replace(/\s+/g, '-');
const noTokens = components.filter((n) => !compTokenGroups.has(group(n)));

const out = [];
out.push('# Долг перед Figma');
out.push('');
out.push('Генерируется `npm run debt`. Код первичен для новых компонентов и токенов; раз в несколько экранов всё это переносится в Figma одной пачкой (`use_figma`), строки из `tools/raw/local.txt` — в основные raw после следующего экспорта.');
out.push('');
out.push(`## Локальные токены (${local.length})`);
out.push('');
if (local.length) {
  out.push('| Секция | Токен | Тип | Значение |', '|---|---|---|---|');
  for (const t of local) out.push(`| ${t.section} | \`${t.name}\` | ${t.type} | \`${t.value}\` |`);
} else out.push('Нет.');
out.push('');
out.push(`## Компоненты без компонентных токенов \`--c-*\` (${noTokens.length})`);
out.push('');
out.push("Эвристика по именам групп в `tools/raw/components.txt`: Icon, Logo, Spinner и обёртки (HeaderBar, MegaMenu — часть группы Header) могут не требовать своих токенов.");out.push("");
out.push(noTokens.length ? noTokens.map((n) => `- ${n}`).join('\n') : 'Нет.');
out.push('');
writeFileSync(join(root, 'docs/FIGMA-DEBT.md'), out.join('\n'));
console.log(`docs/FIGMA-DEBT.md: локальных токенов ${local.length}, компонентов без --c-* ${noTokens.length}${noTokens.length ? ' (' + noTokens.join(', ') + ')' : ''}`);
