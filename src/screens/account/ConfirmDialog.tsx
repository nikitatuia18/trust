import { useId, type ReactNode } from 'react';
import { Button, FormCard, Modal } from '../../components';

export type ConfirmDialogProps = {
  open: boolean;
  /** Идёт запрос на сервере: кнопки недоступны, окно не закрывается */
  pending?: boolean;
  /** Иллюстрация над заголовком (слот на будущее); по центру */
  illustration?: ReactNode;
  title: string;
  /** Пояснение под заголовком */
  text: string;
  confirmLabel: string;
  confirmIcon?: ReactNode;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Подтверждение необратимого действия (блокировка аккаунта, выход): Modal с Form Card.
 *  Заголовок и пояснение — в шапке по центру (так выровнены все модалки), в подвале два действия в ряд. Крестика нет: закрывает «Cancel», Esc или клик по затемнению.
 *  Фокус при открытии — на «Cancel»: действие не должно сработать случайным Enter. */
export function ConfirmDialog({ open, pending = false, illustration, title, text, confirmLabel, confirmIcon, cancelLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const titleId = useId();
  const cancel = () => { if (!pending) onCancel(); };
  return (
    <Modal open={open} onClose={cancel} aria-labelledby={titleId}>
      <FormCard
        actions="inline"
        header={
          <>
            {illustration && <div className="at-modal__illustration">{illustration}</div>}
            <h2 id={titleId} className="at-form-card__title text-heading-h4">{title}</h2>
            <p className="at-form-card__description text-body-sm">{text}</p>
          </>
        }
        primaryAction={<Button variant="destructive" iconLeft={confirmIcon} disabled={pending} onClick={onConfirm}>{confirmLabel}</Button>}
        secondaryAction={<Button variant="secondary" data-autofocus disabled={pending} onClick={cancel}>{cancelLabel}</Button>}
      />
    </Modal>
  );
}
