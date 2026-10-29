import type { ReactNode } from 'react';
import { cn } from '../cn';
import { CurrencyIcon } from '../CurrencyIcon/CurrencyIcon';
import { LogoWithBadge } from '../LogoWithBadge/LogoWithBadge';
import { BANK_MARKS } from './marks';
import './BankLogo.css';

export type BankName = 'BOG' | 'TBC' | 'Credo' | 'Visa' | 'Mastercard' | 'Cash';

export type BankLogoProps = {
  /** Figma-ось Name */
  name: BankName;
  /** Figma: BOOLEAN show-badge (default вкл.) */
  showBadge?: boolean;
  /** Figma: INSTANCE_SWAP badge (default — Currency Icon GEL m) */
  badge?: ReactNode;
  /** Свой знак вместо встроенного (для BOG и Credo, пока арт не перенесён) */
  logo?: ReactNode;
  className?: string;
};

const LABEL: Record<BankName, string> = { BOG: 'BOG', TBC: 'TBC', Credo: 'Credo', Visa: 'Visa', Mastercard: 'Mastercard', Cash: 'Cash' };

/** Cash — Currency Icon GEL l без подложки и бейджа (как в Figma). Остальное — подложка + знак 16 + бейдж. */
export function BankLogo({ name, showBadge = true, badge, logo, className }: BankLogoProps) {
  if (name === 'Cash') {
    return <CurrencyIcon currency="GEL" size="l" className={className} />;
  }
  const mark = logo ?? BANK_MARKS[name]?.() ?? (
    // временно, пока знак банка не перенесён из Figma: первая буква
    <span className="at-bank-logo__initial text-label-sm" aria-hidden>{name[0]}</span>
  );
  return (
    <span className={cn('at-bank-logo', className)} role="img" aria-label={LABEL[name]}>
      <LogoWithBadge
        size="l"
        main={<span className="at-bank-logo__plate"><span className="at-bank-logo__mark">{mark}</span></span>}
        badge={showBadge ? badge ?? <CurrencyIcon currency="GEL" size="m" /> : undefined}
      />
    </span>
  );
}
