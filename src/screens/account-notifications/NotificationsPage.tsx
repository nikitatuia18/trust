import { AccountLayout } from '../account/AccountLayout';
import { DEMO_USER, type AccountSection, type AccountUser } from '../account/accountData';
import { NotificationsSection, type NotificationsSectionProps } from './NotificationsSection';

export type NotificationsPageProps = NotificationsSectionProps & {
  user?: AccountUser;
  onNavigate?: (section: AccountSection) => void;
  onLogout?: () => void;
};

/** Кабинет, раздел «Notifications» отдельной страницей. Данные и сохранение — снаружи, экран только раскладывает. */
export function NotificationsPage({ user = DEMO_USER, onNavigate, onLogout, ...notifications }: NotificationsPageProps) {
  return (
    <AccountLayout user={user} section="notifications" onNavigate={onNavigate} onLogout={onLogout}>
      <NotificationsSection {...notifications} />
    </AccountLayout>
  );
}
