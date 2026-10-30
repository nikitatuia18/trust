/** Данные и контракт экрана Account / Notifications. Бэкенд присылает группы с текущим состоянием переключателей;
 *  изменение уходит наружу колбэком onChange (см. NotificationsSection). */

export type NotificationSetting = {
  id: string;
  label: string;
  enabled: boolean;
};

export type NotificationGroup = {
  id: string;
  title: string;
  settings: NotificationSetting[];
};

/** Тестовые данные из макета «1.4 Account / Notifications» */
export const DEMO_NOTIFICATIONS: NotificationGroup[] = [
  {
    id: 'security',
    title: 'Security',
    settings: [
      { id: 'password-changed', label: 'Password changed', enabled: true },
      { id: 'new-login', label: 'New login', enabled: false },
    ],
  },
  {
    id: 'transactions',
    title: 'Transactions',
    settings: [
      { id: 'exchange-completed', label: 'Exchange completed', enabled: true },
      { id: 'transaction-failed', label: 'Transaction failed', enabled: false },
    ],
  },
  {
    id: 'product-updates',
    title: 'Product updates',
    settings: [{ id: 'news-updates', label: 'News & updates', enabled: false }],
  },
];
