import { useState, type ReactNode } from 'react';
import {
  AmountField, Button, Checkbox, Chip, Divider, FormCard, List, ListItem, OrderSummary, OrderSummaryNested,
  Icon, PlusIcon, CloseIcon, SearchIcon, DotIcon, SegmentedControl, StepIndicator, TextContainer, TextField, WindowHeader, type ButtonVariant,
  BankLogo, CurrencyIcon, LogoWithBadge, MethodIcon, NetworkLogo, StatusIcon,
  Avatar, EmbedPlaceholder, LanguageSelector, Logo, Spinner, Switch,
  Badge, Breadcrumbs, StatTile, IconCircle, Table, WalletIcon, UsersIcon, LinkIcon, StarIcon, ProfileIcon,
  AppStoreMark, BankOutlineIcon, BriefcaseIcon, BuildingsIcon, CarIcon, CoinIcon, Footer, GlobeSearchIcon, GooglePlayMark, Header, RulerPenIcon,
} from '../components';

type DocProps = { where: string[]; spacing: string[]; why: string[] };

function Preview({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="sc-card sc-card--demo">
      <header className="sc-card__head">
        <h3 className="text-label-lg">{title}</h3>
        {note && <p className="text-body-xs sc-muted">{note}</p>}
      </header>
      {children}
    </section>
  );
}

function Doc({ where, spacing, why }: DocProps) {
  const block = (h: string, items: string[]) => (
    <div className="sc-doc__block">
      <h4 className="text-label-sm">{h}</h4>
      <ul className="sc-doc__list text-body-xs sc-muted">
        {items.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </div>
  );
  return (
    <aside className="sc-card sc-doc">
      {block('Где используется', where)}
      {block('Отступы (токены)', spacing)}
      {block('Почему так', why)}
    </aside>
  );
}

function Group({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <>
      <div className="sc-section">
        <h2 className="text-heading-h3">{title}</h2>
        <p className="text-body-sm sc-muted">{note}</p>
      </div>
      <div className="sc-bento sc-bento--paired">{children}</div>
    </>
  );
}

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'link'];

function ButtonDemo() {
  return (
    <>
      <Preview title="Button" note="Style × Size × Density; состояния — hover / active / focus / disabled">
        <div className="sc-demo sc-demo--col">
          {VARIANTS.map((v) => (
            <div key={v} className="sc-demo__row sc-demo__row--stack">
              <span className="sc-demo__tag text-caption-default sc-muted">{v}</span>
              <Button variant={v}>Continue</Button>
              <Button variant={v} iconLeft={<Icon direction="left" />}>Back</Button>
              <Button variant={v} iconRight={<Icon />}>Next</Button>
              <Button variant={v} iconOnly iconLeft={<PlusIcon />} aria-label="Add" />
              <Button variant={v} disabled>Disabled</Button>
            </div>
          ))}
          <div className="sc-demo__row sc-demo__row--stack">
            <span className="sc-demo__tag text-caption-default sc-muted">size s</span>
            <Button size="s">Small</Button>
            <Button size="s" variant="secondary" density="compact">Compact</Button>
            <Button size="s" variant="secondary" iconOnly iconLeft={<PlusIcon />} aria-label="Add" />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Главное действие шага флоу (primary), «Назад» (secondary/ghost), необратимое (destructive).',
          'Селекторы и фильтры — тот же Button в compact (отдельного Select Trigger нет).',
          'Кнопки «−/+» внутри TextField-stepper.',
        ]}
        spacing={[
          'M/S: --c-button-m|s-padding-y и padding-x, gap, icon-size.',
          'Compact: --c-button-*-padding-x-compact.',
          'Icon-only: --c-button-*-icon-padding-x/y.',
          'Внутри подписи: text-container padding-x + gap корня.',
        ]}
        why={[
          'Pill (Radius/round): контролы системы единообразны, контейнеры — по своим радиусам.',
          'Один компонент вместо Select Trigger / Dropdown trigger — reuse-first.',
          'Disabled через opacity-токен, а не отдельные цвета: меньше токенов, одинаково для всех стилей.',
          'Tertiary и Checkbox в Figma без focus — в коде добавлено кольцо (доступность), записано в «Открыто».',
        ]}
      />
    </>
  );
}

