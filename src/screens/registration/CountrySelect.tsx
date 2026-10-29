import { useEffect, useRef, useState } from 'react';
import { Icon, List, ListItem, TextField, TickCircleIcon } from '../../components';

type CountrySelectProps = {
  label: string;
  value: string;
  onChange: (country: string) => void;
  options: string[];
  placeholder?: string;
};

/** Выбор страны: поле TextField с шевроном и выпадающий List — по образцу Language Selector. Закрывается по выбору, Esc и клику снаружи. */
export function CountrySelect({ label, value, onChange, options, placeholder = 'Select country' }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={root} className="scr-select" data-open={open || undefined}>
      <TextField
        label={label}
        readOnly
        value={value}
        placeholder={placeholder}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        rightSlot={<Icon direction="down" />}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); }
        }}
      />
      {open && (
        <div className="scr-select__list">
          <List>
            {options.map((c) => (
              <ListItem
                key={c}
                size="small"
                variant="list"
                showDivider={false}
                selected={c === value}
                title={c}
                rightSlot={c === value ? <span className="scr-select__tick"><TickCircleIcon /></span> : undefined}
                onClick={() => { onChange(c); setOpen(false); }}
              />
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
