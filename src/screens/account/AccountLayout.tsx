import type { ReactNode } from 'react';
import { Breadcrumbs } from '../../components';
import { PageLayout } from '../SiteShell';
import { AccountSidebar } from './AccountSidebar';
import type { AccountSection, AccountUser } from './accountData';
import './account.css';

export type AccountLayoutProps = {
  user: AccountUser;
  /** Раздел, подсвеченный в меню */
  section: AccountSection;
  onNavigate?: (section: AccountSection) => void;
  onLogout?: () => void | Promise<void>;
  /** Содержимое раздела справа от меню */
  children: ReactNode;
};

/** Каркас всех разделов кабинета: шапка и подвал сайта, хлебные крошки, меню слева и содержимое раздела справа */
export function AccountLayout({ user, section, onNavigate, onLogout, children }: AccountLayoutProps) {
  return (
    <PageLayout align="start" signedIn>
      <div className="scr-account-wrap">
        <div className="scr-account-page">
          <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Account' }]} />
          <div className="scr-account">
            <AccountSidebar user={user} section={section} onNavigate={onNavigate} onLogout={onLogout} />
            <div className="scr-account__content">{children}</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
