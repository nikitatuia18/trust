import { useMemo, useState } from 'react';
import { byLayer, groupBy, registry, type TokenEntry } from '../tokens/types';
import styles from '../../tokens/styles.json';

const px = (v: string | number) => (typeof v === 'number' ? `${v}px` : v);

function Card({ title, note, children, span }: { title: string; note?: string; children: React.ReactNode; span?: 2 | 3 }) {
  return (
    <section className="sc-card" style={span ? { gridColumn: `span ${span}` } : undefined}>
      <header className="sc-card__head">
        <h3 className="text-label-lg">{title}</h3>
        {note && <p className="text-body-xs sc-muted">{note}</p>}
      </header>
      {children}
    </section>
  );
}

function Swatch({ t, depth }: { t: TokenEntry; depth: number }) {
  const short = t.name.split('/').slice(depth).join('/');
  return (
    <li className="sc-swatch" title={`var(${t.css})`}>
      <span className="sc-swatch__chip" style={{ background: `var(${t.css})` }} />
      <span className="sc-swatch__text">
        <span className="text-label-sm">{short}</span>
        <span className="text-body-xs sc-muted">{t.alias ? t.alias.replace('Colors/', '') : String(t.value)}</span>
      </span>
      <code className="sc-code">{String(t.value).slice(0, 9)}</code>
    </li>
  );
}

function Colors() {
  const theme = byLayer('theme');
  // Surface — карточка на роль; Content/Border/Focus/Elevation — карточка на категорию
  const groups = groupBy(theme, (t) => (t.name.startsWith('Surface/') ? t.group : t.name.split('/')[0]));
  return (
    <>
      {groups.map(([g, items]) => (
        <Card key={g} title={g} note="Semantic / Theme">
          <ul className="sc-list">{items.map((t) => <Swatch key={t.name} t={t} depth={g.includes('/') ? 2 : 1} />)}</ul>
        </Card>
      ))}
    </>
  );
}

