import { useState } from 'react';
import { Button, Divider, List, SegmentedControl, LanguageSelector, Logo, AppStoreMark, BankOutlineIcon, BriefcaseIcon, BuildingsIcon, CarIcon, CoinIcon, Footer, GlobeSearchIcon, GooglePlayMark, Header, RulerPenIcon } from '../../components';
import { Doc, Preview } from './doc-kit';

/** Группа страницы «Компоненты». order — позиция, title/note — заголовок группы. */
export const meta = { order: 80, title: "Шапка и подвал", note: "Каркас страницы сайта: навигация сверху, ссылки и действия снизу." };

export default function ShellDemo() {
  const [mode, setMode] = useState('individual');
  const [lang, setLang] = useState('EN');
  const [open, setOpen] = useState(true);
  const menu = [
    [
      { icon: <BriefcaseIcon />, title: 'B2B products', description: 'About the Products' },
      { icon: <BuildingsIcon />, title: 'Real Estate', description: 'Convert crypto property payments into fiat' },
      { icon: <RulerPenIcon />, title: 'Construction', description: 'Turn crypto milestones into operating capital' },
      { icon: <CarIcon />, title: 'Automotive', description: 'Receive fiat from vehicle crypto sales' },
    ],
    [
      { icon: <GlobeSearchIcon />, title: 'Import / Export', description: 'Settle cross-border trade in fiat' },
      { icon: <CoinIcon />, title: 'Luxury', description: 'Convert high-value crypto transactions cleanly' },
      { icon: <BankOutlineIcon />, title: 'Operations Funding', description: 'Fund your business without SWIFT delays' },
    ],
  ];
  return (
    <>
      <Preview title="Header (Header Bar + Mega Menu)" note="Content: default | mega-menu — панель накрывает страницу, закрывается по Esc и клику вне шапки">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row sc-demo__row--stack" style={{ width: '100%' }}>
            <span className="sc-demo__tag text-caption-default sc-muted">default</span>
            <Header
              modeSwitch={<SegmentedControl aria-label="Режим" value={mode} onChange={setMode} options={[{ value: 'individual', label: 'Individual' }, { value: 'business', label: 'Business' }]} />}
              links={<><Button variant="ghost" size="s" density="compact">Resources</Button><Button variant="ghost" size="s" density="compact">Contacts</Button></>}
              actions={<><LanguageSelector value={lang} onChange={setLang} /><Button size="s">Talk to sales</Button></>}
            />
          </div>
          <div className="sc-demo__row sc-demo__row--stack sc-menu-room" style={{ width: '100%' }}>
            <span className="sc-demo__tag text-caption-default sc-muted">mega-menu</span>
            <Header
              menu={menu} open={open} onClose={() => setOpen(false)}
              modeSwitch={<SegmentedControl aria-label="Режим" value={mode} onChange={setMode} options={[{ value: 'individual', label: 'Individual' }, { value: 'business', label: 'Business' }]} />}
              links={<><Button variant="ghost" size="s" density="compact">Resources</Button><Button variant="ghost" size="s" density="compact">Contacts</Button></>}
              actions={<><LanguageSelector value={lang} onChange={setLang} /><Button size="s">Talk to sales</Button></>}
            />
            {!open && <Button variant="secondary" size="s" onClick={() => setOpen(true)}>Открыть mega-menu</Button>}
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Header — верх каждой страницы сайта; Header Bar — сама полоса (логотип, навигация, кнопки).',
          'Mega Menu — список услуг под полосой: раскрывается из пункта навигации.',
        ]}
        spacing={[
          'Полоса: --c-header-main-padding-x|y (48 | 16), обводка снизу --c-header-main-stroke и -border.',
          'Зазоры: контент --c-header-content-gap, логотип и меню --c-header-navigation-gap, Segmented и ссылки --c-header-navigation-menu-gap, кнопки --c-header-buttons-gap.',
          'Содержимое ограничено Grid/max-width и центрируется; Mega Menu — padding Space/xl, столбцы List + List Item.',
        ]}
        why={[
          'Header Bar — слоты (logo, modeSwitch, links, actions): шапка собирается из Logo, Segmented Control, Button и Language Selector без отдельных копий.',
          'Уже 1024 (планшет по вертикали и телефон) в полосе остаются логотип и бургер (Button ghost S icon-only, иконка menu из «06 — Icons», aria-expanded): режим, ссылки и кнопки прячутся в панель под полосой. Ничего не слетает вниз сама по себе; закрытие по Esc.',
          'Mega Menu абсолютна и не сдвигает страницу; открытием управляет страница (open), закрытие по Esc и клику вне — внутри Header.',
          'Иконка в пункте — круг как у Button secondary S icon-only, но не кнопка: вся строка уже кнопка, вложенных кнопок нет.',
          'Ширина столбца Mega Menu 298 (282 + padding списка) — токена нет, задана локально в CSS осознанно. Ниже 767px столбцы встают друг под друга.',
          'Второй столбец — Import / Export, как в подвале (в старом макете Figma там по ошибке стоял второй Luxury; верна версия в коде).',
        ]}
      />
      <Preview title="Footer" note="Ширина подвала меньше 1280 — кнопки и приложения уходят под бренд и ссылки; ниже 767px всё столбиком">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row sc-demo__row--stack" style={{ width: '100%' }}>
            <Footer
              description="AllTrust.me is a Virtual Asset Service Provider registered with the National Bank of Georgia. We utilize Chainalysis for transaction monitoring to ensure full AML/KYC compliance."
              copyright="© 2026 AllTrust.me. All rights reserved."
              linkGroups={[
                ['B2B products', 'Real Estate', 'Construction', 'Automotive', 'Import / Export', 'Luxury', 'Operations Funding'].map((label) => ({ label, href: '#' })),
                ['Individual', 'Resources', 'Contacts'].map((label) => ({ label, href: '#' })),
              ]}
              actions={<><Button>Talk to sales</Button><Button variant="secondary">How conversion works</Button></>}
              appTitle="Need the app on the go?"
              appLinks={[
                { label: 'App Store', href: '#', icon: <AppStoreMark /> },
                { label: 'Google Play', href: '#', icon: <GooglePlayMark /> },
                { label: 'Direct APK', href: '#' },
              ]}
            />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Подвал каждой страницы сайта: бренд и юридическая справка, навигация, главные действия, ссылки на приложение.',
        ]}
        spacing={[
          'Отступы: сверху Space/5xl, снизу Space/3xl, по бокам Space/6xl; контент ограничен Grid/max-width.',
          'Зазоры: блоки Space/5xl, бренд и ссылки Space/9xl, столбцы Space/7xl, ссылки в столбце Space/xl.',
          'Цвета: фон --c-footer-bg, ссылки --c-footer-link (hover --c-footer-link-hover), разделитель из Divider.',
        ]}
        why={[
          'Контент — данные (props): тексты, ссылки и кнопки подставляются, структура неизменна.',
          'Кнопки действий — обычные Button M, растянутые на ширину блока.',
          'Знаки App Store и Google Play — бренд-арт вне токенов (исключение владельца); Google Play собран из четырёх кусков, как в Figma.',
          'Ширина контента шапки и подвала одна и та же — Grid/max-width, и боковой отступ один (Space/6xl); так их края совпадают на любом экране.',
        ]}
      />
    </>
  );
}