function InputDemo() {
  const [qty, setQty] = useState('1');
  return (
    <>
      <Preview title="TextField" note="Type: text | stepper · Validation: none | error | success">
        <div className="sc-demo sc-demo--grid">
          <TextField label="Full name" description="As in your passport" placeholder="Jane Doe" hint="Latin letters only" />
          <TextField label="Email" validation="error" defaultValue="jane@" hint="Enter a valid email" />
          <TextField label="Promo code" validation="success" defaultValue="TRUST10" hint="Code applied" />
          <TextField label="Disabled" disabled placeholder="Not available" />
          <TextField
            type="stepper"
            label="Quantity"
            min={1}
            max={10}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <TextField label="With slots" placeholder="Search" leftSlot={<SearchIcon />} rightSlot={<CloseIcon />} />
        </div>
      </Preview>
      <Doc
        where={[
          'Поля анкеты верификации (имя, e-mail, адрес), поиск.',
          'Stepper — числовые значения с шагом (количество, сумма шагами).',
        ]}
        spacing={[
          'Оболочка: Space/sm по вертикали, Space/xl по горизонтали (stepper — Space/sm).',
          'Высота поля: Size/lg (min-height), padding-x --c-input-field-padding-x.',
          'Корень: gap --c-input-gap между label, description, полем и hint.',
        ]}
        why={[
          'Отступы атомов — напрямую Space/*, Size/* (решение владельца); цвета и радиусы — компонентные токены.',
          'Граница поля на белом слабая (контраст ≈1.14) — осознанно, форма читается по заливке и фокусу.',
          'Подсказка (placeholder) — --c-input-placeholder → Content/tertiary (Gray/400), светлее введённого текста (Content/primary): пустое поле не похоже на заполненное. Контраст ≈3.7 — осознанно слабее нормы, как у остальных tertiary.',
          'Состояния error/success — меняют границу и фокус-кольцо одним переключателем data-validation.',
          'Stepper = Button secondary s icon-only: нет отдельного компонента для кнопок.',
        ]}
      />
      <Preview title="Amount Field" note="State: default | focus | error — фокус определяется вводом">
        <div className="sc-demo sc-demo--grid">
          <AmountField
            label="You send"
            defaultValue="100.00"
            selector={<Button variant="secondary" size="s" density="compact" iconRight={<Icon direction="down" />}>USD</Button>}
            hint="Min 10 USD"
          />
          <AmountField
            label="You get"
            error
            defaultValue="0"
            selector={<Button variant="secondary" size="s" density="compact" iconRight={<Icon direction="down" />}>EUR</Button>}
            hint="Amount is below the minimum"
          />
        </div>
      </Preview>
      <Doc
        where={[
          'Ввод суммы в обмене/платеже: «отдаёте» и «получаете».',
          'Селектор валюты и подсказка мин. суммы — слоты.',
        ]}
        spacing={[
          'Контейнер: --c-amount-field-padding, gap --c-amount-field-gap.',
          'Радиус: --c-amount-field-radius (контейнер, не pill).',
          'Значение — text-heading-h2, выравнивание вправо.',
        ]}
        why={[
          'Селектор = экспонированный Button (compact), а не Select Trigger — reuse-first.',
          'Min-chip = Chip s neutral, подставляется в нижний слот.',
          'Hover в Figma не заведён — в коде тоже нет.',
        ]}
      />
      <ControlsDemo />
    </>
  );
}

function ControlsDemo() {
  const [tab, setTab] = useState<'card' | 'bank' | 'crypto'>('card');
  const [agree, setAgree] = useState(true);
  return (
    <>
      <Preview title="Segmented Control" note="Сегменты — Segment Item; один размер, как в Figma">
        <div className="sc-demo sc-demo--col">
          <SegmentedControl
            aria-label="Payment method"
            value={tab}
            onChange={setTab}
            options={[
              { value: 'card', label: 'Card' },
              { value: 'bank', label: 'Bank' },
              { value: 'crypto', label: 'Crypto' },
            ]}
          />
        </div>
      </Preview>
      <Doc
        where={[
          'Переключение режима в рамках одного экрана: способ оплаты, период, вид.',
          'Не навигация между страницами.',
        ]}
        spacing={[
          'Контейнер: --c-segment-control-padding-x/y, gap --c-segment-control-gap.',
          'Сегмент: --c-segment-item-s-padding-x/y, gap, radius.',
        ]}
        why={[
          'Pill: контролы выбора одной формы с Button и Chip.',
          'Выбранный сегмент отличается заливкой + границей + цветом текста, не только цветом.',
          'role=tablist, стрелки переключают сегмент.',
        ]}
      />
      <Preview title="Checkbox" note="Только круглый · Checked × State (default / hover / disabled)">
        <div className="sc-demo sc-demo--col">
          <Checkbox label="I agree to the terms" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <Checkbox label="Unchecked" />
          <Checkbox label="Disabled checked" disabled defaultChecked />
          <Checkbox label="Disabled" disabled />
        </div>
      </Preview>
      <Doc
        where={[
          'Согласие с условиями, опции анкеты верификации (1.8.x), подтверждения.',
          'Круглый индикатор выбора в списках анкеты.',
        ]}
        spacing={[
          'Бокс 20×20 (--c-checkbox-size ← Size/Indicator/box), галочка 16×16 (--c-checkbox-tick-size ← Size/Indicator/mark); на Mobile не сжимаются.',
          'Отступ до подписи — Space/sm.',
          'Граница и радиус: --c-checkbox-stroke, --c-checkbox-radius-round.',
        ]}
        why={[
          'Только круглый (решение владельца 2026-10-23): квадратных вариантов нет, ось Shape удалена.',
          'Круглый индикатор — это Checkbox, а не иконка и не часть List Item.',
          'Нативный input спрятан, но остаётся в DOM: клавиатура и скринридеры работают штатно.',
        ]}
      />
    </>
  );
}

