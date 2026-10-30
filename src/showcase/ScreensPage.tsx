import { useState } from 'react';
import { Chip } from '../components';
import { AccountDetailsPage, AccountPage, NotificationsPage, SecurityPage, REGISTRATION_STEPS, RegistrationFlow, type Details, type RegistrationStep } from '../screens';

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
      'Edit details: Form Card (ширина окна-формы) и четыре Text Field. Имя и фамилия — disabled; телефон и Telegram — readOnly, справа Button ghost с иконкой-карандашом (edit-2 из Icons).',
      'Меню: фиксированная ширина по токену Size/Account-menu/width (388, как в макете), описания пунктов короткие, зазор иконка–текст Space/lg.',
      'Из нового: иконка EditIcon; слот TextField принимает Button; токен ширины меню.',
    ],
  },
  {
    h: 'Допущения',
    items: [
      'Менять данные на экране нельзя: телефон и Telegram — только через поддержку. Кнопки Save нет (решение владельца). Карандаш появляется при наведении или фокусе (на тач-экране виден всегда); после нажатия под полем появляется подсказка и вызывается onRequestChange. Переход в поддержку не сделан.',
      'Текст подсказки «To change, contact support» и сокращённые описания меню — заглушки, формулировки утверждает владелец. На телефоне описания меню скрыты.',
      'Зазор иконка–текст в меню 12px (Space/lg) задан локально: в List Item по умолчанию Space/xs — в Figma этот зазор нужно выровнять.',
      'Опечатки макета («detalis», «Login out») исправлены; аватара в шапке нет — шапка системная.',
    ],
  },
];

const SECURITY_DOC = [
  {
    h: 'Из чего собрано',
    items: [
      'Каркас и меню — те же, что у остальных разделов кабинета (общий AccountLayout, раздел переключается внутри AccountCabinet).',
      'Change password: Form Card fluid, три TextField type=password (глазок «показать / скрыть»), Button link с иконкой key («Generate password»). Кнопки Save пока нет (решение владельца): она появится при вводе, с анимацией — позже.',
      '2FA authentication: Form Card с одной Button primary. Account: Form Card с Button destructive (иконка lock); по нажатию — окно подтверждения: Modal (затемнение 32%, размытие 24) с Form Card и Window Header, «Cancel» в фокусе.',
      'Из нового: компонент Modal, TextField type=password с глазком, иконки KeyIcon, EyeIcon, EyeSlashIcon (из «06 — Icons»); Window Header теперь можно ставить шапкой в Form Card.',
    ],
  },
  {
    h: 'Допущения',
    items: [
      'Карточка «Change E-mail» из макета не собрана — по решению владельца e-mail меняется в Account details.',
      'При несовпадении паролей поле «Repeat» краснеет, текста ошибки нет — не придуман. Ошибку сервера показывает проп error под «Current password». Логика сохранения (onChangePassword, canSave) готова и ждёт кнопку.',
      '«Generate password» заполняет New и Repeat и показывает их открытым текстом; генератор тестовый, подставляется через onGeneratePassword.',
      'Опечатка макета «Anable» исправлена на «Enable». У 2FA нарисовано только состояние «выключено» — оставлено как есть. Иконка у «Block account» (lock) выбрана владельцем вместо заглушки из макета. Текст окна подтверждения («Block account?», «While your account is blocked…») предложен ассистентом, формулировки утверждает владелец.',
      'Правила пароля (длина, символы) не заданы: подсказка «A-Z, 1-9, #-&» — как в макете, проверок нет.',
    ],
  },
];

const NOTIFICATIONS_DOC = [
  {
    h: 'Из чего собрано',
    items: [
      'Каркас и меню — те же, что у остальных разделов кабинета (общий AccountLayout, раздел переключается внутри AccountCabinet).',
      'Три карточки-группы (Security, Transactions, Product updates): Form Card fluid, заголовок — h2 с классом heading-h4, в теле строки «подпись label-md — Switch».',
      'Новых компонентов и токенов нет.',
    ],
  },
  {
    h: 'Допущения',
    items: [
      'Переключатель сохраняется сразу, кнопки Save нет (в макете её нет). Колбэк onChange может вернуть промис: на время сохранения переключатель заблокирован, при отказе сервера возвращается назад. Сообщения об ошибке в макете нет — не придумано.',
      'Строка «подпись — Switch» собрана раскладкой экрана, отдельного компонента нет; подпись связана с переключателем через aria-labelledby, клик по самой подписи не переключает.',
      'В макете Switch нарисован двумя размерами (62×32 и 52×28) — взят системный 52×28.',
      'Описания пунктов меню в макете («Preferences and push alerts» и т. п.) длиннее принятых в системе — оставлены короткие заглушки.',
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
          Кабинет (Security) — <a className="sc-link" href="#/account-security">#/account-security</a>: смена пароля, 2FA, блокировка аккаунта.
          Кабинет (Notifications) — <a className="sc-link" href="#/account-notifications">#/account-notifications</a>: включение и выключение уведомлений по группам.
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

      <div className="sc-section">
        <h2 className="text-heading-h3">Кабинет — Security</h2>
        <p className="text-body-sm sc-muted">
          Тестовая сборка по макету «1.3 Account / Security». Данные демонстрационные. Отдельной страницей: <a className="sc-link" href="#/account-security">#/account-security</a>.
        </p>
      </div>
      <div className="sc-screen-frame">
        <SecurityPage />
      </div>
      <aside className="sc-card sc-doc sc-screens__doc">
        {SECURITY_DOC.map((b) => (
          <div key={b.h} className="sc-doc__block">
            <h4 className="text-label-sm">{b.h}</h4>
            <ul className="sc-doc__list text-body-xs sc-muted">
              {b.items.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </aside>

      <div className="sc-section">
        <h2 className="text-heading-h3">Кабинет — Notifications</h2>
        <p className="text-body-sm sc-muted">
          Тестовая сборка по макету «1.4 Account / Notifications». Данные демонстрационные. Отдельной страницей: <a className="sc-link" href="#/account-notifications">#/account-notifications</a>.
        </p>
      </div>
      <div className="sc-screen-frame">
        <NotificationsPage />
      </div>
      <aside className="sc-card sc-doc sc-screens__doc">
        {NOTIFICATIONS_DOC.map((b) => (
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
