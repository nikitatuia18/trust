import type { ReactNode } from 'react';
import { cn } from '../cn';
import { Icon } from '../Icon/Icon';
import './Breadcrumbs.css';

export type BreadcrumbItem = {
  label: ReactNode;
  /** Нет href — пункт не ссылка (последний — текущая страница) */
  href?: string;
  /** Переход без перезагрузки: href не открывается, браузер остаётся на месте */
  onClick?: () => void;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/** Хлебные крошки: путь до текущей страницы. Последний пункт — текущая страница, остальные — ссылки. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('at-breadcrumbs', className)} aria-label="Breadcrumbs">
      <ol className="at-breadcrumbs__list">
        {items.map((item, i) => {
          const current = i === items.length - 1;
          return (
            <li key={i} className="at-breadcrumbs__item">
              {current ? (
                <span className="at-breadcrumbs__label text-label-md" aria-current="page">{item.label}</span>
              ) : (
                <a className="at-breadcrumbs__label at-breadcrumbs__link text-label-md" href={item.href ?? '#'} onClick={item.onClick && ((e) => { e.preventDefault(); item.onClick?.(); })}>{item.label}</a>
              )}
              {!current && <span className="at-breadcrumbs__separator"><Icon /></span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