function ContentDemo() {
  const [chip, setChip] = useState<string[]>(['eur']);
  const [row, setRow] = useState('a');
  const toggle = (id: string) => setChip((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const dot = <DotIcon />;
  return (
    <>
      <Preview title="Chip" note="Style: brand | neutral · Size: s | l · Selected · with-slots">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">brand s</span>
            {['usd', 'eur', 'gbp'].map((id) => (
              <Chip key={id} selected={chip.includes(id)} onClick={() => toggle(id)}>{id.toUpperCase()}</Chip>
            ))}
            <Chip disabled>Disabled</Chip>
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">neutral s</span>
            <Chip variant="neutral">Min 10 USD</Chip>
            <Chip variant="neutral" selected>Selected</Chip>
            <Chip variant="neutral" iconLeft={dot}>With icon</Chip>
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">size l</span>
            <Chip size="l">Large</Chip>
            <Chip size="l" variant="neutral" iconLeft={dot}>Large icon</Chip>
            <Chip leadingSlot={dot} trailingSlot={<CloseIcon />}>With slots</Chip>
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Быстрые фильтры и пресеты: валюта, сумма, период.',
          'Подсказка мин. суммы под Amount Field (neutral s).',
        ]}
        spacing={[
          'S: --c-chip-s-padding-x/y, gap, text-container padding-x.',
          'L: --c-chip-l-padding, min-height, icon-size.',
          'With-slots: токены Chip/M/* (зазор 0).',
        ]}
        why={[
          'Pill, как все контролы выбора.',
          'Selected: обводка + focus-эффект (как в Figma); hover в Figma не заведён.',
          'aria-pressed — переключатель, не навигация.',
        ]}
      />
      <Preview title="Divider + Text Container" note="Orientation: horizontal | vertical · Alignment × Size">
        <div className="sc-demo sc-demo--col">
          <TextContainer title="Title" subtitle="Subtitle" description="Description under the title" caption="Caption" />
          <Divider />
          <Divider label="or" />
          <TextContainer align="center" size="large" title="Large centered" description="Description" />
          <TextContainer align="right" size="xlarge" title="XLarge right" />
          <TextContainer align="center" size="2xlarge" title="Heading" subtitle="Subheading" />
        </div>
      </Preview>
      <Doc
        where={[
          'Text Container — заголовочный блок экранов и внутренность List Item.',
          'Divider — разделитель секций и строк списка; с подписью «или».',
        ]}
        spacing={[
          'Text Container: gap по умолчанию 0, 2xlarge — --c-text-container-2xlarge-gap.',
          'Divider: толщина --c-divider-stroke, подпись — Space/xl по бокам.',
        ]}
        why={[
          'Один текстовый блок вместо ручных связок заголовок+подпись.',
          'Style=strong у Divider в Figma не отличается от default — в код не вынесен.',
          'Цвета Text Container берутся из токенов List Item (так собрано в Figma) — в «Открыто».',
        ]}
      />
      <Preview title="List + List Item" note="List: card | list · Item: Size × Style × Selected · hover / active / disabled">
        <div className="sc-demo sc-demo--grid">
          <List variant="card">
            {['a', 'b', 'c'].map((id, i) => (
              <ListItem
                key={id}
                showDivider={i > 0}
                selected={row === id}
                onClick={() => setRow(id)}
                leftSlot={dot}
                title={`Option ${id.toUpperCase()}`}
                subtitle="Subtitle"
                rightSlot={<Icon />}
              />
            ))}
            <ListItem disabled showDivider title="Disabled" subtitle="Not available" />
          </List>
          <List variant="list">
            <ListItem variant="list" size="small" showDivider={false} title="Small row" rightSlot={<Icon />} />
            <ListItem variant="list" size="small" title="Small row" rightSlot={<Icon />} />
            <ListItem variant="card" size="small" showDivider={false} selected title="Card item, selected" />
          </List>
        </div>
      </Preview>
      <Doc
        where={[
          'Выбор из вариантов (страна, документ, метод) и строки данных.',
          'Список шагов/результатов проверки.',
        ]}
        spacing={[
          'List: --c-list-padding-x/y, gap, radius (только card).',
          'Item: --c-list-item-main-container-padding-x/y; у card боковые — Space/xl (как в Figma).',
          'Слоты: gap --c-list-item-item-content-gap, высота слота — Size/lg (large) или Size/md (small).',
        ]}
        why={[
          'Слоты left/center/right вместо отдельных типов строк — reuse-first.',
          'Selected: фон, у card ещё и обводка brand.',
          'Если передан onClick — строка становится кнопкой (hover/active/focus).',
        ]}
      />
    </>
  );
}

