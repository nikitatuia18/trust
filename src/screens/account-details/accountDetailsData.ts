/** Данные и контракт экрана Account details. Бэкенд присылает эти поля; редактирования на экране нет — менять телефон и Telegram можно только через поддержку. */

export type AccountDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  telegram: string;
};

/** Заглушка текста: подсказка под полями, которые меняются через поддержку. Формулировку утверждает владелец. */
export const SUPPORT_HINT = 'To change, contact support';

/** Тестовые данные из макета */
export const DEMO_DETAILS: AccountDetails = {
  firstName: 'Nikita',
  lastName: 'Vorobyov',
  phone: '+7 (950) 907-22-48',
  telegram: '@NIKITATULA',
};
