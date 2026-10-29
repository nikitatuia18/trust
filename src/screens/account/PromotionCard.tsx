import { useState } from 'react';
import { ArrowCircleLeftIcon, Button, FormCard, SegmentedControl } from '../../components';
import qrUrl from './referral-qr.svg';

type PromotionTab = 'qr' | 'banners' | 'scripts';

const TABS: { value: PromotionTab; label: string }[] = [
  { value: 'qr', label: 'QR-code' },
  { value: 'banners', label: 'Banners' },
  { value: 'scripts', label: 'Sales Scripts' },
];

type PromotionCardProps = {
  onDownloadQr?: () => void;
  onShareQr?: () => void;
};

const downloadQr = () => {
  const link = document.createElement('a');
  link.href = qrUrl;
  link.download = 'alltrust-referral-qr.svg';
  link.click();
};

/** «Promotion tools»: вкладки материалов; сейчас нарисована только вкладка QR-code */
export function PromotionCard({ onDownloadQr, onShareQr }: PromotionCardProps) {
  const [tab, setTab] = useState<PromotionTab>('qr');
  return (
    <FormCard
      fluid
      header={
        <div className="scr-card-head" data-stack>
          <h2 className="scr-card-title text-heading-h4">Promotion tools</h2>
          <SegmentedControl size="m" className="scr-segment-fill" aria-label="Promotion tools" options={TABS} value={tab} onChange={setTab} />
        </div>
      }
      primaryAction={
        tab === 'qr' ? (
          <div className="scr-actions-row">
            <Button variant="secondary" onClick={onDownloadQr ?? downloadQr}>Download QR code</Button>
            <Button variant="secondary" iconOnly iconLeft={<ArrowCircleLeftIcon />} aria-label="Share QR code" onClick={onShareQr} />
          </div>
        ) : undefined
      }
    >
      {tab === 'qr' ? (
        <div className="scr-qr">
          <img className="scr-qr__image" src={qrUrl} alt="QR code with your referral link" />
          <p className="text-body-sm">Scan to open your referral link</p>
        </div>
      ) : (
        <p className="scr-empty text-body-sm">Nothing here yet.</p>
      )}
    </FormCard>
  );
}
