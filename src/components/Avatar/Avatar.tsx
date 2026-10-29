import { cn } from '../cn';
import './Avatar.css';

export type AvatarProps = {
  /** Figma: photo — фото пользователя, кадрируется по кругу (cover) */
  src?: string;
  /** Описание фото; без него аватар декоративный */
  alt?: string;
  /** Нет фото — показываем инициалы из имени */
  name?: string;
  className?: string;
};

const initials = (name: string) =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');

/** Аватар пользователя (Figma 373:2094): круг 24 с фото. Фото — данные, не ассет системы. */
export function Avatar({ src, alt = '', name, className }: AvatarProps) {
  return (
    <span className={cn('at-avatar', className)} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      {src ? (
        <img className="at-avatar__photo" src={src} alt="" />
      ) : (
        name && <span className="at-avatar__initials text-caption-default" aria-hidden="true">{initials(name)}</span>
      )}
    </span>
  );
}
