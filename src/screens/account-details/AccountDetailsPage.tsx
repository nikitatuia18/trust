import { AccountLayout } from '../account/AccountLayout';
import { DEMO_USER, type AccountSection, type AccountUser } from '../account/accountData';
import { AccountDetailsCard } from './AccountDetailsCard';
import { DEMO_DETAILS, type AccountDetails, type ChangeableField } from './accountDetailsData';

export type AccountDetailsPageProps = {
  user?: AccountUser;
  details?: AccountDetails;
  onNavigate?: (section: AccountSection) => void;
  onLogout?: () => void | Promise<void>;
  /** Нажали на карандаш у телефона или Telegram: здесь разработчики ведут пользователя в поддержку */
  onRequestChange?: (field: ChangeableField) => void;
};

/** Кабинет, раздел «Account details» (Figma «1.2 Account / Account detalis») отдельной страницей. Данные — снаружи, экран только раскладывает. */
export function AccountDetailsPage({ user = DEMO_USER, details = DEMO_DETAILS, onNavigate, onLogout, onRequestChange }: AccountDetailsPageProps) {
  return (
    <AccountLayout user={user} section="details" onNavigate={onNavigate} onLogout={onLogout}>
      <AccountDetailsCard details={details} onRequestChange={onRequestChange} />
    </AccountLayout>
  );
}
