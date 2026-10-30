import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '../cn';
import './Modal.css';

export type ModalProps = {
  /** Окно открыто. Состояние держит родитель: закрытие — через onClose */
  open: boolean;
  /** Нажали Esc или клик по затемнению вне окна */
  onClose: () => void;
  /** Подпись окна для скринридеров; если у окна есть заголовок — вместо неё aria-labelledby с его id */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Само окно: обычно Form Card (+ Window Header). Модалка его не рисует, а только ставит по центру поверх страницы */
  children: ReactNode;
  className?: string;
};

/** Окно поверх страницы: задний экран размывается и затемняется, фокус остаётся внутри, Esc закрывает.
 *  Сам вид окна — Form Card; для подтверждений, коротких форм и сообщений, которые требуют ответа до возврата на страницу. */
export function Modal({ open, onClose, children, className, ...aria }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // Нативный <dialog>: showModal даёт фокус-ловушку, inert страницу под окном и возврат фокуса на кнопку, открывшую окно
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      // Фокус по умолчанию — на элементе с data-autofocus (например, «Cancel» в подтверждении необратимого действия), иначе на первом в окне
      el.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn('at-modal', className)}
      {...aria}
      // Esc: окно закрывает родитель (состояние у него), поэтому нативное закрытие отменяем
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      // Клик по затемнению (по самому диалогу, а не по окну внутри)
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {open && children}
    </dialog>
  );
}
