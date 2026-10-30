import type { ReactNode } from 'react';
import { Button, FormCard, Icon, IconCircle, ListItem, LockIcon, LockOutlineIcon, LogoutIcon, NotificationBoldIcon, NotificationIcon, ProfileBoldIcon, ProfileFilledIcon, ProfileIcon, StarIcon, StarOutlineIcon, VerifyIcon } from '../../components';
import type { AccountSection, AccountUser } from './accountData';

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
  onLogout?: () => void;
};

/** Меню кабинета: карточка пользователя сверху, разделы списком, выход внизу */
export function AccountSidebar({ user, section, onNavigate, onLogout }: AccountSidebarProps) {
  return (
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
      primaryAction={<Button variant="secondary" iconLeft={<LogoutIcon />} onClick={onLogout}>Log out</Button>}
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
  );
}
