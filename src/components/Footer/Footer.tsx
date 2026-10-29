import type { ReactNode } from 'react';
import { cn } from '../cn';
import { Divider } from '../Divider/Divider';
import { Logo } from '../Logo/Logo';
import './Footer.css';

export type FooterLink = { label: ReactNode; href: string };
/** icon — знак магазина 24×24, например AppStoreMark */
export type FooterAppLink = FooterLink & { icon?: ReactNode };

export type FooterProps = {
  /** Figma: Logo. По умолчанию — Logo системы */
  logo?: ReactNode;
  /** Figma: описание под логотипом */
  description?: ReactNode;
  /** Figma: копирайт внизу блока бренда */
  copyright?: ReactNode;
  /** Figma: Link Columns — столбцы ссылок, между ними вертикальный Divider */
  linkGroups?: FooterLink[][];
  /** Figma: Buttons — primary-action и secondary-action (Button M, на всю ширину) */
  actions?: ReactNode;
  /** Figma: «Need the app on the go?» */
  appTitle?: ReactNode;
  /** Figma: App Store · Google Play · Direct APK */
  appLinks?: FooterAppLink[];
  className?: string;
};

/** Подвал сайта (Figma 600:185, Platform=desktop): бренд, ссылки, действия и ссылки на приложение. Мобильная раскладка — столбиком. */
export function Footer({ logo = <Logo />, description, copyright, linkGroups, actions, appTitle, appLinks, className }: FooterProps) {
  return (
    <footer className={cn('at-footer', className)}>
      <div className="at-footer__container">
        <div className="at-footer__main">
          <div className="at-footer__brand">
            <div className="at-footer__brand-top">
              {logo}
              {description && <p className="at-footer__description text-body-xs">{description}</p>}
            </div>
            {copyright && <p className="at-footer__copyright text-body-xs">{copyright}</p>}
          </div>
          {linkGroups && linkGroups.length > 0 && (
            <div className="at-footer__columns">
              {linkGroups.map((links, g) => (
                <div key={g} className="at-footer__column-group">
                  {g > 0 && <Divider orientation="vertical" />}
                  <nav className="at-footer__links">
                    {links.map((l, i) => <a key={i} className="at-footer__link text-label-md" href={l.href}>{l.label}</a>)}
                  </nav>
                </div>
              ))}
            </div>
          )}
        </div>
        {(actions || (appLinks && appLinks.length > 0)) && (
          <div className="at-footer__actions">
            {actions && <div className="at-footer__buttons">{actions}</div>}
            {appLinks && appLinks.length > 0 && (
              <div className="at-footer__apps">
                {appTitle && <p className="at-footer__apps-title text-label-md">{appTitle}</p>}
                <div className="at-footer__app-links">
                  {appLinks.map((l, i) => (
                    <div key={i} className="at-footer__app-item">
                      {i > 0 && <Divider orientation="vertical" />}
                      <a className="at-footer__app-link text-label-md" href={l.href}>
                        {l.icon && <span className="at-footer__app-icon">{l.icon}</span>}
                        {l.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
