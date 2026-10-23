import type { ReactNode } from 'react';
import { cn } from '../cn';
import { Divider } from '../Divider/Divider';
import { TextContainer } from '../TextContainer/TextContainer';
import './ListItem.css';

export type ListItemProps = {
  /** Figma-ось Size */
  size?: 'large' | 'small';
  /** Figma-ось Style */
  variant?: 'list' | 'card';
  /** Figma-ось Selected */
  selected?: boolean;
  disabled?: boolean;
  /** Figma: show-divider */
  showDivider?: boolean;
  /** Figma: slot-left / slot-center / slot-right */
  leftSlot?: ReactNode;
  centerSlot?: ReactNode;
  rightSlot?: ReactNode;
  /** Figma: Text Container внутри элемента */
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  caption?: ReactNode;
  /** Если передан — элемент становится кнопкой (hover/active из Figma) */
  onClick?: () => void;
  className?: string;
};

export function ListItem({
  size = 'large',
  variant = 'list',
  selected = false,
  disabled = false,
  showDivider = true,
  leftSlot,
  centerSlot,
  rightSlot,
  title,
  subtitle,
  description,
  caption,
  onClick,
  className,
}: ListItemProps) {
  const body = (
    <>
      {showDivider && <Divider />}
      <div className="at-list-item__content">
        {leftSlot && <span className="at-list-item__slot">{leftSlot}</span>}
        <div className="at-list-item__main">
          <div className="at-list-item__row">
            <div className="at-list-item__header">
              <TextContainer title={title} subtitle={subtitle} description={description} caption={caption} />
              {centerSlot && <span className="at-list-item__center">{centerSlot}</span>}
            </div>
            {rightSlot && <span className="at-list-item__slot">{rightSlot}</span>}
          </div>
        </div>
      </div>
    </>
  );
  const common = {
    className: cn('at-list-item', className),
    'data-size': size,
    'data-variant': variant,
    'data-selected': selected || undefined,
    'data-disabled': disabled || undefined,
  };
  if (onClick) {
    return (
      <button type="button" {...common} onClick={onClick} disabled={disabled} aria-pressed={selected}>
        {body}
      </button>
    );
  }
  return (
    <div role="listitem" {...common} aria-disabled={disabled || undefined}>
      {body}
    </div>
  );
}
