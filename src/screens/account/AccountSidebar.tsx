import { useState, type ReactNode } from 'react';
import { Button, FormCard, Icon, IconCircle, ListItem, LockIcon, LockOutlineIcon, LogoutIcon, NotificationBoldIcon, NotificationIcon, ProfileBoldIcon, ProfileFilledIcon, ProfileIcon, StarIcon, StarOutlineIcon, VerifyIcon } from '../../components';
import { ConfirmDialog } from './ConfirmDialog';
import { LOGOUT_TEXT, type AccountSection, type AccountUser } from './accountData';

/** У каждого раздела две иконки из «06 — Icons»: контур, пока пункт не выбран, и залитая, когда выбран */
const SECTIONS: { id: AccountSection; title: string; description: string; icon: ReactNode; iconSelected: ReactNode }[] = [
  { id: 'details', title: 'Account details', description: 'Personal info', icon: <ProfileIcon />, iconSelected: <ProfileBoldIcon /> },
  { id: 'security', title: 'Security', description: 'Password and 2FA', icon: <LockOutlineIcon />, iconSelected: <LockIcon /> },
  { id: 'notifications', title: 'Notifications', description: 'Alerts and preferences', icon: <NotificationIcon />, iconSelected: <NotificationBoldIcon /> },
  { id: 'affiliate', title: 'Affiliate program', description: 'Invite and earn', icon: <StarOutlineIcon />, iconSelected: <StarIcon /> },
];

type AccountSidebarProps = {
  user: AccountUser;
  section: AccountSection;
  onNavigate?: (section: AccountSection) => void;
  /** Пользователь подтвердил выход в окне. Промис: на время ответа окно заблокировано, успех закрывает его */
  onLogout?: () => void | Promise<void>;
};

/** Меню кабинета: карточка пользователя сверху, разделы списком, выход внизу (красной кнопкой, с подтверждением в окне) */
export function AccountSidebar({ user, section, onNavigate, onLogout }: AccountSidebarProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const confirmLogout = async () => {
    setPending(true);
    try {
      await onLogout?.();
      setConfirmOpen(false);
    } catch {
      // окно остаётся открытым: можно повторить или отменить
    } finally {
      setPending(false);
    }
  };

  return (
    <>
    <FormCard
      fluid
      className="scr-account__side"
      header={
        <div className="scr-profile">
          <div className="scr-profile__row">
            <span className="scr-profile__name text-label-lg">{user.name}</span>
            <span className="scr-profile__marks">
              {user.verified && <span className="scr-profile__verified" role="img" aria-label="Verified"><VerifyIcon /></span>}
              <span className="scr-profile__kind" aria-hidden="true"><ProfileFilledIcon /></span>
            </span>
          </div>
          <span className="scr-profile__email text-label-sm">{user.email}</span>
        </div>
      }
      primaryAction={<Button variant="destructive" iconLeft={<LogoutIcon />} onClick={() => setConfirmOpen(true)}>Log out</Button>}
    >
      <nav className="scr-menu" aria-label="Account sections">
        {SECTIONS.map((s) => {
          const selected = s.id === section;
          return (
            <ListItem
              key={s.id}
              variant="card"
              showDivider={false}
              selected={selected}
              leftSlot={<IconCircle tone={selected ? 'brand' : 'subtle'}>{selected ? s.iconSelected : s.icon}</IconCircle>}
              title={s.title}
              description={s.description}
              rightSlot={<span className="scr-menu__chevron"><Icon /></span>}
              onClick={() => onNavigate?.(s.id)}
            />
          );
        })}
      </nav>
    </FormCard>
    <ConfirmDialog
      open={confirmOpen}
      pending={pending}
      title={LOGOUT_TEXT.title}
      text={LOGOUT_TEXT.body}
      confirmLabel={LOGOUT_TEXT.confirm}
      confirmIcon={<LogoutIcon />}
      cancelLabel={LOGOUT_TEXT.cancel}
      onConfirm={confirmLogout}
      onCancel={() => setConfirmOpen(false)}
    />
    </>
  );
}
