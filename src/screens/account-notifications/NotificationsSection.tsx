import { useState } from 'react';
import { NotificationGroupCard } from './NotificationGroupCard';
import { DEMO_NOTIFICATIONS, type NotificationGroup } from './notificationsData';

export type NotificationsSectionProps = {
  groups?: NotificationGroup[];
  /** Пользователь переключил уведомление. Если вернуть промис, переключатель на время блокируется,
   *  а при отказе (ошибка сервера) возвращается в прежнее положение. */
  onChange?: (id: string, enabled: boolean) => void | Promise<void>;
};

/** Содержимое раздела «Notifications» (Figma «1.4 Account / Notifications»): ряд карточек-групп справа от меню кабинета */
export function NotificationsSection({ groups = DEMO_NOTIFICATIONS, onChange }: NotificationsSectionProps) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.flatMap((g) => g.settings.map((s) => [s.id, s.enabled]))),
  );
  const [pending, setPending] = useState<ReadonlySet<string>>(new Set());

  const setPendingId = (id: string, on: boolean) =>
    setPending((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  const toggle = async (id: string, next: boolean) => {
    setEnabled((prev) => ({ ...prev, [id]: next }));
    setPendingId(id, true);
    try {
      await onChange?.(id, next);
    } catch {
      setEnabled((prev) => ({ ...prev, [id]: !next }));
    } finally {
      setPendingId(id, false);
    }
  };

  return (
    <div className="scr-account__row" data-row="triple">
      {groups.map((g) => (
        <NotificationGroupCard key={g.id} group={g} enabled={enabled} pending={pending} onToggle={toggle} />
      ))}
    </div>
  );
}
