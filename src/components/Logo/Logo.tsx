import { cn } from '../cn';
import mark from './logo-mark.svg';
import word from './logo-word.svg';
import './Logo.css';

export type LogoProps = {
  className?: string;
  /** Подпись для скринридера */
  label?: string;
};

/** Логотип AllTrust (Figma 354:2882): знак и вордмарк. Бренд-арт вне токенов, цвета зашиты в SVG. */
export function Logo({ className, label = 'AllTrust' }: LogoProps) {
  return (
    <span className={cn('at-brand-logo', className)} role="img" aria-label={label}>
      <img className="at-brand-logo__mark" src={mark} alt="" />
      <img className="at-brand-logo__word" src={word} alt="" />
    </span>
  );
}
