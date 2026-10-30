import { useState } from 'react';
import { Chip } from '../components';
import { AccountDetailsPage, AccountPage, REGISTRATION_STEPS, RegistrationFlow, type Details, type RegistrationStep } from '../screens';

const DOC = [
  {
    h: 'Из чего собрано',
    items: [
      'Каркас: Header + Footer + холст Surface/neutral/canvas, ширина контента Grid/max-width, боковые отступы Space/6xl.',
      '1 · Email: Form Card (header — Segmented Control, body — TextField, Button primary, Divider с подписью, Button secondary с иконкой).',
      '2 · Code: Form Card inline, четыре TextField в ряд, Button primary и secondary.',
      '3 · Details: Form Card inline, четыре поля (TextField и выбор страны), Checkbox, Button primary и secondary.',
    ],
  },
  {
    h: 'Чего в системе не хватило',
    items: [
      'Поле кода из 4 ячеек: собрано из четырёх TextField + логика фокуса и вставки (кандидат в компонент OTP Input).',
      'Выбор из списка: TextField с шевроном + List и ListItem по образцу Language Selector — во второй раз; кандидат в компонент Select.',
      'Ссылка внутри текста: пока локальный класс .scr-link (кандидат в компонент Link).',
      'Токен ширины окна-формы: появился Size/Form-card/width = 522 → --c-form-card-max-width (в Figma и в коде).',
    ],
  },
  {
    h: 'Допущения',
    items: [
      'В Figma для шагов 2 и 3 нарисованы только карточки: заголовки и подзаголовки над ними — мои.',
      'Тестовый режим: подходит любой код из 4 цифр; Continue на последнем шаге только сообщает, что данные собраны.',
      'Кнопка «Change Email» в Figma бледная, как disabled; здесь она активна — ведёт назад к e-mail.',
      'Список стран — тестовый; Google и Support service без действия.',
    ],
  },
];

const ACCOUNT_DOC = [
  {
    h: 'Из чего собрано',
    items: [
      'Каркас: системная шапка (Individual | Business, Resources, Contacts, язык) и подвал, Breadcrumbs, холст Surface/neutral/canvas.',
      'Меню: Form Card + List Item card с Icon Circle; выход — Button secondary.',
      'Earnings: Form Card, Stat Tile ×3, строка со ссылкой (Icon Circle, Chip, Button ghost), Button primary.',
      'Promotion tools: Form Card, Segmented Control m, Button secondary и Dropdown Menu.',
      'Earnings history: Form Card, Table и Badge (зелёный / оранжевый / красный); две карточки-подсказки.',
    ],
  },
  {
    h: 'Допущения',
    items: [
      'Макет Figma — только вид и логика; дизайн целиком из системы (радиусы, цвета, иконки).',
      'Вкладки Banners и Sales Scripts не нарисованы — пустые. QR — статичная картинка, будет заменена.',
      'Пункты меню «три точки» (Copy referral link, Share QR code) — заглушки.',
      'Иконка у Log out — заглушка из макета, нужна нормальная из Icons.',
    ],
  },
  {
    h: 'Чего в системе не хватило',
    items: [
      'Новые компоненты: Badge, Breadcrumbs, Stat Tile, Icon Circle, Table, Dropdown Menu; расширения Segmented Control size m и Form Card fluid.',
      'У новых компонентов нет component-токенов и компонентов в Figma — долг в PLAN.md.',
      'Ошибки этой сборки — docs/SCREEN-BUILD-ERRORS.md.',
    ],
  },
];

