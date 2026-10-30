import type { ReactNode } from 'react';
import { Button, Modal } from '../../components';

export type ConfirmDialogProps = {
  open: boolean;
  /** Идёт запрос на сервере: кнопки недоступны, окно не закрывается */
  pending?: boolean;
  /** Иллюстрация над заголовком (слот на будущее) */
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

/** Подтверждение необратимого действия (блокировка аккаунта, выход): компонент Modal с двумя кнопками — красной и «Cancel».
 *  Крестика нет: закрывает «Cancel», Esc или клик по затемнению. Фокус при открытии — на самом окне (без кольца у кнопки),
 *  поэтому случайный Enter ничего не подтверждает: кнопки получают фокус по Tab. */
export function ConfirmDialog({ open, pending = false, illustration, title, text, confirmLabel, confirmIcon, cancelLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const cancel = () => { if (!pending) onCancel(); };
  return (
    <Modal
      open={open}
      onClose={cancel}
      illustration={illustration}
      title={title}
      description={text}
      primaryAction={<Button variant="destructive" iconLeft={confirmIcon} disabled={pending} onClick={onConfirm}>{confirmLabel}</Button>}
      secondaryAction={<Button variant="secondary" disabled={pending} onClick={cancel}>{cancelLabel}</Button>}
    />
  );
}
