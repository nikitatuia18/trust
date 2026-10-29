/** Данные и контракт экрана Account (Affiliate program). Бэкенд присылает эти поля; формат вывода — в форматтерах ниже. */

export type AccountSection = 'details' | 'security' | 'notifications' | 'affiliate';

export type AccountUser = {
  name: string;
  email: string;
  verified: boolean;
};

export type EarningStatus = 'received' | 'pending' | 'failed';

export type ReferralEarning = {
  id: string;
  /** E-mail приглашённого */
  user: string;
  /** Локальные дата и время без пояса: 2026-08-17T13:15:00 */
  date: string;
  /** Комиссия в USDT */
  commission: number;
  /** received — зелёный, pending — оранжевый, failed — красный */
  status: EarningStatus;
};

export type AffiliateData = {
  totalEarnings: number;
  availableToWithdraw: number;
  referralCount: number;
  referralLink: string;
  /** Минимальная сумма вывода, USDT */
  minWithdrawal: number;
  /** Доля прибыли с обмена приглашённого, % */
  commissionPercent: number;
  history: ReferralEarning[];
};

const pad = (n: number) => String(n).padStart(2, '0');

/** «0 USDT», «12 USDT» */
export const formatUsdt = (amount: number) => `${amount} USDT`;

/** «+12 USDT» */
export const formatCommission = (amount: number) => `+${formatUsdt(amount)}`;

/** «17.08.2026 13:15» */
export function formatDateTime(iso: string) {
  const d = new Date(iso);
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** «1 referral», «3 referrals» */
export const formatReferrals = (count: number) => `${count} referral${count === 1 ? '' : 's'}`;

/** Тестовые данные из макета */
export const DEMO_USER: AccountUser = { name: 'Nikita Mikhailovich', email: 'nikitatuia18@gmail.com', verified: true };

export const DEMO_AFFILIATE: AffiliateData = {
  totalEarnings: 0,
  availableToWithdraw: 0,
  referralCount: 1,
  referralLink: 'https://alltrust.me/en/ref/T31',
  minWithdrawal: 10,
  commissionPercent: 15,
  history: [
    { id: '1', user: 'nikitatuia18@gmail.com', date: '2026-08-17T13:15:00', commission: 12, status: 'received' },
    { id: '2', user: 'nikitatuia18@gmail.com', date: '2026-08-16T18:42:00', commission: 12, status: 'pending' },
    { id: '3', user: 'nikitatuia18@gmail.com', date: '2026-08-14T11:03:00', commission: 12, status: 'failed' },
  ],
};
