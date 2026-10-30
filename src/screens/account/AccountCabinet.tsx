import { AccountDetailsCard } from '../account-details/AccountDetailsCard';
import { DEMO_DETAILS, type AccountDetails, type ChangeableField } from '../account-details/accountDetailsData';
import { NotificationsSection, type NotificationsSectionProps } from '../account-notifications/NotificationsSection';
import { AccountLayout } from './AccountLayout';
import { AffiliateSection, type AffiliateSectionProps } from './AffiliateSection';
import { DEMO_USER, type AccountSection, type AccountUser } from './accountData';

export type AccountCabinetProps = {
  user?: AccountUser;
  /** Раздел, открытый в меню и показанный справа */
  section: AccountSection;
  onNavigate?: (section: AccountSection) => void;
  onLogout?: () => void;
  affiliate?: AffiliateSectionProps;
  details?: AccountDetails;
  onRequestChange?: (field: ChangeableField) => void;
  notifications?: NotificationsSectionProps;
};

/** Кабинет целиком: один каркас (шапка, меню, подвал), в котором меняется только содержимое раздела.
 *  Каркас не пересоздаётся при переключении пунктов меню — поэтому меню, шапка и позиция страницы не прыгают. */
export function AccountCabinet({ user = DEMO_USER, section, onNavigate, onLogout, affiliate, details = DEMO_DETAILS, onRequestChange, notifications }: AccountCabinetProps) {
  return (
    <AccountLayout user={user} section={section} onNavigate={onNavigate} onLogout={onLogout}>
      {section === 'affiliate' && <AffiliateSection {...affiliate} />}
      {section === 'details' && <AccountDetailsCard details={details} onRequestChange={onRequestChange} />}
      {section === 'notifications' && <NotificationsSection {...notifications} />}
    </AccountLayout>
  );
}
