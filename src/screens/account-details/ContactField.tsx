import { useState } from 'react';
import { Button, EditIcon, TextField } from '../../components';
import { SUPPORT_HINT } from './accountDetailsData';
import './account-details.css';

type ContactFieldProps = {
  label: string;
  value: string;
  /** Нажали на карандаш: дальше разработчики переводят пользователя в поддержку */
  onRequestChange?: () => void;
};

/** Поле, которое пользователь сам не меняет: значение только для чтения, справа карандаш (виден при наведении и фокусе).
 *  После нажатия под полем появляется подсказка про поддержку. */
export function ContactField({ label, value, onRequestChange }: ContactFieldProps) {
  const [requested, setRequested] = useState(false);

  const request = () => {
    setRequested(true);
    onRequestChange?.();
  };

  return (
    <TextField
      className="scr-editable"
      label={label}
      value={value}
      readOnly
      hint={requested ? SUPPORT_HINT : undefined}
      rightSlot={
        <Button variant="ghost" size="s" density="compact" iconOnly iconLeft={<EditIcon />} aria-label={`Edit ${label.toLowerCase()}`} onClick={request} />
      }
    />
  );
}
