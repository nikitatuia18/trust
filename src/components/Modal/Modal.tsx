import { useEffect, useId, useRef, type ReactNode } from 'react';
import { cn } from '../cn';
import './Modal.css';

export type ModalProps = {
  /** Окно открыто. Состояние держит родитель: закрытие — через onClose */
  open: boolean;
  /** Нажали Esc или клик по затемнению вне окна */
  onClose: () => void;
  /** Иллюстрация над заголовком (слот; сами иллюстрации и отступ до заголовка — позже). По центру */
  illustration?: ReactNode;
  /** Заголовок по центру */
  title: ReactNode;
  /** Пояснение под заголовком, по центру */
  description?: ReactNode;
  /** Тело между шапкой и действиями (например, поля короткой формы). Для подтверждений не нужно */
  children?: ReactNode;
  /** Главное действие (слева в ряду) */
  primaryAction?: ReactNode;
  /** Второе действие (справа в ряду) */
  secondaryAction?: ReactNode;
  className?: string;
};

/** Модальное окно: страница под ним размывается и слегка затемняется, фокус остаётся внутри, Esc закрывает.
 *  Окно — свой компонент (не Form Card): по центру заголовок и пояснение, поля сверху и снизу крупнее (Space/5xl), два действия в ряд.
 *  Для подтверждений, коротких форм и сообщений, которые требуют ответа до возврата на страницу. */
export function Modal({ open, onClose, illustration, title, description, children, primaryAction, secondaryAction, className }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // Нативный <dialog>: showModal даёт фокус-ловушку, inert страницу под окном и возврат фокуса на кнопку, открывшую окно.
  // Фокус при открытии — на самом окне, а не на кнопке: кольцо фокуса у кнопки «зависало» бы, а на окне его нет; кнопки получают фокус по Tab.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      el.focus({ preventScroll: true });
    }
    if (!open && el.open) el.close();
  }, [open]);

  const hasActions = primaryAction || secondaryAction;
  return (
    <dialog
      ref={ref}
      className={cn('at-modal', className)}
      tabIndex={-1}
      aria-labelledby={titleId}
      // Esc: окно закрывает родитель (состояние у него), поэтому нативное закрытие отменяем
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      // Клик по затемнению (по самому диалогу, а не по окну внутри)
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {open && (
        <section className="at-modal__window" data-has-description={description ? '' : undefined}>
          <header className="at-modal__zone at-modal__header">
            {illustration && <div className="at-modal__illustration">{illustration}</div>}
            <h2 id={titleId} className="at-modal__title text-heading-h4">{title}</h2>
            {description && <p className="at-modal__description text-body-sm">{description}</p>}
          </header>
          {children && <div className="at-modal__zone at-modal__body">{children}</div>}
          {hasActions && (
            <footer className="at-modal__zone at-modal__footer">
              {primaryAction}
              {secondaryAction}
            </footer>
          )}
        </section>
      )}
    </dialog>
  );
}