const STEPS = ['Contact Details', 'Data Consent', 'Scan documents', 'Scan face', 'Questionnaire'];

function FrameDemo() {
  const [tab, setTab] = useState('signin');
  const [step, setStep] = useState(3);
  return (
    <>
      <Preview title="Form Card" note="Actions: stacked | inline · header / body / footer — слоты">
        <div className="sc-demo sc-demo--grid">
          <FormCard
            header={<SegmentedControl aria-label="Mode" value={tab} onChange={setTab} options={[{ value: 'signin', label: 'Sign in' }, { value: 'signup', label: 'Sign up' }]} />}
            primaryAction={<Button>Continue</Button>}
            secondaryAction={<Button variant="secondary">Back</Button>}
            dividerLabel="or"
            altActions={<Button variant="secondary">Continue with Google</Button>}
          >
            <TextField label="Email" placeholder="name@example.com" />
          </FormCard>
          <FormCard
            actions="inline"
            primaryAction={<Button>Continue</Button>}
            secondaryAction={<Button variant="secondary">Back</Button>}
          >
            <TextField label="Email" placeholder="name@example.com" />
          </FormCard>
        </div>
      </Preview>
      <Doc
        where={[
          'Любая форма на экране: вход, ввод данных, подтверждение.',
          'Внутри — Segmented Control, поля, кнопки, Divider «или».',
        ]}
        spacing={[
          'Корень: padding 0, gap Space/none, радиус --c-form-card-radius.',
          'Зоны header/body/footer: Space/2xl; body и footer — gap Space/xl.',
          'Кнопки: gap Space/sm.',
        ]}
        why={[
          'Каркас один, содержимое — слоты: reuse-first, без отдельных «карточек входа».',
          'Зона видна, когда слот передан (show-* из Figma).',
          'Зоны разделены линией Form Card/border (как на экранах Figma: между header, body и footer). Корень не обрезает содержимое — из body может открываться список (выбор страны).',
          'Ширина — не больше 522 (Size/Form-card/width → --c-form-card-max-width), на узком экране ужимается.',
        ]}
      />
      <Preview title="Window Header + Step Indicator" note="Header: slots left/right · Step 1–5 × State × Layout">
        <div className="sc-demo sc-demo--col">
          <WindowHeader
            title="Verification"
            leftAction={<Button size="s" variant="secondary" iconOnly iconLeft={<Icon direction="left" />} aria-label="Back" />}
            rightAction={<Button size="s" variant="secondary" iconOnly iconLeft={<CloseIcon />} aria-label="Close" />}
            stepIndicator={<StepIndicator step={step} labels={STEPS} />}
          />
          <div className="sc-demo__row">
            {[1, 2, 3, 4, 5].map((n) => (
              <Chip key={n} selected={step === n} onClick={() => setStep(n)}>Step {n}</Chip>
            ))}
          </div>
          <StepIndicator step={step} labels={STEPS} layout="labeled" />
          <StepIndicator step={step} state="error" labels={STEPS} />
          <StepIndicator step={step} state="error" labels={STEPS} layout="labeled" />
        </div>
      </Preview>
      <Doc
        where={[
          'Window Header — верх каждого окна флоу: назад, заголовок, закрыть.',
          'Step Indicator — прогресс верификации; compact внутри шапки, labeled — на широких экранах.',
        ]}
        spacing={[
          'Header: padding --c-window-header-padding (2xl), gap xl, слоты 40×40 (Size/lg).',
          'Step compact: gap --c-step-indicator-gap, линия 24 (--c-step-indicator-connector-width).',
          'Step labeled: gap между шагами 24, внутри шага Space/sm.',
        ]}
        why={[
          'Кнопки шапки — Button icon-only, не отдельные «иконки-кнопки».',
          'Error подсвечивает текущий шаг; вид состояния в Figma не прочитан — собран по токенам icon-error.',
          'Шаг передаётся числом, подписи — массивом: число шагов не зашито.',
        ]}
      />
      <Preview title="Order Summary" note="Expanded: true | false · rows — слот List Item, nested — группа со смещением">
        <div className="sc-demo sc-demo--grid">
          <OrderSummary title="Order summary">
            <ListItem variant="list" size="small" showDivider={false} title="Amount" rightSlot="100.00 USD" />
            <ListItem variant="list" size="small" showDivider={false} title="Fee" rightSlot="2.00 USD" />
            <OrderSummaryNested>
              <ListItem variant="list" size="small" showDivider={false} title="Network" rightSlot="1.50 USD" />
              <ListItem variant="list" size="small" showDivider={false} title="Service" rightSlot="0.50 USD" />
            </OrderSummaryNested>
            <ListItem variant="list" size="small" showDivider title="Total" rightSlot="102.00 USD" />
          </OrderSummary>
          <OrderSummary title="Order summary" defaultExpanded={false} />
        </div>
      </Preview>
      <Doc
        where={[
          'Итог перед оплатой: сумма, комиссии, итого.',
          'Свёрнутый вид — на мобильном, чтобы не занимать экран.',
        ]}
        spacing={[
          'Корень: gap --c-summary-gap, padding 0.',
          'Карточка: padding --c-summary-card-padding, радиус --c-summary-card-radius.',
          'Вложенная группа: слева --c-summary-nested-padding, gap --c-summary-nested-gap.',
        ]}
        why={[
          'Строки — обычные List Item small: свой «Summary Row» не нужен.',
          'Шеврон — Icon (arrow-right, повёрнут), слот chevron заменяем.',
          'Радиус карточки в Figma 24 без токена — в коде токен --c-summary-card-radius (в «Открыто»).',
        ]}
      />
    </>
  );
}

