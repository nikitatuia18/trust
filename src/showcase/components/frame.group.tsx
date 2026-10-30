import { useState } from 'react';
import { Button, Chip, Divider, FormCard, List, ListItem, OrderSummary, OrderSummaryNested, Icon, CloseIcon, SegmentedControl, StepIndicator, TextField, WindowHeader, Header, Modal } from '../../components';
import { Doc, Preview } from './doc-kit';

/** Группа страницы «Компоненты». order — позиция, title/note — заголовок группы. */
export const meta = { order: 40, title: "Каркас окна и шаги", note: "Формы, шапка окна, прогресс, итог заказа." };

const STEPS = ['Contact Details', 'Data Consent', 'Scan documents', 'Scan face', 'Questionnaire'];

export default function FrameDemo() {
  const [tab, setTab] = useState('signin');
  const [step, setStep] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
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
          'Шапка с заголовком (.at-form-card__title): --c-form-card-header-padding-y (Space/2xl) над заглавными и под базовой линией.',
          'Кнопки: gap Space/sm.',
        ]}
        why={[
          'Каркас один, содержимое — слоты: reuse-first, без отдельных «карточек входа».',
          'Зона видна, когда слот передан (show-* из Figma).',
          'Зоны разделены линией Form Card/border (как на экранах Figma: между header, body и footer). Корень не обрезает содержимое — из body может открываться список (выбор страны).',
          'Заголовок шапки — класс .at-form-card__title с text-box: trim-both cap alphabetic: отступ считается от верха заглавных до базовой линии, поэтому сверху и снизу он одинаковый (раньше «воздух» строки давал разницу 2–3px). Обводка — настоящая граница (в Figma INSIDE, места не занимает): так отступ от неё до содержимого равен отступу у разделителей. Углы — со сглаживанием (Правила, п. 18). Отличие от Figma — записать при переносе.',
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
      <Preview title="Modal" note="open: true | false · слоты: illustration, title, description, body, primaryAction, secondaryAction">
        <div className="sc-demo">
          <div className="sc-demo__row">
            <Button variant="secondary" onClick={() => setModalOpen(true)}>Open modal</Button>
          </div>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Delete draft?"
            description="The draft will be removed from your device."
            primaryAction={<Button variant="destructive" onClick={() => setModalOpen(false)}>Delete</Button>}
            secondaryAction={<Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>}
          />
        </div>
      </Preview>
      <Doc
        where={[
          'Подтверждение необратимого действия (блокировка аккаунта, выход), короткая форма или сообщение, на которое нужен ответ до возврата на страницу.',
          'Окно — собственный компонент, не Form Card: заголовок и пояснение по центру, два действия в ряд, над заголовком место под иллюстрацию (слот illustration, сами иллюстрации позже). Крестика нет — закрывает «Cancel», Esc или клик по затемнению. Для широких форм и потоков — отдельная страница, не модалка.',
        ]}
        spacing={[
          'Затемнение: --c-modal-scrim → Surface/Overlay/modal-scrim → Black/alpha-8 (8%). Размытие: --c-modal-backdrop-blur → Blur/Modal-backdrop = 16. Поля вокруг окна: --c-modal-padding (Space/xl).',
          'Окно: ширина --c-modal-max-width (как у Form Card, 522), радиус --c-modal-radius (Radius/2xl) со сглаживанием углов, обводка --c-modal-stroke.',
          'Зоны (шапка, тело, действия): боковые и внутренние отступы --c-modal-zone-padding (Space/2xl); сверху окна и снизу окна — --c-modal-edge-padding (Space/5xl = 40, на мобильном 36). Зазор заголовок–пояснение --c-modal-header-gap (Space/sm = 8), между действиями --c-modal-actions-gap.',
        ]}
        why={[
          'Свой компонент, а не Form Card: у модалки свои отступы, выравнивание по центру и фон за окном; Form Card остаётся «чистым» для карточек страницы (Правила, п. 17).',
          'Заголовок и пояснение обрезаны по буквам (text-box), поэтому зазор 8 считается от букв: под заголовком с пояснением нижний край — линия выносных элементов (g, p), иначе они почти касались бы текста.',
          'Нативный <dialog>: фокус остаётся внутри, страница под окном недоступна, Esc закрывает, фокус возвращается на кнопку, открывшую окно. Состояние держит родитель: open и onClose.',
          'Фокус при открытии — на самом окне, не на кнопке: у кнопки висело бы кольцо фокуса (его браузер показывает после нажатия любой клавиши), а случайный Enter не должен подтверждать необратимое действие. Кнопки получают фокус по Tab, кольцо у них остаётся.',
          'Затемнение 8% и блюр 16 — решение владельца 2026-10-30 (сначала было 32% и 24 — слишком темно). Клик по затемнению закрывает окно; страница не прокручивается. Анимации появления нет — добавим вместе с остальными (prefers-reduced-motion учесть).',
          'Для Modal нет компонента в Figma «03 — Components» и токенов в «02 — Tokens» — перенести пачкой по npm run debt.',
        ]}
      />
    </>
  );
}
