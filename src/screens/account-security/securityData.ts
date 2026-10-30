/** Контракт экрана Account / Security. Смена пароля, включение 2FA и блокировка аккаунта уходят наружу колбэками;
 *  сервер отвечает промисом (отказ = ошибка) и, при необходимости, текстом ошибки в passwordError. */

export type PasswordChange = {
  currentPassword: string;
  newPassword: string;
};

/** Символы подсказки из макета «A-Z, 1-9, #-&» */
const PASSWORD_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789#$%&-';

/** Тестовый генератор для «Generate password»: разработчики подставляют свой через onGeneratePassword */
export function generatePassword(length = 14): string {
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (v) => PASSWORD_ALPHABET[v % PASSWORD_ALPHABET.length]).join('');
}
