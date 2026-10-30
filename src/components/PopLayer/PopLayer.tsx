import { useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../cn';
import './PopLayer.css';

export type PopLayerProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  open: boolean;
  /** Позиция слоя (position/top/left…) — задаёт компонент-хозяин; анимацией и тенью занимается PopLayer */
  className?: string;
  children: ReactNode;
};

/**
 * Резиновый выплывающий слой (список, подсказка): растёт из центра элемента-якоря — им считается
 * предыдущий соседний элемент (кнопка) — и пружинит; закрываясь, быстро втягивается обратно.
 * В DOM остаётся всегда: закрытый слой скрыт (visibility) и недоступен (inert).
 */
export function PopLayer({ open, className, children, ...rest }: PopLayerProps) {
  const root = useRef<HTMLDivElement>(null);

  // Точка роста — центр якоря в координатах самого слоя. offsetLeft/Top не зависят от transform.
  useLayoutEffect(() => {
    const el = root.current;
    const anchor = el?.previousElementSibling as HTMLElement | null;
    if (!el || !anchor) return;
    el.style.setProperty('--pop-origin-x', `${anchor.offsetLeft + anchor.offsetWidth / 2 - el.offsetLeft}px`);
    el.style.setProperty('--pop-origin-y', `${anchor.offsetTop + anchor.offsetHeight / 2 - el.offsetTop}px`);
  }, [open]);

  return (
    <div ref={root} {...rest} className={cn('at-pop', className)} data-state={open ? 'open' : 'closed'} inert={!open}>
      <div className="at-pop__card">{children}</div>
    </div>
  );
}
