import { Button, FormCard, LockOutlineIcon } from '../../components';
import { ChangePasswordCard, type ChangePasswordCardProps } from './ChangePasswordCard';
import './security.css';

export type SecuritySectionProps = ChangePasswordCardProps & {
  /** Нажали «Enable» у 2FA: дальше разработчики ведут пользователя на настройку */
  onEnableTwoFactor?: () => void;
  /** Нажали «Block account». Подтверждения в макете нет — если оно нужно, добавляют разработчики */
  onBlockAccount?: () => void;
};

/** Содержимое раздела «Security» (Figma «1.3 Account / Security»): слева смена пароля, справа 2FA и блокировка аккаунта.
 *  Карточка «Change E-mail» из макета не собрана по решению владельца: e-mail меняется в Account details. */
export function SecuritySection({ onEnableTwoFactor, onBlockAccount, ...password }: SecuritySectionProps) {
  return (
    <div className="scr-account__row" data-row="top">
      <ChangePasswordCard {...password} />
      <div className="scr-security__side">
        <FormCard
          fluid
          header={<h2 className="scr-card-title text-heading-h4">2FA authentication</h2>}
          primaryAction={<Button onClick={onEnableTwoFactor}>Enable</Button>}
        />
        <FormCard
          fluid
          header={<h2 className="scr-card-title text-heading-h4">Account</h2>}
          primaryAction={<Button variant="destructive" iconLeft={<LockOutlineIcon />} onClick={onBlockAccount}>Block account</Button>}
        />
      </div>
    </div>
  );
}
