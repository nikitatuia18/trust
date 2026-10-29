import { useState, type ReactNode } from 'react';
import { AppStoreMark, Button, Footer, GooglePlayMark, Header, LanguageSelector, SegmentedControl } from '../components';
import './screens.css';

/** Шапка сайта: логотип, режим Individual | Business, ссылки, язык и главная кнопка (Figma «Auth Page» → Header) */
export function SiteHeader() {
  const [mode, setMode] = useState('individual');
  const [lang, setLang] = useState('EN');
  return (
    <Header
      modeSwitch={
        <SegmentedControl
          aria-label="Режим"
          value={mode}
          onChange={setMode}
          options={[{ value: 'individual', label: 'Individual' }, { value: 'business', label: 'Business' }]}
        />
      }
      links={<><Button variant="ghost" size="s" density="compact">Resources</Button><Button variant="ghost" size="s" density="compact">Contacts</Button></>}
      actions={<><LanguageSelector value={lang} onChange={setLang} /><Button size="s">Talk to sales</Button></>}
    />
  );
}

/** Подвал сайта (Figma «Auth Page» → Footer) */
export function SiteFooter() {
  const links = (labels: string[]) => labels.map((label) => ({ label, href: '#' }));
  return (
    <Footer
      description="AllTrust.me is a Virtual Asset Service Provider registered with the National Bank of Georgia. We utilize Chainalysis for transaction monitoring to ensure full AML/KYC compliance."
      copyright="© 2026 AllTrust.me. All rights reserved."
      linkGroups={[
        links(['B2B products', 'Real Estate', 'Construction', 'Automotive', 'Import / Export', 'Luxury', 'Operations Funding']),
        links(['Individual', 'Resources', 'Contacts']),
      ]}
      actions={<><Button>Talk to sales</Button><Button variant="secondary">How conversion works</Button></>}
      appTitle="Need the app on the go?"
      appLinks={[
        { label: 'App Store', href: '#', icon: <AppStoreMark /> },
        { label: 'Google Play', href: '#', icon: <GooglePlayMark /> },
        { label: 'Direct APK', href: '#' },
      ]}
    />
  );
}

/** Каркас страницы: шапка, холст по центру, подвал */
export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="scr-page">
      <SiteHeader />
      <main className="scr-page__main">{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Центральный блок auth-страницы: заголовок, пояснение и карточка формы под ними */
export function AuthPage({ title, subtitle, children }: { title: ReactNode; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <div className="scr-auth">
      <div className="scr-auth__intro">
        <h1 className="scr-auth__title text-heading-h1">{title}</h1>
        {subtitle && <p className="scr-auth__subtitle text-body-md">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
