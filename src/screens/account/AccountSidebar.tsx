import type { ReactNode } from 'react';
import { ArrowCircleLeftIcon, Button, FormCard, Icon, IconCircle, ListItem, LockOutlineIcon, NotificationIcon, ProfileFilledIcon, ProfileIcon, StarIcon, VerifyIcon } from '../../components';
import type { AccountSection, AccountUser } from './accountData';

const SECTIONS: { id: AccountSection; title: string; description: string; icon: ReactNode }[] = [
  { id: 'details', title: 'Account details', description: 'Personal info and email settings', icon: <ProfileIcon /> },
  { id: 'security', title: 'Security', description: 'Password, 2FA and active sessions', icon: <LockOutlineIcon /> },
  { id: 'notifications', title: 'Notifications', description: 'Preferences and push alerts', icon: <NotificationIcon /> },
  { id: 'affiliate', title: 'Affiliate program', description: 'Invite friends and earn rewards', icon: <StarIcon /> },
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
      primaryAction={<Button variant="secondary" iconLeft={<ArrowCircleLeftIcon />} onClick={onLogout}>Log out</Button>}
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
              leftSlot={<IconCircle tone={selected ? 'brand' : 'subtle'}>{s.icon}</IconCircle>}
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
