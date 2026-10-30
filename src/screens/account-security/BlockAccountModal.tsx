import { useId } from 'react';
import { Button, CloseIcon, FormCard, LockOutlineIcon, Modal, WindowHeader } from '../../components';
import { BLOCK_ACCOUNT_TEXT } from './securityData';
import './security.css';

type BlockAccountModalProps = {
  open: boolean;
  /** Идёт блокировка на сервере: кнопки недоступны, окно не закрывается */
  pending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Подтверждение блокировки аккаунта: окно поверх страницы (Modal) из Form Card и Window Header.
 *  Фокус при открытии — на «Cancel»: необратимое действие не должно сработать случайным Enter. */
export function BlockAccountModal({ open, pending, onConfirm, onCancel }: BlockAccountModalProps) {
  const titleId = useId();
  const close = () => { if (!pending) onCancel(); };
  return (
    <Modal open={open} onClose={close} aria-labelledby={titleId}>
      <FormCard
        actions="inline"
        header={
          <WindowHeader
            title={<span id={titleId}>{BLOCK_ACCOUNT_TEXT.title}</span>}
            rightAction={<Button size="s" variant="secondary" iconOnly iconLeft={<CloseIcon />} aria-label="Close" disabled={pending} onClick={close} />}
          />
        }
        primaryAction={<Button variant="destructive" iconLeft={<LockOutlineIcon />} disabled={pending} onClick={onConfirm}>{BLOCK_ACCOUNT_TEXT.confirm}</Button>}
        secondaryAction={<Button variant="secondary" data-autofocus disabled={pending} onClick={close}>{BLOCK_ACCOUNT_TEXT.cancel}</Button>}
      >
        <p className="scr-modal-text text-body-sm">{BLOCK_ACCOUNT_TEXT.body}</p>
      </FormCard>
    </Modal>
  );
}
