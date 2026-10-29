import { useEffect, useState } from 'react';
import { Button, FormCard } from '../../components';
import { OtpInput } from './OtpInput';

type CodeStepProps = {
  email: string;
  code: string;
  onCodeChange: (code: string) => void;
  onVerified: () => void;
  onChangeEmail: () => void;
};

const CODE_LENGTH = 4;

/** Шаг 2 — код из письма (Figma 592:2164): четыре ячейки, «Change Email» и «Can't get code?». Тестовый режим: подходит любой код. */
export function CodeStep({ email, code, onCodeChange, onVerified, onChangeEmail }: CodeStepProps) {
  const [resent, setResent] = useState(false);

  // Когда все цифры введены — идём дальше (небольшая пауза, чтобы последняя цифра успела показаться)
  useEffect(() => {
    if (code.length !== CODE_LENGTH) return;
    const t = window.setTimeout(onVerified, 300);
    return () => window.clearTimeout(t);
  }, [code, onVerified]);

  return (
    <div className="scr-form">
      <FormCard
        actions="inline"
        primaryAction={<Button onClick={onChangeEmail}>Change Email</Button>}
        secondaryAction={<Button variant="secondary" onClick={() => setResent(true)}>Can&apos;t get code?</Button>}
      >
        <OtpInput value={code} onChange={onCodeChange} length={CODE_LENGTH} />
        {resent && <p className="scr-note text-body-xs" role="status">We sent a new code to {email}.</p>}
      </FormCard>
    </div>
  );
}
