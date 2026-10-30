import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Breadcrumbs, type BreadcrumbItem } from '../../components';
import { PageLayout } from '../SiteShell';
import { AccountSidebar } from './AccountSidebar';
import { ACCOUNT_SECTIONS, type AccountNavTarget, type AccountSection, type AccountUser } from './accountData';
import './account.css';

/** Ширина контейнера, с которой меню и раздел встают рядом (как на десктопе); уже — два отдельных вида */
const WIDE_MIN_WIDTH = 1280;

export type AccountLayoutProps = {
  user: AccountUser;
  /** Раздел, подсвеченный в меню. null — меню без выбранного раздела: на узком экране это отдельная страница */
  section: AccountNavTarget;
  /** Переход в раздел; null — вернуться в меню (на узком экране) */
  onNavigate?: (section: AccountNavTarget) => void;
  onLogout?: () => void | Promise<void>;
  /** Содержимое раздела справа от меню */
  children?: ReactNode;
};

/** Каркас всех разделов кабинета: шапка и подвал сайта, хлебные крошки, меню слева и содержимое раздела справа.
 *  На узком экране (< 1280) меню и раздел — две отдельные страницы: из меню открывается раздел, назад — крошкой «Account». */
export function AccountLayout({ user, section, onNavigate, onLogout, children }: AccountLayoutProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  /** null — ширина ещё не измерена (до первой отрисовки) */
  const [wide, setWide] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setWide(el.clientWidth >= WIDE_MIN_WIDTH);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Широкому экрану пустое «меню» не нужно: рядом с меню всегда открыт какой-то раздел
  useEffect(() => {
    if (wide && section === null) onNavigate?.(ACCOUNT_SECTIONS[0].id);
  }, [wide, section, onNavigate]);

  const showMenu = wide === true || section === null;
  const showContent = wide === true || section !== null;
  const current = ACCOUNT_SECTIONS.find((s) => s.id === section);

  const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: '#' }];
  if (wide === false && current) crumbs.push({ label: 'Account', href: '#', onClick: () => onNavigate?.(null) }, { label: current.title });
  else crumbs.push({ label: 'Account' });

  return (
    <PageLayout align="start" signedIn>
      <div className="scr-account-wrap" ref={wrapRef}>
        {wide !== null && (
          <div className="scr-account-page">
            <Breadcrumbs items={crumbs} />
            <div className="scr-account" data-wide={wide}>
              {showMenu && <AccountSidebar user={user} section={section} onNavigate={(s: AccountSection) => onNavigate?.(s)} onLogout={onLogout} />}
              {showContent && <div className="scr-account__content">{children}</div>}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
