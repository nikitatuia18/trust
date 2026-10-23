import { useState, type ReactNode } from 'react';
import { AmountField, Button, Checkbox, SegmentedControl, TextField, type ButtonVariant } from '../components';

type DocProps = { where: string[]; spacing: string[]; why: string[] };

function Preview({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="sc-card" style={{ gridColumn: 'span 2' }}>
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
      <div className="sc-bento">{children}</div>
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
            <div key={v} className="sc-demo__row">
              <span className="sc-demo__tag text-caption-default sc-muted">{v}</span>
              <Button variant={v}>Continue</Button>
              <Button variant={v} iconLeft="←">Back</Button>
              <Button variant={v} iconRight="→">Next</Button>
              <Button variant={v} iconOnly iconLeft="+" aria-label="Add" />
              <Button variant={v} disabled>Disabled</Button>
            </div>
          ))}
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">size s</span>
            <Button size="s">Small</Button>
            <Button size="s" variant="secondary" density="compact">Compact</Button>
            <Button size="s" variant="secondary" iconOnly iconLeft="+" aria-label="Add" />
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
          <TextField label="With slots" placeholder="Search" leftSlot="⌕" rightSlot="✕" />
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
            selector={<Button variant="secondary" size="s" density="compact" iconRight="▾">USD</Button>}
            hint="Min 10 USD"
          />
          <AmountField
            label="You get"
            error
            defaultValue="0"
            selector={<Button variant="secondary" size="s" density="compact" iconRight="▾">EUR</Button>}
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
  const [size, setSize] = useState<'s' | 'm'>('s');
  const [agree, setAgree] = useState(true);
  return (
    <>
      <Preview title="Segmented Control" note="Сегменты — Segment Item; s собран в Figma, m — на токенах Segment/item/M/*">
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
          <SegmentedControl aria-label="Size" size="m" value={size} onChange={setSize} options={[{ value: 's', label: 'S' }, { value: 'm', label: 'M' }]} />
        </div>
      </Preview>
      <Doc
        where={[
          'Переключение режима в рамках одного экрана: способ оплаты, период, вид.',
          'Не навигация между страницами.',
        ]}
        spacing={[
          'Контейнер: --c-segment-control-padding-x/y, gap --c-segment-control-gap.',
          'Сегмент: --c-segment-item-s|m-padding-x/y, gap, radius.',
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

export function ComponentsPage() {
  return (
    <>
      <div className="sc-intro">
        <h1 className="text-heading-h1">Компоненты</h1>
        <p className="text-body-lg sc-muted">
          Волна A: самое нужное для флоу верификации. Всё стилизовано только токенами, состояния — через data-атрибуты.
          Иконки — отдельный этап: слоты принимают любой ReactNode.
        </p>
      </div>
      <Group title="Действия" note="То, что запускает шаг или переключает режим.">
        <ButtonDemo />
      </Group>
      <Group title="Ввод данных" note="Поля, сумма, выбор.">
        <InputDemo />
      </Group>
    </>
  );
}
