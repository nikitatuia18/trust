import { useEffect, useRef } from 'react';
import { cn } from '../cn';
import { HeaderBar, type HeaderBarProps } from '../HeaderBar/HeaderBar';
import { MegaMenu, type MegaMenuItem } from '../MegaMenu/MegaMenu';
import './Header.css';

export type HeaderProps = HeaderBarProps & {
  /** Figma: Mega Menu — столбцы пунктов. Нет значения — шапка без выпадающей панели */
  menu?: MegaMenuItem[][];
  /** Figma-ось Content: true = mega-menu, false = default */
  open?: boolean;
  /** Закрытие по Esc и клику вне шапки */
  onClose?: () => void;
};

/** Шапка сайта (Figma 464:3830): Header Bar и под ним Mega Menu, которая накрывает страницу, а не сдвигает её. */
export function Header({ menu, open = false, onClose, className, ...bar }: HeaderProps) {
  const root = useRef<HTMLElement>(null);
  const shown = Boolean(menu && open);

  useEffect(() => {
    if (!shown || !onClose) return;
    const onDown = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) onClose(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [shown, onClose]);

  return (
    <header ref={root} className={cn('at-header', className)} data-content={shown ? 'mega-menu' : 'default'}>
      <HeaderBar {...bar} />
      {shown && menu && <div className="at-header__menu"><MegaMenu columns={menu} /></div>}
    </header>
  );
}