function AssetsDemo() {
  return (
    <>
      <Preview title="Logo with Badge + Currency Icon + Network Logo" note="Size: s | m | l · main и badge — подмена (swap), show-badge — badge передан">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">currency m | l</span>
            <CurrencyIcon currency="USD" />
            <CurrencyIcon currency="GEL" />
            <CurrencyIcon currency="USD" size="l" />
            <CurrencyIcon currency="GEL" size="l" />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">network</span>
            <NetworkLogo network="gram" />
            <NetworkLogo network="arbitrum" />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">s | m | l + badge</span>
            {(['s', 'm', 'l'] as const).map((s) => (
              <LogoWithBadge key={s} size={s} main={<CurrencyIcon currency="USD" size="l" />} badge={<NetworkLogo network="arbitrum" />} />
            ))}
            <LogoWithBadge size="l" main={<CurrencyIcon currency="GEL" size="l" />} badge={<NetworkLogo network="gram" />} />
            <LogoWithBadge size="l" main={<CurrencyIcon currency="GEL" size="l" />} />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Валюта, монета или банк в строке выбора: слот List Item, Amount Field (селектор), Method Chip.',
          'Бейдж — сеть (Gram, Arbitrum) или валюта счёта.',
        ]}
        spacing={[
          'Корень: --c-asset-logo-s|m|l-size (20 | 24 | 32), без отступов.',
          'Бейдж: --c-asset-logo-badge-size (16), --c-asset-logo-badge-padding (2), фон --c-asset-logo-badge-bg, справа снизу.',
          'Currency Icon: размер m | l — те же токены Asset Logo/M|L/size.',
        ]}
        why={[
          'Один корень с двумя слотами (main, badge) вместо отдельного компонента на каждую пару «монета + сеть».',
          'Бейдж 16 на всех размерах: на s и m он перекрывает логотип сильнее — допущение из Figma.',
          'Знаки валют и сетей — бренд-арт вне токенов (исключение владельца); монеты берутся из «06 — Icons» по мере надобности.',
        ]}
      />
      <Preview title="Bank Logo" note="Name: BOG | TBC | Credo | Visa | Mastercard | Cash · show-badge · badge">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">с бейджем</span>
            <BankLogo name="TBC" />
            <BankLogo name="Visa" />
            <BankLogo name="Mastercard" />
            <BankLogo name="Cash" />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">без бейджа</span>
            <BankLogo name="TBC" showBadge={false} />
            <BankLogo name="Visa" showBadge={false} />
            <BankLogo name="Mastercard" showBadge={false} />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">арт не перенесён</span>
            <BankLogo name="BOG" />
            <BankLogo name="Credo" />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Банк или карта в строке выбора метода оплаты (List Item, slot-left).',
          'Бейдж — валюта счёта (по умолчанию GEL).',
        ]}
        spacing={[
          'Корень 32: --c-asset-logo-l-size; подложка на всю ширину (--c-asset-logo-bg, радиус round).',
          'Знак внутри подложки 16: Size/Icon/xs, по центру.',
          'Cash — Currency Icon GEL l без подложки и бейджа.',
        ]}
        why={[
          'Собран из Logo with Badge: подложка со знаком — main, валюта — badge.',
          'Знаки TBC, Visa, Mastercard перенесены; BOG (27 КБ SVG) и Credo — пока буква вместо знака, свой знак можно передать через logo.',
        ]}
      />
      <Preview title="Method Icon + Status Icon" note="Kind: bank | cash | crypto · Type: success | failed">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">method</span>
            <MethodIcon kind="bank" />
            <MethodIcon kind="cash" />
            <MethodIcon kind="crypto" />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">status</span>
            <StatusIcon type="success" />
            <StatusIcon type="failed" />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Method Icon — способ оплаты: банк, наличные, крипта (строки выбора, Method Chip).',
          'Status Icon — итог операции в шапке результата (успех или ошибка), над Text Container.',
        ]}
        spacing={[
          'Method Icon: круг --c-method-icon-size (Size/lg), иконка --c-method-icon-icon-size.',
          'Status Icon: halo --c-status-icon-size (64), глиф --c-status-icon-glyph-size (48).',
        ]}
        why={[
          'Цвета только по роли: bank = brand, cash = success, crypto = warning; failed = error.',
          'Иконка наследует цвет (currentColor), поэтому один глиф работает для всех видов.',
          'Контраст crypto (Content/warning на Warning/subtle) 2.98 — иконка крупная, оставлено владельцем, в «Открыто».',
        ]}
      />
    </>
  );
}

