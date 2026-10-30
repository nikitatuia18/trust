import { AccountLayout } from '../account/AccountLayout';
import { DEMO_USER, type AccountSection, type AccountUser } from '../account/accountData';
import { AccountDetailsCard } from './AccountDetailsCard';
import { DEMO_DETAILS, type AccountDetails } from './accountDetailsData';

export type AccountDetailsPageProps = {
  user?: AccountUser;
  details?: AccountDetails;
  onNavigate?: (section: AccountSection) => void;
  onLogout?: () => void;
};

/** Кабинет, раздел «Account details» (Figma «1.2 Account / Account detalis»). Данные — снаружи, экран только раскладывает. */
export function AccountDetailsPage({ user = DEMO_USER, details = DEMO_DETAILS, onNavigate, onLogout }: AccountDetailsPageProps) {
  return (
    <AccountLayout user={user} section="details" onNavigate={onNavigate} onLogout={onLogout}>
      <AccountDetailsCard details={details} />
    </AccountLayout>
  );
}
