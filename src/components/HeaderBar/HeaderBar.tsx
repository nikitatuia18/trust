import { useEffect, useId, useState, type ReactNode } from 'react';
import { cn } from '../cn';
import { Button } from '../Button/Button';
import { CloseIcon, MenuIcon } from '../Icon/Glyphs';
import { Logo } from '../Logo/Logo';
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
  className?: string;
};

/** Базовая полоса шапки (Figma 391:1447): логотип, навигация, кнопки. Содержимое — слоты; внутри Header.
 *  Когда всё в одну строку не помещается (уже 1024), остаются логотип и бургер, а режим, ссылки и кнопки прячутся в раскрывающуюся панель. */
export function HeaderBar({ logo = <Logo />, modeSwitch, links, actions, className }: HeaderBarProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const hasCollapse = Boolean(modeSwitch || links || actions);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
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
            onClick={() => setOpen((v) => !v)}
          />
        )}
        {hasCollapse && (
          <div id={panelId} className="at-header-bar__collapse">
            {(modeSwitch || links) && (
              <div className="at-header-bar__menu">
                {modeSwitch}
                {links && <nav className="at-header-bar__links">{links}</nav>}
              </div>
            )}
            {actions && <div className="at-header-bar__actions">{actions}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