function PrimitiveColors() {
  const items = byLayer('primitives').filter((t) => t.type === 'C');
  const groups = groupBy(items, (t) => t.group);
  return (
    <>
      {groups.map(([g, list]) => (
        <Card key={g} title={g.replace('Colors/', '')} note="Primitives — только для алиасов">
          <div className="sc-ramp">
            {list.map((t) => (
              <div key={t.name} className="sc-ramp__step" title={`${t.name} · ${t.value}`}>
                <span className="sc-ramp__chip" style={{ background: `var(${t.css})` }} />
                <span className="text-caption-default sc-muted">{t.name.split('/').pop()}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </>
  );
}

function Spacing() {
  const items = byLayer('layout').filter((t) => /^Space\//.test(t.name));
  return (
    <Card title="Space" note="Desktop → Mobile" >
      <ul className="sc-list">
        {items.map((t) => (
          <li key={t.name} className="sc-row">
            <span className="text-label-sm sc-row__name">{t.name.replace('Space/', '')}</span>
            <span className="sc-bar" style={{ width: `var(${t.css})` }} />
            <code className="sc-code">{px(t.value)}{t.valueMobile !== t.value ? ` → ${px(t.valueMobile!)}` : ''}</code>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Sizes() {
  const items = byLayer('layout').filter((t) => /^Size\/(?!Icon)/.test(t.name));
  const icons = byLayer('layout').filter((t) => /^Size\/Icon\//.test(t.name));
  return (
    <>
      <Card title="Size" note="Высоты и ширины контролов">
        <ul className="sc-list">
          {items.map((t) => (
            <li key={t.name} className="sc-row">
              <span className="text-label-sm sc-row__name sc-row__name--md">{t.name.replace('Size/', '')}</span>
              <span className="sc-bar sc-bar--size" style={{ width: `min(var(${t.css}), var(--prim-spacing-1300))` }} />
              <code className="sc-code">{px(t.value)}{t.valueMobile !== t.value ? ` → ${px(t.valueMobile!)}` : ''}</code>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Size / Icon" note="Размеры иконок">
        <ul className="sc-list">
          {icons.map((t) => (
            <li key={t.name} className="sc-row">
              <span className="text-label-sm sc-row__name">{t.name.replace('Size/Icon/', '')}</span>
              <span className="sc-icon-box" style={{ width: `var(${t.css})`, height: `var(${t.css})` }} />
              <code className="sc-code">{px(t.value)}{t.valueMobile !== t.value ? ` → ${px(t.valueMobile!)}` : ''}</code>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

function Radius() {
  const items = byLayer('layout').filter((t) => /^Radius\//.test(t.name));
  return (
    <Card title="Radius" note="Контролы — round (pill), контейнеры — по токенам">
      <div className="sc-radius">
        {items.map((t) => (
          <div key={t.name} className="sc-radius__item">
            <span className="sc-radius__box" style={{ borderRadius: `var(${t.css})` }} />
            <span className="text-label-sm">{t.name.replace('Radius/', '')}</span>
            <code className="sc-code">{px(t.value)}{t.valueMobile !== t.value ? ` → ${px(t.valueMobile!)}` : ''}</code>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Misc() {
  const prim = byLayer('primitives');
  const items = [
    ...prim.filter((t) => /^(Stroke|Opacity|Breakpoints)\//.test(t.name)),
  ];
  const groups = groupBy(items, (t) => t.name.split('/')[0]);
  return (
    <>
      {groups.map(([g, list]) => (
        <Card key={g} title={g} note="Primitives">
          <ul className="sc-list">
            {list.map((t) => (
              <li key={t.name} className="sc-row">
                <span className="text-label-sm sc-row__name">{t.name.split('/').slice(1).join('/')}</span>
                <span className="sc-spacer" />
                <code className="sc-code">{String(t.value)}</code>
              </li>
            ))}
          </ul>
        </Card>
      ))}
      <Card title="Semantic · прочее" note="Opacity, Stroke, Grid, Focus">
        <ul className="sc-list">
          {byLayer('layout').filter((t) => /^(Opacity|Stroke|Grid|Focus)\//.test(t.name)).map((t) => (
            <li key={t.name} className="sc-row">
              <span className="text-label-sm sc-row__name">{t.name}</span>
              <span className="sc-spacer" />
              <code className="sc-code">{String(t.value)}{t.valueMobile !== t.value ? ` → ${t.valueMobile}` : ''}</code>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

function Typography() {
  return (
    <Card title="Text styles" note="Классы .text-<группа>-<имя>. На Mobile размеры уменьшаются автоматически." span={3}>
      <ul className="sc-list">
        {styles.text.map((s) => {
          const cls = `text-${s.name.replace('/', '-')}`;
          return (
            <li key={s.name} className="sc-type">
              <code className="sc-code sc-type__name">{cls}</code>
              <span className="text-body-xs sc-muted sc-type__meta">{s.family} {s.style} · {s.fontSize.replace('Font-size/', '')}</span>
              <span className={`${cls} sc-type__sample`}>Доверие к каждой сделке</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function Effects() {
  return (
    <Card title="Effects" note="Focus-кольца и elevation">
      <div className="sc-effects">
        {styles.effects.map((e) => (
          <div key={e.name} className="sc-effects__item">
            <span className="sc-effects__box" style={{ boxShadow: `var(--effect-${e.name.replace('/', '-')})` }} />
            <code className="sc-code">--effect-{e.name.replace('/', '-')}</code>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Контраст (WCAG) для пар «заливка ↔ Content/on-…»
const lum = (hex: string) => {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

function Contrast() {
  const theme = byLayer('theme');
  const get = (n: string) => String(theme.find((t) => t.name === n)?.value ?? '#000000').slice(0, 7);
  const pairs: [string, string][] = [];
  for (const [cat, on] of [['Brand', 'on-brand'], ['Error', 'on-error'], ['Success', 'on-success'], ['Warning', 'on-warning'], ['Inverse', 'on-inverse']] as const) {
    for (const slot of ['default', 'hover', 'active']) {
      if (theme.some((t) => t.name === `Surface/${cat}/${slot}`)) pairs.push([`Surface/${cat}/${slot}`, `Content/${on}`]);
    }
  }
  return (
    <Card title="Контраст" note="Заливка ↔ Content/on-<роль>, норма WCAG AA ≥ 4.5" span={2}>
      <ul className="sc-list">
        {pairs.map(([bg, fg]) => {
          const r = ratio(get(bg), get(fg));
          return (
            <li key={bg} className="sc-row">
              <span className="sc-contrast" style={{ background: `var(${theme.find((t) => t.name === bg)!.css})`, color: `var(${theme.find((t) => t.name === fg)!.css})` }}>Aa</span>
              <span className="text-label-sm sc-row__name sc-row__name--wide">{bg} ↔ {fg}</span>
              <span className="sc-spacer" />
              <code className={`sc-code ${r < 4.5 ? 'sc-code--bad' : ''}`}>{r.toFixed(2)}{r < 4.5 ? ' ✕' : ' ✓'}</code>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function ComponentTokens() {
  const [q, setQ] = useState('');
  const items = useMemo(() => byLayer('components'), []);
  const filtered = items.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Card title={`Component tokens · ${items.length}`} note="Алиасы только на Semantic. В компонентах используем --c-*." span={3}>
      <input className="sc-search" placeholder="Поиск: Button, padding, radius…" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="sc-table">
        {filtered.slice(0, 200).map((t) => (
          <div key={t.name} className="sc-table__row">
            <span className="text-label-sm">{t.name}</span>
            <code className="sc-code">{t.css}</code>
            <code className="sc-code sc-muted">{t.alias}</code>
            <code className="sc-code">
              {t.type === 'C' && <span className="sc-dot" style={{ background: `var(${t.css})` }} />}
              {px(t.value)}
            </code>
          </div>
        ))}
        {filtered.length > 200 && <p className="text-body-xs sc-muted">Показаны первые 200 из {filtered.length} — уточни поиск.</p>}
      </div>
    </Card>
  );
}

export function TokensPage() {
  const counts = {
    p: registry.filter((t) => t.layer === 'primitives').length,
    t: registry.filter((t) => t.layer === 'theme').length,
    l: registry.filter((t) => t.layer === 'layout').length,
    c: registry.filter((t) => t.layer === 'components').length,
  };
  return (
    <>
      <div className="sc-intro">
        <h1 className="text-heading-h1">Токены</h1>
        <p className="text-body-lg sc-muted">
          Три уровня: Primitives ({counts.p}) → Semantic Theme ({counts.t}) и Layout ({counts.l}) → Components ({counts.c}).
          Источник — Figma «02 — Tokens», генерация: <code className="sc-code">npm run tokens</code>.
        </p>
      </div>

      <h2 className="text-heading-h3 sc-section">Цвет · Semantic / Theme</h2>
      <div className="sc-bento"><Colors /><Contrast /></div>

      <h2 className="text-heading-h3 sc-section">Размеры, отступы, радиусы</h2>
      <div className="sc-bento"><Spacing /><Sizes /><Radius /></div>

      <h2 className="text-heading-h3 sc-section">Типографика и эффекты</h2>
      <div className="sc-bento"><Typography /><Effects /></div>

      <h2 className="text-heading-h3 sc-section">Прочее</h2>
      <div className="sc-bento"><Misc /></div>

      <h2 className="text-heading-h3 sc-section">Primitives · цвета</h2>
      <div className="sc-bento"><PrimitiveColors /></div>

      <h2 className="text-heading-h3 sc-section">Токены компонентов</h2>
      <div className="sc-bento"><ComponentTokens /></div>
    </>
  );
}