const DETAILS_DOC = [
  {
    h: 'Из чего собрано',
    items: [
      'Каркас и меню — те же, что у Affiliate program (общий AccountLayout): шапка, подвал, Breadcrumbs, Form Card с List Item.',
      'Edit details: Form Card (ширина окна-формы) и четыре Text Field. Имя и фамилия — disabled; телефон и Telegram — readOnly с подсказкой под полем.',
      'Новых компонентов и токенов не понадобилось.',
    ],
  },
  {
    h: 'Допущения',
    items: [
      'Менять данные на экране нельзя вовсе: телефон и Telegram — только через поддержку. Поэтому кнопки Save нет (решение владельца), экран ничего не отправляет.',
      'Текст подсказки «To change, contact support» — заглушка, формулировку утверждает владелец. Ссылки на поддержку в подсказке нет.',
      'Опечатки макета («detalis», «Login out») исправлены; аватара в шапке нет — шапка системная.',
    ],
  },
];

export function ScreensPage() {
  const [step, setStep] = useState<RegistrationStep>('email');
  const [done, setDone] = useState<Details | null>(null);

  return (
    <>
      <div className="sc-intro">
        <h1 className="text-heading-h1">Экраны</h1>
        <p className="text-body-lg sc-muted">
          Регистрация — три экрана, собранные из готовых компонентов и токенов, без нового CSS поверх. Это живой флоу: вводите e-mail,
          любой код из 4 цифр и данные. Переключать шаги можно и чипами. Отдельной страницей: <a className="sc-link" href="#/registration">#/registration</a>.
          Кабинет (Affiliate program) — <a className="sc-link" href="#/account">#/account</a>: меню, Earnings, Promotion tools, история начислений.
          Кабинет (Account details) — <a className="sc-link" href="#/account-details">#/account-details</a>: данные профиля, менять которые можно только через поддержку.
        </p>
      </div>

      <div className="sc-demo__row sc-screens__steps" role="group" aria-label="Шаг регистрации">
        {REGISTRATION_STEPS.map((s) => (
          <Chip key={s.id} selected={step === s.id} onClick={() => { setDone(null); setStep(s.id); }}>{s.label}</Chip>
        ))}
      </div>

      <div className="sc-screen-frame">
        <RegistrationFlow step={step} onStepChange={(s) => { setDone(null); setStep(s); }} onFinish={setDone} />
      </div>
      {done && (
        <p className="text-body-sm sc-muted sc-screens__status" role="status">
          Готово: данные собраны ({done.email}, {done.telegram}, {done.phone}, {done.country}). Отправки на сервер в тестовом экране нет.
        </p>
      )}

      <aside className="sc-card sc-doc sc-screens__doc">
        {DOC.map((b) => (
          <div key={b.h} className="sc-doc__block">
            <h4 className="text-label-sm">{b.h}</h4>
            <ul className="sc-doc__list text-body-xs sc-muted">
              {b.items.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </aside>

      <div className="sc-section">
        <h2 className="text-heading-h3">Кабинет — Affiliate program</h2>
        <p className="text-body-sm sc-muted">
          Тестовая сборка по макету «1.1 Account / Affiliate program». Данные демонстрационные. Отдельной страницей: <a className="sc-link" href="#/account">#/account</a>.
        </p>
      </div>
      <div className="sc-screen-frame">
        <AccountPage />
      </div>
      <aside className="sc-card sc-doc sc-screens__doc">
        {ACCOUNT_DOC.map((b) => (
          <div key={b.h} className="sc-doc__block">
            <h4 className="text-label-sm">{b.h}</h4>
            <ul className="sc-doc__list text-body-xs sc-muted">
              {b.items.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </aside>

      <div className="sc-section">
        <h2 className="text-heading-h3">Кабинет — Account details</h2>
        <p className="text-body-sm sc-muted">
          Тестовая сборка по макету «1.2 Account / Account detalis». Данные демонстрационные. Отдельной страницей: <a className="sc-link" href="#/account-details">#/account-details</a>.
        </p>
      </div>
      <div className="sc-screen-frame">
        <AccountDetailsPage />
      </div>
      <aside className="sc-card sc-doc sc-screens__doc">
        {DETAILS_DOC.map((b) => (
          <div key={b.h} className="sc-doc__block">
            <h4 className="text-label-sm">{b.h}</h4>
            <ul className="sc-doc__list text-body-xs sc-muted">
              {b.items.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </aside>
    </>
  );
}
