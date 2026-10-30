import { AccountDetailsCard } from '../account-details/AccountDetailsCard';
import { DEMO_DETAILS, type AccountDetails, type ChangeableField } from '../account-details/accountDetailsData';
import { NotificationsSection, type NotificationsSectionProps } from '../account-notifications/NotificationsSection';
import { SecuritySection, type SecuritySectionProps } from '../account-security/SecuritySection';
import { AccountLayout } from './AccountLayout';
import { AffiliateSection, type AffiliateSectionProps } from './AffiliateSection';
import { DEMO_USER, type AccountNavTarget, type AccountUser } from './accountData';

export type AccountCabinetProps = {
  user?: AccountUser;
  /** Раздел, открытый в меню и показанный справа. null — меню как отдельная страница (на узком экране) */
  section: AccountNavTarget;
  onNavigate?: (section: AccountNavTarget) => void;
  onLogout?: () => void | Promise<void>;
  affiliate?: AffiliateSectionProps;
  details?: AccountDetails;
  onRequestChange?: (field: ChangeableField) => void;
  notifications?: NotificationsSectionProps;
  security?: SecuritySectionProps;
};

/** Кабинет целиком: один каркас (шапка, меню, подвал), в котором меняется только содержимое раздела.
 *  Каркас не пересоздаётся при переключении пунктов меню — поэтому меню, шапка и позиция страницы не прыгают.
 *  На узком экране (< 1280) меню и раздел — отдельные страницы (section === null — меню). */
export function AccountCabinet({ user = DEMO_USER, section, onNavigate, onLogout, affiliate, details = DEMO_DETAILS, onRequestChange, notifications, security }: AccountCabinetProps) {
  return (
    <AccountLayout user={user} section={section} onNavigate={onNavigate} onLogout={onLogout}>
      {section === 'affiliate' && <AffiliateSection {...affiliate} />}
      {section === 'details' && <AccountDetailsCard details={details} onRequestChange={onRequestChange} />}
      {section === 'security' && <SecuritySection {...security} />}
      {section === 'notifications' &&<NotificationsSection {...notifications} />}
    </AccountLayout>
  );
}
