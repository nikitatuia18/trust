import { useId } from 'react';
import { FormCard, Switch } from '../../components';
import type { NotificationGroup, NotificationSetting } from './notificationsData';
import './notifications.css';

type SettingRowProps = {
  setting: NotificationSetting;
  checked: boolean;
  pending: boolean;
  onToggle: (id: string, enabled: boolean) => void;
};

function SettingRow({ setting, checked, pending, onToggle }: SettingRowProps) {
  const labelId = useId();
  return (
    <div className="scr-setting">
      <span id={labelId} className="scr-setting__label text-label-md">{setting.label}</span>
      <Switch aria-labelledby={labelId} checked={checked} disabled={pending} onChange={(e) => onToggle(setting.id, e.target.checked)} />
    </div>
  );
}

type NotificationGroupCardProps = {
  group: NotificationGroup;
  /** Текущее состояние переключателей по id настройки */
  enabled: Record<string, boolean>;
  /** id настроек, которые сейчас сохраняются на сервере */
  pending: ReadonlySet<string>;
  onToggle: (id: string, enabled: boolean) => void;
};

/** Одна группа уведомлений: заголовок и строки «подпись — переключатель» */
export function NotificationGroupCard({ group, enabled, pending, onToggle }: NotificationGroupCardProps) {
  return (
    <FormCard fluid header={<h2 className="at-form-card__title text-heading-h4">{group.title}</h2>}>
      {group.settings.map((s) => (
        <SettingRow key={s.id} setting={s} checked={enabled[s.id] ?? s.enabled} pending={pending.has(s.id)} onToggle={onToggle} />
      ))}
    </FormCard>
  );
}
