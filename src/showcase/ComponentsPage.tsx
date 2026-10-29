import { useState, type ReactNode } from 'react';
import {
  AmountField, Button, Checkbox, Chip, Divider, FormCard, List, ListItem, OrderSummary, OrderSummaryNested,
  Icon, PlusIcon, CloseIcon, SearchIcon, DotIcon, SegmentedControl, StepIndicator, TextContainer, TextField, WindowHeader, type ButtonVariant,
  BankLogo, CurrencyIcon, LogoWithBadge, MethodIcon, NetworkLogo, StatusIcon,
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
          'Бокс 20×20 (--prim-spacing-450), галочка 16×16.',
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
          'Обводка у зон header/body в Figma дублирует корень — в код не перенесена, ждём решения.',
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

export function ComponentsPage() {
  return (
    <>
      <div className="sc-intro">
        <h1 className="text-heading-h1">Компоненты</h1>
        <p className="text-body-lg sc-muted">
          Волны A–D: самое нужное для флоу верификации. Всё стилизовано только токенами, состояния — через data-атрибуты.
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
    </>
  );
}
