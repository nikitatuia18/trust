import { useState, type ReactNode } from 'react';
import { cn } from '../cn';
import { Icon } from '../Icon/Icon';
import './OrderSummary.css';

export type OrderSummaryProps = {
  /** Figma: title */
  title?: ReactNode;
  /** Figma-ось Expanded (неуправляемый режим: начальное значение) */
  defaultExpanded?: boolean;
  /** Управляемый режим */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** Figma: show-header */
  showHeader?: boolean;
  /** Figma: slot rows — List Item (small, list) и OrderSummaryNested */
  children?: ReactNode;
  /** Слот шеврона; по умолчанию текстовый глиф (иконки — отдельный этап) */
  chevron?: ReactNode;
  className?: string;
};

export function OrderSummary({
  title,
  defaultExpanded = true,
  expanded: expandedProp,
  onExpandedChange,
  showHeader = true,
  children,
  chevron = <Icon direction="up" />,
  className,
}: OrderSummaryProps) {
  const [inner, setInner] = useState(defaultExpanded);
  const expanded = expandedProp ?? inner;
  const toggle = () => {
    onExpandedChange?.(!expanded);
    if (expandedProp === undefined) setInner(!expanded);
  };

  return (
    <section className={cn('at-summary', className)} data-expanded={expanded}>
      {showHeader && (
        <header className="at-summary__header">
          <h3 className="at-summary__title text-label-sm-caps">{title}</h3>
          <button type="button" className="at-summary__toggle" aria-expanded={expanded} aria-label="Toggle order summary" onClick={toggle}>
            <span aria-hidden className="at-summary__chevron">{chevron}</span>
          </button>
        </header>
      )}
      {expanded && <div className="at-summary__card">{children}</div>}
    </section>
  );
}

/** Вложенная группа строк со смещением (Figma: nested в rows) */
export function OrderSummaryNested({ children }: { children: ReactNode }) {
  return <div className="at-summary__nested">{children}</div>;
}
