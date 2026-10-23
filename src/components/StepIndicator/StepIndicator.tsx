import { cn } from '../cn';
import './StepIndicator.css';

export type StepIndicatorProps = {
  /** Figma-ось Step: текущий шаг, 1–5 (число шагов = число подписей) */
  step: number;
  /** Figma-ось State: ошибка подсвечивает текущий шаг */
  state?: 'default' | 'error';
  /** Figma-ось Layout: compact — точки с линиями, labeled — номера с подписями */
  layout?: 'compact' | 'labeled';
  /** Figma: label-1..label-5 */
  labels: string[];
  className?: string;
};

type Status = 'done' | 'current' | 'pending' | 'error';

export function StepIndicator({ step, state = 'default', layout = 'compact', labels, className }: StepIndicatorProps) {
  const statusOf = (i: number): Status => {
    if (i + 1 < step) return 'done';
    if (i + 1 === step) return state === 'error' ? 'error' : 'current';
    return 'pending';
  };
  const mark = (s: Status, i: number) => {
    if (s === 'done') return '✓';
    if (s === 'error') return '!';
    return layout === 'labeled' ? i + 1 : null;
  };

  return (
    <ol
      className={cn('at-step-indicator', className)}
      data-layout={layout}
      aria-label={`Step ${step} of ${labels.length}`}
    >
      {labels.map((label, i) => {
        const s = statusOf(i);
        return (
          <li key={label} className="at-step-indicator__step" data-status={s} aria-current={s === 'current' || s === 'error' ? 'step' : undefined}>
            <span className={cn('at-step-indicator__marker', layout === 'labeled' && 'text-label-sm')} aria-hidden>
              {mark(s, i)}
            </span>
            {layout === 'labeled' ? (
              <span className="at-step-indicator__label text-label-sm">{label}</span>
            ) : (
              <span className="at-step-indicator__sr">{label}</span>
            )}
            {layout === 'compact' && i < labels.length - 1 && <span className="at-step-indicator__connector" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}
