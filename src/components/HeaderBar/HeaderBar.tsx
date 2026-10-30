import { useEffect, useId, useState, type ReactNode } from 'react';
import { cn } from '../cn';
import { Button } from '../Button/Button';
import { CloseIcon, MenuIcon } from '../Icon/Glyphs';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import { MegaMenu, type MegaMenuItem } from '../MegaMenu/MegaMenu';
import './HeaderBar.css';

export type HeaderBarProps = {
  /** Figma: Logo. По умолчанию — Logo системы */
  logo?: ReactNode;
  /** Figma: Segmented Control в navigation-menu-container (режим Individual | Business) */
  modeSwitch?: ReactNode;
  /** Figma: navitation — ghost-кнопки Button S compact (Resources, Contacts) */
  links?: ReactNode;
  /** Figma: buttons-container-header — Language Selector и основная кнопка */
  actions?: ReactNode;
  /** Пункты mega-menu: в бургере они открываются отдельной «страницей» с кнопкой «Назад», одним столбцом. Передаёт Header */
  megaMenu?: MegaMenuItem[][];
  /** Название пункта бургера, который открывает mega-menu. Нет значения — в бургере пункта нет */
  megaMenuLabel?: ReactNode;
  className?: string;
};

/** Ниже этой ширины (px) шапка складывается в логотип и бургер; то же число в HeaderBar.css (в @media нельзя var()) */
const COLLAPSE_BELOW = 1024;

/** Базовая полоса шапки (Figma 391:1447): логотип, навигация, кнопки. Содержимое — слоты; внутри Header.
 *  Уже 1024 остаются логотип и бургер. Бургер открывает панель на весь экран под полосой: страница под ней не прокручивается и не видна.
 *  В панели — режим, ссылки, пункт mega-menu и кнопки; mega-menu — вторая «страница» панели с кнопкой «Назад», пункты друг под другом. */
export function HeaderBar({ logo = <Logo />, modeSwitch, links, actions, megaMenu, megaMenuLabel, className }: HeaderBarProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'root' | 'mega'>('root');
  const panelId = useId();
  const hasMega = Boolean(megaMenu && megaMenuLabel);
  const hasCollapse = Boolean(modeSwitch || links || actions || hasMega);

  const close = () => { setOpen(false); setView('root'); };

  // Esc: на странице mega-menu — назад, иначе закрыть бургер
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (view === 'mega') setView('root'); else close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, view]);

  // Пока бургер открыт на узком экране, страница под ним не прокручивается. Шире порога панель — часть строки, блокировать нечего
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(`(max-width: ${COLLAPSE_BELOW - 1}px)`);
    const root = document.documentElement;
    const previous = root.style.overflow;
    const sync = () => {
      if (mq.matches) root.style.overflow = 'hidden';
      else { root.style.overflow = previous; close(); }
    };
    sync();
    mq.addEventListener('change', sync);
    return () => { mq.removeEventListener('change', sync); root.style.overflow = previous; };
  }, [open]);

  return (
    <div className={cn('at-header-bar', className)}>
      <div className="at-header-bar__content" data-open={open || undefined}>
        <div className="at-header-bar__logo">{logo}</div>
        {hasCollapse && (
          <Button
            className="at-header-bar__burger"
            variant="ghost"
            size="s"
            iconOnly
            iconLeft={open ? <CloseIcon /> : <MenuIcon />}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => (open ? close() : setOpen(true))}
          />
        )}
        {hasCollapse && (
          <div id={panelId} className="at-header-bar__collapse" data-view={view}>
            <div className="at-header-bar__root">
              {(modeSwitch || links || hasMega) && (
                <div className="at-header-bar__menu">
                  {modeSwitch}
                  {(links || hasMega) && (
                    <nav className="at-header-bar__links">
                      {links}
                      {hasMega && (
                        <Button className="at-header-bar__mega-trigger" variant="ghost" size="s" density="compact" iconRight={<Icon />} aria-haspopup="true" onClick={() => setView('mega')}>
                          {megaMenuLabel}
                        </Button>
                      )}
                    </nav>
                  )}
                </div>
              )}
              {actions && <div className="at-header-bar__actions">{actions}</div>}
            </div>
            {hasMega && megaMenu && (
              <div className="at-header-bar__mega-page">
                <Button className="at-header-bar__back" variant="ghost" size="s" density="compact" iconLeft={<Icon direction="left" />} onClick={() => setView('root')}>Back</Button>
                <MegaMenu
                  className="at-header-bar__mega"
                  stacked
                  aria-label={typeof megaMenuLabel === 'string' ? megaMenuLabel : undefined}
                  columns={megaMenu.map((items) => items.map((it) => ({ ...it, onClick: it.onClick && (() => { it.onClick?.(); close(); }) })))}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
