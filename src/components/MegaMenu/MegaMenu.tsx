import type { ReactNode } from 'react';
import { cn } from '../cn';
import { List } from '../List/List';
import { ListItem } from '../ListItem/ListItem';
import './MegaMenu.css';

export type MegaMenuItem = {
  title: ReactNode;
  /** Figma: Text Container → description */
  description?: ReactNode;
  /** Контурная иконка 20×20 в круглой подложке слева */
  icon?: ReactNode;
  onClick?: () => void;
};

export type MegaMenuProps = {
  /** Figma: Service List — столбцы List со строками List Item */
  columns: MegaMenuItem[][];
  'aria-label'?: string;
  className?: string;
};

/** Выпадающая панель шапки (Figma 420:1598): столбцы списков услуг под Header Bar. */
export function MegaMenu({ columns, className, ...rest }: MegaMenuProps) {
  return (
    <nav className={cn('at-mega-menu', className)} aria-label={rest['aria-label']}>
      <div className="at-mega-menu__content">
        {columns.map((items, c) => (
          <div key={c} className="at-mega-menu__column">
            <List variant="list">
              {items.map((it, i) => (
                <ListItem
                  key={i}
                  showDivider={false}
                  leftSlot={it.icon && <span className="at-mega-menu__icon" aria-hidden="true">{it.icon}</span>}
                  title={it.title}
                  description={it.description}
                  onClick={it.onClick}
                />
              ))}
            </List>
          </div>
        ))}
      </div>
    </nav>
  );
}
