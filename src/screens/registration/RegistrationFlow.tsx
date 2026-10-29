import { useCallback, useEffect, useState } from 'react';
import { AuthPage, PageLayout } from '../SiteShell';
import { CodeStep } from './CodeStep';
import { DetailsStep, type Details } from './DetailsStep';
import { EmailStep } from './EmailStep';
import './registration.css';

export type RegistrationStep = 'email' | 'code' | 'details';

export const REGISTRATION_STEPS: { id: RegistrationStep; label: string }[] = [
  { id: 'email', label: '1 · Email' },
  { id: 'code', label: '2 · Code' },
  { id: 'details', label: '3 · Details' },
];

type RegistrationFlowProps = {
  /** Управляемый шаг (витрина переключает его чипами). Без него флоу ведёт шаг сам */
  step?: RegistrationStep;
  onStepChange?: (step: RegistrationStep) => void;
  /** Последний шаг пройден */
  onFinish?: (details: Details) => void;
};

/** Регистрация: три экрана на общем каркасе страницы. Данные хранятся здесь, шаги — только отображение и валидация своего экрана. */
export function RegistrationFlow({ step: controlled, onStepChange, onFinish }: RegistrationFlowProps) {
  const [inner, setInner] = useState<RegistrationStep>('email');
  const step = controlled ?? inner;
  const go = useCallback((s: RegistrationStep) => { setInner(s); onStepChange?.(s); }, [onStepChange]);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [details, setDetails] = useState<Details>({ email: '', telegram: '', phone: '', country: '' });

  const toCode = () => { setCode(''); go('code'); };
  const toDetails = useCallback(() => go('details'), [go]);

  // На шаг с данными e-mail приходит из первого шага — как бы мы сюда ни попали (в том числе чипами витрины)
  useEffect(() => {
    if (step === 'details') setDetails((d) => (d.email || !email ? d : { ...d, email }));
  }, [step, email]);

  return (
    <PageLayout>
      {step === 'email' && (
        <AuthPage title="Continue with Email" subtitle="Enter your email and we'll automatically sign you in or create an account.">
          <EmailStep email={email} onEmailChange={setEmail} onContinue={toCode} />
        </AuthPage>
      )}
      {step === 'code' && (
        <AuthPage title="Check your email" subtitle={`We sent a 4-digit code to ${email || 'your email'}.`}>
          <CodeStep email={email || 'your email'} code={code} onCodeChange={setCode} onVerified={toDetails} onChangeEmail={() => go('email')} />
        </AuthPage>
      )}
      {step === 'details' && (
        <AuthPage title="Tell us about yourself" subtitle="We need a few details to finish creating your account.">
          <DetailsStep details={details} onDetailsChange={setDetails} onContinue={() => onFinish?.(details)} onBack={() => go('code')} />
        </AuthPage>
      )}
    </PageLayout>
  );
}
