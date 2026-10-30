import { useState } from 'react';
import { AmountField, Button, Checkbox, Chip, List, Icon, CloseIcon, EditIcon, SearchIcon, SegmentedControl, TextField } from '../../components';
import { Doc, Preview } from './doc-kit';

/** Группа страницы «Компоненты». order — позиция, title/note — заголовок группы. */
export const meta = { order: 20, title: "Ввод данных", note: "Поля, сумма, выбор." };

export default function InputDemo() {
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
          <TextField
            label="Slot with action"
            defaultValue="+7 (950) 907-22-48"
            readOnly
            rightSlot={<Button variant="ghost" size="s" density="compact" iconOnly iconLeft={<EditIcon />} aria-label="Edit phone number" />}
          />
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
          'Слот может держать кнопку-действие (Button ghost s icon-only, например карандаш «изменить»): она сохраняет свои 40×40, высота поля не растёт (8 + 40 + 8 = 56), а до правого края те же Space/sm (8), что сверху и снизу. В Figma слот рассчитан на иконку 24 — расширение записано в «Открыто».',
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
