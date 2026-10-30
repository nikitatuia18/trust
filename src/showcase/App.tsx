import { useEffect, useState } from 'react';
import { TokensPage } from './TokensPage';
import { ComponentsPage } from './ComponentsPage';
import { RulesPage } from './RulesPage';
import { ScreensPage } from './ScreensPage';
import { AccountCabinet, RegistrationFlow, type AccountSection } from '../screens';

type Page = 'tokens' | 'components' | 'screens' | 'rules' | 'registration' | 'account' | 'account-details';

/** Разделы кабинета, у которых уже есть страница; остальные пункты меню пока без перехода */
const ACCOUNT_ROUTES: Partial<Record<AccountSection, Page>> = { details: 'account-details', affiliate: 'account' };
const ROUTE_SECTIONS: Partial<Record<Page, AccountSection>> = { 'account-details': 'details', account: 'affiliate' };
const goToSection = (section: AccountSection) => {
  const route = ACCOUNT_ROUTES[section];
  if (!route) return;
  window.location.hash = `#/${route}`;
  // Новый раздел открывается с верха, как страница: иначе у короткого раздела прокрутка «съезжает» на высоту длинного
  window.scrollTo(0, 0);
};

const NAV: { id: Page; label: string; ready: boolean }[] = [
  { id: 'tokens', label: 'Токены', ready: true },
  { id: 'components', label: 'Компоненты', ready: true },
  { id: 'screens', label: 'Экраны', ready: true },
  { id: 'rules', label: 'Правила', ready: true },
];

const fromHash = (): Page => {
  const h = window.location.hash.replace('#/', '') as Page;
  // registration и страницы кабинета — отдельные страницы без оболочки витрины, в меню их нет
  return h === 'registration' || h === 'account' || h === 'account-details' || NAV.some((n) => n.id === h) ? h : 'tokens';
};

export function App() {
  const [page, setPage] = useState<Page>(fromHash);
  const [layout, setLayout] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const on = () => setPage(fromHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  // Принудительный Mobile-режим токенов (<html data-layout="mobile">)
  useEffect(() => {
    if (layout === 'mobile') document.documentElement.dataset.layout = 'mobile';
    else delete document.documentElement.dataset.layout;
  }, [layout]);

  if (page === 'registration') return <RegistrationFlow />;
  // Оба раздела кабинета — один и тот же элемент AccountCabinet: каркас не пересоздаётся, меняется только содержимое
  const cabinetSection = ROUTE_SECTIONS[page];
  if (cabinetSection) return <AccountCabinet section={cabinetSection} onNavigate={goToSection} />;

  return (
    <div className="sc-shell">
      <aside className="sc-side">
        <div className="sc-brand text-heading-h4">AllTrust</div>
        <p className="text-body-xs sc-muted">Design System</p>
        <nav className="sc-nav">
          {NAV.map((n) => (
            <a key={n.id} href={`#/${n.id}`} className={`sc-nav__item text-label-md ${page === n.id ? 'is-active' : ''} ${n.ready ? '' : 'is-soon'}`}>
              {n.label}{!n.ready && <span className="text-caption-default"> · скоро</span>}
            </a>
          ))}
        </nav>
        <div className="sc-toggle" role="group" aria-label="Режим Layout">
          <button className={layout === 'desktop' ? 'is-on' : ''} onClick={() => setLayout('desktop')}>Desktop</button>
          <button className={layout === 'mobile' ? 'is-on' : ''} onClick={() => setLayout('mobile')}>Mobile</button>
        </div>
      </aside>
      <main className="sc-main">
        {page === 'tokens' && <TokensPage />}
        {page === 'components' && <ComponentsPage />}
        {page === 'screens' && <ScreensPage />}
        {page === 'rules' && <RulesPage />}
      </main>
    </div>
  );
}
