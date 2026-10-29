import type { ReactNode } from 'react';
import { cn } from '../cn';
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

/** Базовая полоса шапки (Figma 391:1447): логотип, навигация, кнопки. Содержимое — слоты; внутри Header. */
export function HeaderBar({ logo = <Logo />, modeSwitch, links, actions, className }: HeaderBarProps) {
  return (
    <div className={cn('at-header-bar', className)}>
      <div className="at-header-bar__content">
        <div className="at-header-bar__navigation">
          {logo}
          {(modeSwitch || links) && (
            <div className="at-header-bar__menu">
              {modeSwitch}
              {links && <nav className="at-header-bar__links">{links}</nav>}
            </div>
          )}
        </div>
        {actions && <div className="at-header-bar__actions">{actions}</div>}
      </div>
    </div>
  );
}
