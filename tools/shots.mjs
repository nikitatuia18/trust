// Скриншоты страниц витрины на трёх ширинах + проверка горизонтального переполнения.
// Запуск: npm run shots -- account registration components   (без аргументов — account и registration)
// Опции: --widths=1440,1100,390   --out=.shots   --no-build
// Берёт установленный Edge (EDGE_PATH, если путь нестандартный); браузер не скачивается.
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, preview } from 'vite';
import puppeteer from 'puppeteer-core';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name, def) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1] ?? def;
const routes = args.filter((a) => !a.startsWith('--'));
if (!routes.length) routes.push('account', 'registration');
const widths = opt('widths', '1440,1100,390').split(',').map(Number);
const outDir = join(root, opt('out', '.shots'));
const HEIGHT = 900;

const edge = [
  process.env.EDGE_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].find((p) => p && existsSync(p));
if (!edge) { console.error('Edge не найден — задайте EDGE_PATH'); process.exit(2); }

mkdirSync(outDir, { recursive: true });
if (!args.includes('--no-build')) await build({ root, logLevel: 'error' });
const server = await preview({ root, logLevel: 'error', preview: { port: 0, host: '127.0.0.1' } });
const base = server.resolvedUrls.local[0];
const browser = await puppeteer.launch({ executablePath: edge, headless: true });

// Страница в браузере: ширина документа и элементы, вылезающие за правый край окна
const probe = () => {
  const vw = document.documentElement.clientWidth;
  const offenders = [];
  for (const el of document.body.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > vw + 1) {
      const cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/)[0] : '';
      offenders.push(`${el.tagName.toLowerCase()}${cls ? '.' + cls : ''} (+${Math.round(r.right - vw)}px)`);
    }
  }
  return { vw, scrollWidth: document.documentElement.scrollWidth, offenders: offenders.slice(0, 5) };
};

let failed = false;
try {
  for (const route of routes) {
    for (const width of widths) {
      const page = await browser.newPage();
      await page.setViewport({ width, height: HEIGHT, deviceScaleFactor: 1 });
      await page.goto(`${base}#/${route}`, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      const file = join(outDir, `${route}-${width}.png`);
      await page.screenshot({ path: file, fullPage: true });
      const m = await page.evaluate(probe);
      const overflow = m.scrollWidth > m.vw;
      if (overflow) failed = true;
      console.log(`${overflow ? '✘' : '✔'} ${route} @${width}: scrollWidth ${m.scrollWidth} / ${m.vw}${overflow ? '  вылезают: ' + m.offenders.join(', ') : ''}  →  ${file}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
  await new Promise((r) => server.httpServer.close(r));
}
process.exit(failed ? 1 : 0);
