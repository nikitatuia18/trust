import { useState, type FormEvent } from 'react';
import { Button, FormCard, SegmentedControl, TextField } from '../../components';
import { GoogleMark } from '../marks';

type EmailStepProps = {
  email: string;
  onEmailChange: (email: string) => void;
  onContinue: () => void;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Шаг 1 — «Continue with Email» (Figma 528:4155): тип клиента, e-mail, Continue и вход через Google. */
export function EmailStep({ email, onEmailChange, onContinue }: EmailStepProps) {
  const [kind, setKind] = useState('individual');
  const valid = isEmail(email);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (valid) onContinue();
  };

  return (
    <form className="scr-form" onSubmit={submit} noValidate>
      <FormCard
        header={
          <SegmentedControl
            className="scr-segment-fill"
            aria-label="Account type"
            value={kind}
            onChange={setKind}
            options={[{ value: 'individual', label: 'Individual' }, { value: 'corporate', label: 'Corporate' }]}
          />
        }
        primaryAction={<Button type="submit" disabled={!valid}>Continue</Button>}
        dividerLabel="or"
        altActions={<Button variant="secondary" iconLeft={<GoogleMark />}>Continue with Google</Button>}
      >
        <TextField
          label="Email"
          type="text"
          inputMode="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          validation={email && !valid ? 'error' : 'none'}
          hint={email && !valid ? 'Enter a valid email' : undefined}
        />
      </FormCard>
    </form>
  );
}
