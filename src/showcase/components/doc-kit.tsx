import type { ReactNode } from 'react';

/** Общие блоки витрины компонентов: карточка Preview, врезка Doc и заголовок группы. */
export type DocProps = { where: string[]; spacing: string[]; why: string[] };

export function Preview({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="sc-card sc-card--demo">
      <header className="sc-card__head">
        <h3 className="text-label-lg">{title}</h3>
        {note && <p className="text-body-xs sc-muted">{note}</p>}
      </header>
      {children}
    </section>
  );
}

export function Doc({ where, spacing, why }: DocProps) {
  const block = (h: string, items: string[]) => (
    <div className="sc-doc__block">
      <h4 className="text-label-sm">{h}</h4>
      <ul className="sc-doc__list text-body-xs sc-muted">
        {items.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </div>
  );
  return (
    <aside className="sc-card sc-doc">
      {block('Где используется', where)}
      {block('Отступы (токены)', spacing)}
      {block('Почему так', why)}
    </aside>
  );
}

export function Group({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <>
      <div className="sc-section">
        <h2 className="text-heading-h3">{title}</h2>
        <p className="text-body-sm sc-muted">{note}</p>
      </div>
      <div className="sc-bento sc-bento--paired">{children}</div>
    </>
  );
}
