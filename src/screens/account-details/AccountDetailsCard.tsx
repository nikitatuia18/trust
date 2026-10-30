import { FormCard, TextField } from '../../components';
import { SUPPORT_HINT, type AccountDetails } from './accountDetailsData';

/** «Edit details»: имя и фамилия не меняются (disabled), телефон и Telegram видны, но меняются только через поддержку (readOnly + подсказка) */
export function AccountDetailsCard({ details }: { details: AccountDetails }) {
  return (
    <FormCard header={<h2 className="scr-card-title text-heading-h4">Edit details</h2>}>
      <TextField label="First name" value={details.firstName} disabled readOnly autoComplete="given-name" />
      <TextField label="Last name" value={details.lastName} disabled readOnly autoComplete="family-name" />
      <TextField label="Phone number" value={details.phone} readOnly hint={SUPPORT_HINT} autoComplete="tel" />
      <TextField label="Telegram" value={details.telegram} readOnly hint={SUPPORT_HINT} autoComplete="off" />
    </FormCard>
  );
}
