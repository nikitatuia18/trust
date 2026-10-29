import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../cn';
import { Button } from '../Button/Button';
import { MoreIcon } from '../Icon/Glyphs';
import { List } from '../List/List';
import { ListItem } from '../ListItem/ListItem';
import './DropdownMenu.css';

export type DropdownMenuItem = {
  id: string;
  label: ReactNode;
  /** Иконка слева (Glyph из Icon) */
  icon?: ReactNode;
  disabled?: boolean;
  onSelect: () => void;
};

export type DropdownMenuProps = {
  items: DropdownMenuItem[];
  /** Подпись кнопки для скринридеров, например «More actions» */
  label: string;
  /** С какого края кнопки открывается список */
  align?: 'start' | 'end';
  /** Куда открывается список: под кнопкой или над ней */
  placement?: 'bottom' | 'top';
  /** Стиль кнопки-триггера (по умолчанию secondary, как соседние кнопки) */
  variant?: 'secondary' | 'ghost';
  size?: 'm' | 's';
  className?: string;
};

/** Меню действий: кнопка с тремя точками и список (List + List Item, как у Language Selector). Закрывается по выбору, Esc и клику снаружи. */
export function DropdownMenu({ items, label, align = 'end', placement = 'bottom', variant = 'secondary', size = 'm', className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={root} className={cn('at-dropdown-menu', className)} data-state={open ? 'open' : 'closed'}>
      <Button
        variant={variant} size={size} iconOnly iconLeft={<MoreIcon />}
        aria-label={label} aria-haspopup="menu" aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      />
      {open && (
        <div className="at-dropdown-menu__list" data-align={align} data-placement={placement}>
          <List>
            {items.map((item) => (
              <ListItem
                key={item.id}
                size="small" variant="list" showDivider={false}
                disabled={item.disabled}
                leftSlot={item.icon && <span className="at-dropdown-menu__icon">{item.icon}</span>}
                title={item.label}
                onClick={() => { setOpen(false); item.onSelect(); }}
              />
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
