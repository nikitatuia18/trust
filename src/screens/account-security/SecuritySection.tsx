import { useState } from 'react';
import { Button, FormCard, LockOutlineIcon } from '../../components';
import { ConfirmDialog } from '../account/ConfirmDialog';
import { ChangePasswordCard, type ChangePasswordCardProps } from './ChangePasswordCard';
import { BLOCK_ACCOUNT_TEXT } from './securityData';
import './security.css';

export type SecuritySectionProps = ChangePasswordCardProps & {
  /** Нажали «Enable» у 2FA: дальше разработчики ведут пользователя на настройку */
  onEnableTwoFactor?: () => void;
  /** Пользователь подтвердил блокировку в окне. Промис: на время ответа окно заблокировано, успех закрывает его,
   *  отказ оставляет открытым (текста ошибки нет — не придуман) */
  onBlockAccount?: () => void | Promise<void>;
};

/** Содержимое раздела «Security» (Figma «1.3 Account / Security»): слева смена пароля, справа 2FA и блокировка аккаунта.
 *  Карточка «Change E-mail» из макета не собрана по решению владельца: e-mail меняется в Account details. */
export function SecuritySection({ onEnableTwoFactor, onBlockAccount, ...password }: SecuritySectionProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [blocking, setBlocking] = useState(false);

  const confirmBlock = async () => {
    setBlocking(true);
    try {
      await onBlockAccount?.();
      setConfirmOpen(false);
    } catch {
      // окно остаётся открытым: пользователь может повторить или отменить
    } finally {
      setBlocking(false);
    }
  };

  return (
    <div className="scr-account__row" data-row="top">
      <ChangePasswordCard {...password} />
      <div className="scr-security__side">
        <FormCard
          fluid
          header={<h2 className="at-form-card__title text-heading-h4">2FA authentication</h2>}
          primaryAction={<Button onClick={onEnableTwoFactor}>Enable</Button>}
        />
        <FormCard
          fluid
          header={<h2 className="at-form-card__title text-heading-h4">Account</h2>}
          primaryAction={<Button variant="destructive" iconLeft={<LockOutlineIcon />} onClick={() => setConfirmOpen(true)}>Block account</Button>}
        />
      </div>
      <ConfirmDialog
        open={confirmOpen}
        pending={blocking}
        title={BLOCK_ACCOUNT_TEXT.title}
        text={BLOCK_ACCOUNT_TEXT.body}
        confirmLabel={BLOCK_ACCOUNT_TEXT.confirm}
        confirmIcon={<LockOutlineIcon />}
        cancelLabel={BLOCK_ACCOUNT_TEXT.cancel}
        onConfirm={confirmBlock}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
