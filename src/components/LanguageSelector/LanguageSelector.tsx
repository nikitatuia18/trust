import { useEffect, useRef, useState } from 'react';
import { cn } from '../cn';
import { Button } from '../Button/Button';
import { GlobeIcon, TickCircleIcon } from '../Icon/Glyphs';
import { List } from '../List/List';
import { ListItem } from '../ListItem/ListItem';
import flagUs from './flags/us.svg';
import flagRu from './flags/ru.svg';
import flagGe from './flags/ge.svg';
import './LanguageSelector.css';

export type Language = {
  /** Код в кнопке и подзаголовке строки, например EN */
  code: string;
  /** Название на своём языке */
  label: string;
  /** Флаг 32×32 (url картинки) */
  flag: string;
};

export const LANGUAGES: Language[] = [
  { code: 'EN', label: 'English', flag: flagUs },
  { code: 'RU', label: 'Русский', flag: flagRu },
  { code: 'GE', label: 'ქართული', flag: flagGe },
];

export type LanguageSelectorProps = {
  /** Код выбранного языка */
  value: string;
  onChange: (code: string) => void;
  languages?: Language[];
  /** Figma-ось State=active: список открыт. Если не передан — открывается по клику на кнопку */
  open?: boolean;
  className?: string;
};

/** Выбор языка (Figma 377:3689): кнопка с глобусом и кодом + выпадающий список. Закрывается по выбору, Esc и клику снаружи. */
export function LanguageSelector({ value, onChange, languages = LANGUAGES, open, className }: LanguageSelectorProps) {
  const [innerOpen, setInnerOpen] = useState(false);
  const isOpen = open ?? innerOpen;
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerOpen) return;
    const onDown = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setInnerOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setInnerOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [innerOpen]);

  return (
    <div ref={root} className={cn('at-language-selector', className)} data-state={isOpen ? 'active' : 'default'}>
      <Button
        variant="secondary" size="s" density="compact"
        iconLeft={<GlobeIcon />}
        aria-haspopup="listbox" aria-expanded={isOpen}
        onClick={() => setInnerOpen((o) => !o)}
      >
        {value}
      </Button>
      {isOpen && (
        <div className="at-language-selector__list">
          <List>
            {languages.map((l) => (
              <ListItem
                key={l.code}
                size="small" variant="list" showDivider={false}
                selected={l.code === value}
                leftSlot={<img className="at-language-selector__flag" src={l.flag} alt="" />}
                title={l.label} subtitle={l.code}
                rightSlot={l.code === value ? <span className="at-language-selector__tick"><TickCircleIcon /></span> : undefined}
                onClick={() => { onChange(l.code); setInnerOpen(false); }}
              />
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
