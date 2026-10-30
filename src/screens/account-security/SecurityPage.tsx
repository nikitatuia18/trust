import { AccountLayout } from '../account/AccountLayout';
import { DEMO_USER, type AccountSection, type AccountUser } from '../account/accountData';
import { SecuritySection, type SecuritySectionProps } from './SecuritySection';

export type SecurityPageProps = SecuritySectionProps & {
  user?: AccountUser;
  onNavigate?: (section: AccountSection) => void;
  onLogout?: () => void | Promise<void>;
};

/** Кабинет, раздел «Security» отдельной страницей. Смена пароля и остальные действия — снаружи, экран только раскладывает. */
export function SecurityPage({ user = DEMO_USER, onNavigate, onLogout, ...security }: SecurityPageProps) {
  return (
    <AccountLayout user={user} section="security" onNavigate={onNavigate} onLogout={onLogout}>
      <SecuritySection {...security} />
    </AccountLayout>
  );
}
