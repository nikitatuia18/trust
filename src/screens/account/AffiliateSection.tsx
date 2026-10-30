import { DiscountShapeIcon, LockIcon } from '../../components';
import { DEMO_AFFILIATE, type AffiliateData } from './accountData';
import { EarningsCard } from './EarningsCard';
import { HistoryCard } from './HistoryCard';
import { InfoCard } from './InfoCard';
import { PromotionCard } from './PromotionCard';

export type AffiliateSectionProps = {
  affiliate?: AffiliateData;
  onWithdraw?: () => void;
  onCopyLink?: () => void;
  onHowItWorks?: () => void;
  onDownloadQr?: () => void;
  onShareQr?: () => void;
  onSortHistory?: () => void;
  onViewAllHistory?: () => void;
};

/** Содержимое раздела «Affiliate program» (Figma «1.1 Account / Affiliate program»): два ряда карточек справа от меню кабинета */
export function AffiliateSection({
  affiliate = DEMO_AFFILIATE,
  onWithdraw,
  onCopyLink,
  onHowItWorks,
  onDownloadQr,
  onShareQr,
  onSortHistory,
  onViewAllHistory,
}: AffiliateSectionProps) {
  return (
    <>
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
    </>
  );
}
