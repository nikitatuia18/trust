import { DiscountShapeIcon, LockIcon } from '../../components';
import { AccountLayout } from './AccountLayout';
import { DEMO_AFFILIATE, DEMO_USER, type AccountSection, type AccountUser, type AffiliateData } from './accountData';
import { EarningsCard } from './EarningsCard';
import { HistoryCard } from './HistoryCard';
import { InfoCard } from './InfoCard';
import { PromotionCard } from './PromotionCard';

export type AccountPageProps = {
  user?: AccountUser;
  affiliate?: AffiliateData;
  /** Раздел, открытый в меню. Сейчас собран только 'affiliate' */
  section?: AccountSection;
  onNavigate?: (section: AccountSection) => void;
  onLogout?: () => void;
  onWithdraw?: () => void;
  onCopyLink?: () => void;
  onHowItWorks?: () => void;
  onDownloadQr?: () => void;
  onShareQr?: () => void;
  onSortHistory?: () => void;
  onViewAllHistory?: () => void;
};

/** Кабинет, раздел «Affiliate program» (Figma «1.1 Account / Affiliate program»). Данные и действия — снаружи, экран только раскладывает. */
export function AccountPage({
  user = DEMO_USER,
  affiliate = DEMO_AFFILIATE,
  section = 'affiliate',
  onNavigate,
  onLogout,
  onWithdraw,
  onCopyLink,
  onHowItWorks,
  onDownloadQr,
  onShareQr,
  onSortHistory,
  onViewAllHistory,
}: AccountPageProps) {
  return (
    <AccountLayout user={user} section={section} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="scr-account__row" data-row="top">
        <EarningsCard data={affiliate} onWithdraw={onWithdraw} onCopyLink={onCopyLink} onHowItWorks={onHowItWorks} />
        <PromotionCard referralLink={affiliate.referralLink} onDownloadQr={onDownloadQr} onCopyLink={onCopyLink} onShareQr={onShareQr} />
      </div>
      <div className="scr-account__row" data-row="bottom">
        <HistoryCard rows={affiliate.history} onSort={onSortHistory} onViewAll={onViewAllHistory} />
        <div className="scr-account__info">
          <InfoCard icon={<DiscountShapeIcon />} title="Your referral commission">
            You earn {affiliate.commissionPercent}% of the profit from each referred exchange
          </InfoCard>
          <InfoCard icon={<LockIcon />} title="Keep your account secure">
            Enable 2FA to protect your account and transactions.
          </InfoCard>
        </div>
      </div>
    </AccountLayout>
  );
}
