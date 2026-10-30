import { useEffect, useRef, useState } from 'react';
import { Button, Chip, CopyIcon, ExportIcon, FormCard, IconCircle, LinkIcon, ListItem, StatTile, TickCircleIcon, UsersIcon, WalletIcon } from '../../components';
import { formatReferrals, formatUsdt, type AffiliateData } from './accountData';

type EarningsCardProps = {
  data: AffiliateData;
  onWithdraw?: () => void;
  onCopyLink?: () => void;
  onHowItWorks?: () => void;
};

/** «Earnings»: три показателя, реферальная ссылка и вывод средств */
export function EarningsCard({ data, onWithdraw, onCopyLink, onHowItWorks }: EarningsCardProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(data.referralLink).catch(() => undefined);
    onCopyLink?.();
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const canWithdraw = data.availableToWithdraw >= data.minWithdrawal;

  return (
    <FormCard
      fluid
      header={<h2 className="scr-card-title text-heading-h4">Earnings</h2>}
      primaryAction={<Button disabled={!canWithdraw} onClick={onWithdraw}>Withdraw earnings</Button>}
      secondaryAction={<p className="scr-card-note text-body-xs">Minimum withdrawal: {formatUsdt(data.minWithdrawal)}</p>}
    >
      <div className="scr-stats">
        <StatTile icon={<WalletIcon />} value={formatUsdt(data.totalEarnings)} label="Total earnings" />
        <StatTile icon={<ExportIcon />} value={formatUsdt(data.availableToWithdraw)} label="Available to withdraw" />
        <StatTile icon={<UsersIcon />} value={formatReferrals(data.referralCount)} label="Referred users" />
      </div>
      <ListItem
        className="scr-ref-link"
        variant="card"
        showDivider={false}
        leftSlot={<IconCircle><LinkIcon /></IconCircle>}
        title="My referral link"
        subtitle={<Chip onClick={onHowItWorks}>How does it work?</Chip>}
        description={data.referralLink}
        rightSlot={
          <Button
            variant="ghost"
            iconOnly
            iconLeft={copied ? <TickCircleIcon /> : <CopyIcon />}
            aria-label={copied ? 'Link copied' : 'Copy referral link'}
            onClick={copy}
          />
        }
      />
    </FormCard>
  );
}