function BrandDemo() {
  const [on, setOn] = useState(true);
  const [lang, setLang] = useState("EN");
  return (
    <>
      <Preview title="Switch + Avatar" note="Checked: false | true · Avatar — фото или инициалы">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">switch</span>
            <Switch aria-label="Уведомления" checked={on} onChange={(e) => setOn(e.target.checked)} />
            <Switch aria-label="Выключено" defaultChecked={false} />
            <Switch aria-label="Недоступно" disabled />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">avatar</span>
            <Avatar name="Nikita Tuia" />
            <Avatar name="AllTrust" />
            <Avatar alt="Пример фото" src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Crect width=%2724%27 height=%2724%27 fill=%27%230094ff%27/%3E%3Ccircle cx=%2712%27 cy=%279%27 r=%274%27 fill=%27white%27/%3E%3Cpath d=%27M4 24c0-5 3.5-8 8-8s8 3 8 8%27 fill=%27white%27/%3E%3C/svg%3E" />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          "Switch — настройки вкл/выкл: уведомления, сохранить способ оплаты, режимы.",
          "Avatar — пользователь в шапке и меню; в строках списка (slot-left).",
        ]}
        spacing={[
          "Switch: дорожка = шар + 2 × --c-switch-padding (2), шар --c-switch-ball-size (24), обводка --c-switch-stroke.",
          "Avatar: круг Size/sm (24), радиус --c-avatar-radius.",
        ]}
        why={[
          "Switch — нативный input role=switch: клавиатура и скринридер работают сами, подписи нет — задаётся aria-label.",
          "Тень шара — токен Elevation/Control/1 (0 8 6 −4, чёрный 16%, как в Figma): отдельный токен, не Overlay, потому что у подвижного элемента управления другая тень.",
          "Avatar без фото показывает инициалы (добавлено в коде, в Figma только фото); само фото — данные, не ассет системы.",
        ]}
      />
      <Preview title="Logo + Language Selector" note="Language Selector: State default | active — список открывается по клику">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">logo</span>
            <Logo />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">default</span>
            <LanguageSelector value={lang} onChange={setLang} />
          </div>
          <div className="sc-demo__row" style={{ minHeight: "calc(var(--size-lg) * 6)", alignItems: "flex-start" }}>
            <span className="sc-demo__tag text-caption-default sc-muted">active</span>
            <LanguageSelector value="RU" onChange={() => {}} open />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          "Logo — Header Bar слева, Footer, экран входа.",
          "Language Selector — Header Bar справа, перед кнопкой входа.",
        ]}
        spacing={[
          "Logo: высота Size/lg (40), пропорция 150:40; знак и вордмарк — как в Figma, без токенов отступов.",
          "Language Selector: Button secondary S compact + List card, зазор Space/sm, тень Elevation/Overlay/1+2.",
          "Строка: List Item small, флаг Size/md (32), галочка — Size/Icon/md (24), Content/brand.",
        ]}
        why={[
          "Собран из Button, List и List Item — своих стилей почти нет, только позиция и тень выпадашки.",
          "Закрывается по выбору, Esc и клику снаружи; кнопка отдаёт aria-expanded.",
          "Флаги EN, RU, GE — бренд-арт вне токенов; другие языки передаются через languages.",
        ]}
      />
      <Preview title="Spinner + Embed Placeholder" note="Embed Placeholder: Size default | compact · title, description">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">spinner</span>
            <Spinner />
          </div>
          <div className="sc-demo__row sc-demo__row--stack" style={{ width: "100%" }}>
            <span className="sc-demo__tag text-caption-default sc-muted">default</span>
            <EmbedPlaceholder />
          </div>
          <div className="sc-demo__row sc-demo__row--stack" style={{ width: "100%" }}>
            <span className="sc-demo__tag text-caption-default sc-muted">compact</span>
            <EmbedPlaceholder size="compact" />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          "Spinner — ожидание ответа: проверка заявки, загрузка внешнего блока.",
          "Embed Placeholder — место под внешний iframe (платёжная форма, верификация), пока блок не подключён.",
        ]}
        spacing={[
          "Spinner: Size Status/icon/size (64), трек --c-status-spinner-track, дуга --c-status-spinner-indicator.",
          "Embed Placeholder: padding --c-embed-placeholder-padding, gap --c-embed-placeholder-gap, радиус --c-embed-placeholder-radius, min-height 400 | 285.",
        ]}
        why={[
          "Spinner в Figma статичен; вращение добавлено в коде и отключается при prefers-reduced-motion.",
          "Embed Placeholder тянется на ширину родителя; пунктир — свойство компонента, не токен.",
          "Цвета заглушки — brand: она должна выглядеть временной, не контентом.",
        ]}
      />
    </>
  );
}

