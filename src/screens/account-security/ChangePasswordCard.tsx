import { useState, type FormEvent } from 'react';
import { Button, FormCard, KeyIcon, TextField } from '../../components';
import { generatePassword, type PasswordChange } from './securityData';
import './security.css';

export type ChangePasswordCardProps = {
  /** Нажали Save. Промис: на время ответа форма заблокирована; успех очищает поля, отказ оставляет введённое */
  onChangePassword?: (change: PasswordChange) => void | Promise<void>;
  /** Текст ошибки от сервера (например, текущий пароль неверный): показывается под полем «Current password» */
  error?: string;
  /** Сгенерировать пароль для «Generate password» */
  onGeneratePassword?: () => string;
};

/** «Change password»: три поля и «Generate password». Кнопки Save пока нет (решение владельца): она появится, когда пользователь начнёт вводить,
 *  и выплывет с анимацией — это позже. Логика сохранения уже здесь: когда кнопка вернётся, она станет type="submit" и будет доступна при canSave
 *  (поля заполнены, новый пароль совпал с повтором). */
export function ChangePasswordCard({ onChangePassword, error, onGeneratePassword = generatePassword }: ChangePasswordCardProps) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [repeat, setRepeat] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [pending, setPending] = useState(false);

  const mismatch = repeat !== '' && next !== repeat;
  const canSave = current !== '' && next !== '' && repeat !== '' && !mismatch && !pending;

  const generate = () => {
    const password = onGeneratePassword();
    setNext(password);
    setRepeat(password);
    setRevealed(true);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    setPending(true);
    try {
      await onChangePassword?.({ currentPassword: current, newPassword: next });
      setCurrent('');
      setNext('');
      setRepeat('');
      setRevealed(false);
    } catch {
      // Ошибку показывает родитель через error; введённое остаётся, чтобы можно было поправить
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="scr-security__form" onSubmit={submit} noValidate>
      <FormCard
        fluid
        header={<h2 className="at-form-card__title text-heading-h4">Change password</h2>}
      >
        <TextField
          type="password"
          label="Current password"
          placeholder="Enter current password"
          autoComplete="current-password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          disabled={pending}
          validation={error ? 'error' : 'none'}
          hint={error}
        />
        <TextField
          type="password"
          label="New password"
          placeholder="A-Z, 1-9, #-&"
          autoComplete="new-password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          revealed={revealed}
          onRevealedChange={setRevealed}
          disabled={pending}
        />
        <TextField
          type="password"
          label="Repeat new password"
          placeholder="Repeat password"
          autoComplete="new-password"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          revealed={revealed}
          onRevealedChange={setRevealed}
          disabled={pending}
          validation={mismatch ? 'error' : 'none'}
        />
        <Button variant="link" iconLeft={<KeyIcon />} className="scr-security__generate" onClick={generate} disabled={pending}>Generate password</Button>
      </FormCard>
    </form>
  );
}
