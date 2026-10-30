/** Контракт экрана Account / Security. Смена пароля, включение 2FA и блокировка аккаунта уходят наружу колбэками;
 *  сервер отвечает промисом (отказ = ошибка) и, при необходимости, текстом ошибки в passwordError. */

export type PasswordChange = {
  currentPassword: string;
  newPassword: string;
};

/** Тексты окна подтверждения блокировки. Предложены ассистентом, формулировки утверждает владелец. */
export const BLOCK_ACCOUNT_TEXT = {
  title: 'Block account?',
  body: "While your account is blocked, you won't be able to sign in or make exchanges. Are you sure you want to continue?",
  confirm: 'Block account',
  cancel: 'Cancel',
} as const;

/** Символы подсказки из макета «A-Z, 1-9, #-&» */
const PASSWORD_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789#$%&-';

/** Тестовый генератор для «Generate password»: разработчики подставляют свой через onGeneratePassword */
export function generatePassword(length = 14): string {
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (v) => PASSWORD_ALPHABET[v % PASSWORD_ALPHABET.length]).join('');
}
