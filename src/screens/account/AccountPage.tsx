import { AccountLayout } from './AccountLayout';
import { AffiliateSection, type AffiliateSectionProps } from './AffiliateSection';
import { DEMO_USER, type AccountSection, type AccountUser } from './accountData';

export type AccountPageProps = AffiliateSectionProps & {
  user?: AccountUser;
  /** Раздел, открытый в меню. Здесь всегда 'affiliate'; переключение разделов — в AccountCabinet */
  section?: AccountSection;
  onNavigate?: (section: AccountSection) => void;
  onLogout?: () => void | Promise<void>;
};

/** Кабинет, раздел «Affiliate program» отдельной страницей. Данные и действия — снаружи, экран только раскладывает. */
export function AccountPage({ user = DEMO_USER, section = 'affiliate', onNavigate, onLogout, ...affiliate }: AccountPageProps) {
  return (
    <AccountLayout user={user} section={section} onNavigate={onNavigate} onLogout={onLogout}>
      <AffiliateSection {...affiliate} />
    </AccountLayout>
  );
}
