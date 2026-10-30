import { FormCard, TextField } from '../../components';
import type { AccountDetails, ChangeableField } from './accountDetailsData';
import { ContactField } from './ContactField';

type AccountDetailsCardProps = {
  details: AccountDetails;
  onRequestChange?: (field: ChangeableField) => void;
};

/** «Edit details»: имя и фамилия не меняются (disabled), телефон и Telegram меняются только через поддержку (карандаш → подсказка) */
export function AccountDetailsCard({ details, onRequestChange }: AccountDetailsCardProps) {
  return (
    <FormCard header={<h2 className="scr-card-title text-heading-h4">Edit details</h2>}>
      <TextField label="First name" value={details.firstName} disabled readOnly autoComplete="given-name" />
      <TextField label="Last name" value={details.lastName} disabled readOnly autoComplete="family-name" />
      <ContactField label="Phone number" value={details.phone} onRequestChange={() => onRequestChange?.('phone')} />
      <ContactField label="Telegram" value={details.telegram} onRequestChange={() => onRequestChange?.('telegram')} />
    </FormCard>
  );
}
