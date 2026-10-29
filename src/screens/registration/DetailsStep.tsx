import { useState, type FormEvent } from 'react';
import { Button, Checkbox, FormCard, TextField } from '../../components';
import { CountrySelect } from './CountrySelect';

export type Details = { email: string; telegram: string; phone: string; country: string };

type DetailsStepProps = {
  details: Details;
  onDetailsChange: (details: Details) => void;
  onContinue: () => void;
  onBack: () => void;
};

const COUNTRIES = ['Georgia', 'Armenia', 'Azerbaijan', 'Turkey', 'Kazakhstan', 'United Arab Emirates', 'Germany', 'United Kingdom'];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Шаг 3 — данные для регистрации (Figma 592:2191): e-mail, Telegram, телефон, страна, согласие. Continue доступен, когда всё заполнено. */
export function DetailsStep({ details, onDetailsChange, onContinue, onBack }: DetailsStepProps) {
  const [agreed, setAgreed] = useState(false);
  const set = (patch: Partial<Details>) => onDetailsChange({ ...details, ...patch });
  const valid = isEmail(details.email) && details.telegram.trim() !== '' && details.phone.trim() !== '' && details.country !== '' && agreed;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (valid) onContinue();
  };

  return (
    <form className="scr-form" onSubmit={submit} noValidate>
      <FormCard
        actions="inline"
        primaryAction={<Button type="submit" disabled={!valid}>Continue</Button>}
        secondaryAction={<Button variant="secondary" onClick={onBack}>Back</Button>}
      >
        <div className="scr-details">
          <div className="scr-details__fields">
            <TextField label="Email*" inputMode="email" autoComplete="email" value={details.email} onChange={(e) => set({ email: e.target.value })} />
            <TextField label="Telegram*" placeholder="@username" autoComplete="off" value={details.telegram} onChange={(e) => set({ telegram: e.target.value })} />
            <TextField label="Phone number*" inputMode="tel" autoComplete="tel" placeholder="Enter your phone number" value={details.phone} onChange={(e) => set({ phone: e.target.value })} />
            <CountrySelect label="Country of residence*" options={COUNTRIES} value={details.country} onChange={(country) => set({ country })} />
            <p className="scr-note text-body-sm">Please note! We do not send SMS or spam to your number.</p>
          </div>
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            label={
              <>
                <span className="scr-details__strong">I have not previously verified my account in AllTrust.me. </span>
                Only one account allowed! Any questions? <a className="scr-link" href="#support">Support service</a>
              </>
            }
          />
        </div>
      </FormCard>
    </form>
  );
}
