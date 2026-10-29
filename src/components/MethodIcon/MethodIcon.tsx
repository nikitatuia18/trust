import { cn } from '../cn';
import { BankIcon, BitcoinIcon, CashIcon } from '../Icon/Glyphs';
import './MethodIcon.css';

export type MethodIconProps = {
  /** Figma-ось Kind */
  kind: 'bank' | 'cash' | 'crypto';
  className?: string;
};

const GLYPH = { bank: BankIcon, cash: CashIcon, crypto: BitcoinIcon } as const;
const LABEL = { bank: 'Bank', cash: 'Cash', crypto: 'Crypto' } as const;

/** Круг-иконка способа оплаты (Figma 693:77): bank = brand, cash = success, crypto = warning. */
export function MethodIcon({ kind, className }: MethodIconProps) {
  const Glyph = GLYPH[kind];
  return (
    <span className={cn('at-method-icon', className)} data-kind={kind} role="img" aria-label={LABEL[kind]}>
      <Glyph />
    </span>
  );
}