function ShellDemo() {
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

function AccountDemo() {
  const rows = [
    { id: 1, user: 'nikitatuia18@gmail.com', date: '17.08.2026 13:15', sum: '+12 USDT' },
    { id: 2, user: 'nikitatuia18@gmail.com', date: '16.08.2026 18:42', sum: '+12 USDT' },
  ];
  return (
    <>
      <Preview title="Badge" note="Variant: success | brand | neutral">
        <div className="sc-demo"><div className="sc-demo__row"><Badge>Received</Badge><Badge variant="brand">New</Badge><Badge variant="neutral">Draft</Badge></div></div>
      </Preview>
      <Doc
        where={['Статус строки в таблице («Received» в Earnings history).']}
        spacing={['Padding: Space/xs по вертикали, Space/md по горизонтали; радиус Radius/round; текст Label/sm.']}
        why={[
          'Не интерактивна. Кликабельная плашка — Chip.',
          'Заведены только три варианта; Pending / Failed появятся, когда будут нужны (нужен список статусов).',
        ]}
      />
      <Preview title="Breadcrumbs" note="Последний пункт — текущая страница (aria-current)">
        <div className="sc-demo"><Breadcrumbs items={[{ label: 'Home', href: '#/components' }, { label: 'Account' }]} /></div>
      </Preview>
      <Doc
        where={['Верх страницы кабинета, под шапкой сайта.']}
        spacing={['Зазор между пунктами и стрелкой Space/xs; стрелка Size/icon/xs (arrow-right).']}
        why={['Пройденные пункты tertiary (ссылки), текущий — secondary. Hover и фокус в Figma не нарисованы: hover → primary, фокус — общий Focus.']}
      />
      <Preview title="Stat Tile" note="В ряду плитки делят ширину поровну, переносятся при ширине < Size/min-width/md">
        <div className="sc-demo" style={{ width: '100%' }}>
          <div style={{ display: 'flex', gap: 'var(--space-xl)', width: '100%' }}>
            <StatTile icon={<WalletIcon />} value="0 USDT" label="Total earnings" />
            <StatTile icon={<UsersIcon />} value="1 referral" label="Referred users" />
          </div>
        </div>
      </Preview>
      <Doc
        where={['Показатели в карточке Earnings.']}
        spacing={['Padding: Space/lg по вертикали, Space/xl по горизонтали; зазор Space/sm; радиус Radius/lg; фон Surface/neutral/canvas; иконка Size/icon/lg.']}
        why={['Значение — Heading/h4, подпись — Caption. Иконки — currentColor, цвет задаёт плитка.']}
      />
      <Preview title="Icon Circle" note="Tone: subtle | brand">
        <div className="sc-demo"><div className="sc-demo__row"><IconCircle><ProfileIcon /></IconCircle><IconCircle><LinkIcon /></IconCircle><IconCircle tone="brand"><StarIcon /></IconCircle></div></div>
      </Preview>
      <Doc
        where={['Левый слот ListItem в меню кабинета; строка «My referral link».']}
        spacing={['Круг Size/xl, иконка Size/icon/md.']}
        why={['Отличие от Method Icon: произвольная иконка, а не способ оплаты. brand — выбранный пункт меню.']}
      />
      <Preview title="Table" note="Ширина колонок по содержимому, одна колонка растягивается; на узком экране прокручивается">
        <div className="sc-demo" style={{ width: '100%' }}>
          <Table
            caption="Example"
            rowKey={(r) => r.id}
            rows={rows}
            columns={[
              { key: 'u', header: 'Referred user', grow: true, cell: (r) => r.user },
              { key: 'd', header: 'Date', cell: (r) => r.date },
              { key: 's', header: 'Commission', cell: (r) => r.sum },
            ]}
          />
        </div>
      </Preview>
      <Doc
        where={['Earnings history в кабинете.']}
        spacing={['Строки: Space/xl сверху и снизу, линия Border/neutral/default; зазор колонок Space/2xl; заголовок Space/sm до первой строки.']}
        why={[
          'Настоящий table: заголовки scope=col, подпись для скринридеров. Содержимое ячеек — render-функции (бейджи, цвет).',
          'Ширины колонок не заданы числами: так таблица остаётся адаптивной. Если дизайнеру нужна жёсткая сетка — обсудить токены.',
        ]}
      />
    </>
  );
}

export function ComponentsPage() {
  return (
    <>
      <div className="sc-intro">
        <h1 className="text-heading-h1">Компоненты</h1>
        <p className="text-body-lg sc-muted">
          Волны A–F: самое нужное для флоу верификации. Всё стилизовано только токенами, состояния — через data-атрибуты.
          Иконки взяты из «06 — Icons» (outline): стрелки и шевроны — arrow-right, плюс — add, минус — minus, крестик — close-circle, поиск — search-normal, точка — record; галочка и «!» — внутренние глифы tick-circle и info-circle (простых без круга в наборе нет).
        </p>
      </div>
      <Group title="Действия" note="То, что запускает шаг или переключает режим.">
        <ButtonDemo />
      </Group>
      <Group title="Ввод данных" note="Поля, сумма, выбор.">
        <InputDemo />
      </Group>
      <Group title="Контент и списки" note="Чипы, текст, разделители, списки выбора.">
        <ContentDemo />
      </Group>
      <Group title="Каркас окна и шаги" note="Формы, шапка окна, прогресс, итог заказа.">
        <FrameDemo />
      </Group>
      <Group title="Логотипы и статусы" note="Валюты, сети, банки, способы оплаты, итог операции.">
        <AssetsDemo />
      </Group>
      <Group title="Бренд, переключатели и ожидание" note="Логотип, язык, переключатель, аватар, загрузка и заглушка внешнего блока.">
        <BrandDemo />
      </Group>
      <Group title="Из экрана Account" note="Компоненты, которых не хватило при сборке кабинета. Плюс расширения: Segmented Control size m, Avatar size lg, Form Card fluid.">
        <AccountDemo />
      </Group>
      <Group title="Шапка и подвал" note="Каркас страницы сайта: навигация сверху, ссылки и действия снизу.">
        <ShellDemo />
      </Group>
    </>
  );
}
