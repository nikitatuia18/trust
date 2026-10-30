import { Fragment, useState, type ReactNode } from 'react';
import {
  Button, Checkbox, Chip, CloseIcon, FormCard, Icon, MinusIcon, Modal, PlusIcon, SearchIcon, SegmentedControl, Spinner, Switch, TextField, WindowHeader,
} from '../components';

type RuleProps = {
  n: number;
  title: string;
  text: string;
  demo: ReactNode;
  good?: string[];
  bad?: string[];
  note?: string;
};

function Rule({ n, title, text, demo, good, bad, note }: RuleProps) {
  return (
    <section className="sc-card sc-rule">
      <header className="sc-card__head">
        <span className="text-caption-default sc-muted">Правило {n}</span>
        <h3 className="text-label-lg">{title}</h3>
      </header>
      <p className="text-body-sm sc-muted">{text}</p>
      <div className="sc-rule__demo">{demo}</div>
      {(good || bad) && (
        <ul className="sc-list">
          {good?.map((c) => <li key={c} className="sc-rule__line"><span className="sc-rule__mark text-label-sm">✔</span><code className="sc-code">{c}</code></li>)}
          {bad?.map((c) => <li key={c} className="sc-rule__line"><span className="sc-rule__mark sc-rule__mark--bad text-label-sm">✘</span><code className="sc-code sc-code--bad">{c}</code></li>)}
        </ul>
      )}
      {note && <p className="text-body-xs sc-muted sc-rule__note">{note}</p>}
    </section>
  );
}

function Section({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <>
      <div className="sc-section">
        <h2 className="text-heading-h3">{title}</h2>
        <p className="text-body-sm sc-muted">{note}</p>
      </div>
      <div className="sc-bento sc-bento--rules">{children}</div>
    </>
  );
}

/* ——— мелкие кирпичики демо ——— */

const Cap = ({ children }: { children: ReactNode }) => <span className="text-caption-default sc-muted">{children}</span>;

/** Подпись под элементом демо */
const Cell = ({ cap, children }: { cap: ReactNode; children: ReactNode }) => (
  <div className="sc-rule__cell">
    {children}
    <Cap>{cap}</Cap>
  </div>
);

/** Цепочка шагов: Chip → Chip → … */
function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="sc-rule__flow">
      {steps.map((s, i) => (
        <Fragment key={s}>
          {i > 0 && <span className="sc-rule__arrow" aria-hidden="true"><Icon /></span>}
          <Chip variant="neutral" size="s">{s}</Chip>
        </Fragment>
      ))}
    </div>
  );
}

/** Строка цепочки токенов: образец цвета + имя + уровень */
const TokenStep = ({ css, level, shown }: { css: string; level: string; shown?: string }) => (
  <div className="sc-rule__token">
    <span className="sc-rule__chip" style={{ background: `var(${css})` }} />
    <code className="sc-code">{shown ?? css}</code>
    <Cap>{level}</Cap>
  </div>
);

const Pair = ({ bg, fg, cap }: { bg: string; fg: string; cap: string }) => (
  <Cell cap={cap}>
    <span className="sc-contrast sc-rule__pair text-label-md" style={{ background: `var(${bg})`, color: `var(${fg})` }}>Aa</span>
  </Cell>
);

const IconSlot = ({ color, children }: { color: string; children: ReactNode }) => (
  <span className="sc-rule__icon" style={{ color: `var(${color})` }}>{children}</span>
);

/* ——— демо, которым нужно состояние ——— */

function PillDemo() {
  const [v, setV] = useState('card');
  return (
    <div className="sc-rule__col">
      <Cell cap="Контролы — pill (Radius/round)">
        <div className="sc-rule__row">
          <Button size="s">Button</Button>
          <Chip>Chip</Chip>
          <SegmentedControl
            aria-label="Method"
            value={v}
            onChange={setV}
            options={[{ value: 'card', label: 'Card' }, { value: 'bank', label: 'Bank' }]}
          />
        </div>
      </Cell>
      <Cell cap="Контейнер — радиус по своему токену">
        <div className="sc-rule__box text-label-md">Card</div>
      </Cell>
    </div>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Cell cap="Откройте окно: страница за ним размыта (24) и затемнена (32%)">
        <Button size="s" variant="secondary" onClick={() => setOpen(true)}>Open modal</Button>
      </Cell>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="rules-modal-title">
        <FormCard
          actions="inline"
          header={<WindowHeader title={<span id="rules-modal-title">Are you sure?</span>} rightAction={<Button size="s" variant="secondary" iconOnly iconLeft={<CloseIcon />} aria-label="Close" onClick={() => setOpen(false)} />} />}
          primaryAction={<Button variant="destructive" onClick={() => setOpen(false)}>Confirm</Button>}
          secondaryAction={<Button variant="secondary" data-autofocus onClick={() => setOpen(false)}>Cancel</Button>}
        >
          <p className="text-body-sm sc-muted">Everything behind this window is blurred and dimmed.</p>
        </FormCard>
      </Modal>
    </>
  );
}

/* ——— страница ——— */

export function RulesPage() {
  return (
    <>
      <div className="sc-intro">
        <h1 className="text-heading-h1">Правила</h1>
        <p className="text-body-lg sc-muted">
          Что соблюдаем при работе с системой — в Figma, в компонентах и на экранах. У каждого правила есть живой пример на настоящих
          компонентах и токенах. Правила взяты из того, как уже устроен код; там, где есть исключения, они названы прямо в карточке.
        </p>
      </div>

      <Section title="Токены" note="Единственный источник значений — токены из Figma.">
        <Rule
          n={1}
          title="Никаких сырых значений"
          text="Цвет, отступ, размер, радиус, шрифт — только токены. Нужного токена нет — сначала он появляется в Figma."
          demo={
            <>
              <Cell cap="padding: var(--space-xl)"><span className="sc-rule__pad sc-rule__pad--token"><span className="sc-rule__inner" /></span></Cell>
              <Cell cap="padding: 16px"><span className="sc-rule__pad sc-rule__pad--raw"><span className="sc-rule__inner" /></span></Cell>
              <Cap>Переключите Desktop / Mobile слева: отступ слева сам станет меньше, справа так и останется 16px.</Cap>
            </>
          }
          good={['padding: var(--space-lg)', 'border-radius: var(--radius-round)']}
          bad={['padding: 12px', 'color: #1a1a1a']}
          note="Исключения сейчас: ширина столбца Mega Menu (298px, токена нет); значения в @media (var() там не работает); 1px у скрытого текста StepIndicator."
        />
        <Rule
          n={2}
          title="Три уровня токенов"
          text="Primitives — только цель алиасов. Semantic (Theme / Layout) — в компонентах и на экранах. Components (--c-*) — внутри своего компонента."
          demo={
            <>
              <Cell cap="Так заливка primary-кнопки доходит до цвета"><Button size="s">Continue</Button></Cell>
              <TokenStep css="--c-button-primary-bg" level="Components — внутри Button" />
              <TokenStep css="--surface-brand-default" level="Semantic — экраны и компоненты" />
              <TokenStep css="--prim-color-brand-500" level="Primitive — только алиас" shown="--prim-color-brand-500 = #0094ff" />
            </>
          }
          good={['var(--surface-brand-default)', 'var(--c-button-m-padding-x)']}
          bad={['var(--prim-spacing-400)']}
          note="Нет подходящего семантического токена — заводим его (так появились Size/Indicator/* для Checkbox и Elevation/Control/1 для тени шара Switch), а не берём примитив."
        />
        <Rule
          n={3}
          title="Сгенерированное руками не правим"
          text="tokens.css, typography.css, tokens/*.json и registry.json генерируются. Токен из Figma: правка в Figma, новый экспорт в tools/raw, затем скрипт. Новый токен, которого в Figma ещё нет, — строка в tools/raw/local.txt и тот же скрипт."
          demo={<Flow steps={['Figma или local.txt', 'tools/raw', 'npm run tokens', 'tokens.css']} />}
          good={['npm run tokens']}
          bad={['правка src/styles/tokens.css']}
        />
        <Rule
          n={4}
          title="Текст — классами типографики"
          text="Размер, вес и межстрочный задаются классом .text-<группа>-<имя> или токенами --typography-*. Свои комбинации не собираем."
          demo={
            <div className="sc-rule__col">
              <Cell cap=".text-heading-h3"><span className="text-heading-h3">Order summary</span></Cell>
              <Cell cap=".text-label-md"><span className="text-label-md">You send</span></Cell>
              <Cell cap=".text-body-sm"><span className="text-body-sm">Fees are shown before you confirm.</span></Cell>
            </div>
          }
          good={['className="text-label-md"', 'font-size: var(--typography-font-size-xs)']}
          bad={['font-size: 14px']}
        />
      </Section>

      <Section title="Цвет" note="Цвет — это роль, а не оттенок.">
        <Rule
          n={5}
          title="У каждой заливки есть пара Content/on-<роль>"
          text="Контраст текста или иконки на заливке не ниже 4.5:1. Проверка по всем парам — на странице «Токены», блок «Контраст»."
          demo={
            <>
              <Pair bg="--surface-brand-default" fg="--content-on-brand" cap="brand" />
              <Pair bg="--surface-error-default" fg="--content-on-error" cap="error" />
              <Pair bg="--surface-success-default" fg="--content-on-success" cap="success" />
              <Pair bg="--surface-warning-default" fg="--content-on-warning" cap="warning" />
            </>
          }
          good={['surface-brand-default + content-on-brand']}
          note="Осознанные исключения (по расчёту генератора токенов): Content/on-brand на Surface/Brand/default — 3.14, на hover — 3.73; Content/on-success на Surface/Success/default — 3.54; crypto в Method Icon — 2.98. Оставлено владельцем."
        />
        <Rule
          n={6}
          title="Disabled — только через opacity-токен"
          text="Отдельных «серых» цветов для недоступного состояния нет: элемент остаётся в своих цветах и тускнеет одним токеном. Так одинаково у всех стилей и ролей."
          demo={
            <div className="sc-rule__col">
              <Cell cap="Доступны">
                <div className="sc-rule__row">
                  <Button size="s">Primary</Button>
                  <Button size="s" variant="secondary">Secondary</Button>
                  <Button size="s" variant="destructive">Delete</Button>
                </div>
              </Cell>
              <Cell cap="Те же кнопки с disabled — те же цвета, один opacity-токен">
                <div className="sc-rule__row">
                  <Button size="s" disabled>Primary</Button>
                  <Button size="s" variant="secondary" disabled>Secondary</Button>
                  <Button size="s" variant="destructive" disabled>Delete</Button>
                </div>
              </Cell>
            </div>
          }
          good={['opacity: var(--opacity-disabled)']}
          bad={['color: #999', 'opacity: 0.4']}
        />
      </Section>

      <Section title="Компоненты" note="Сначала переиспользуем, новое — только с обоснованием.">
        <Rule
          n={7}
          title="Reuse-first"
          text="Порядок решения: существующий компонент → его свойство или слот → ось существующего → новый компонент (только с обоснованием). Новый без Doc на витрине не считается готовым."
          demo={
            <>
              <Flow steps={['Компонент', 'Свойство / слот', 'Ось', 'Новый']} />
              <Cell cap="Пример: селектор валюты — не новый Select Trigger, а Button в density compact">
                <Button variant="secondary" size="s" density="compact" iconRight={<Icon direction="down" />}>USD</Button>
              </Cell>
            </>
          }
          good={['Селектор = Button в density compact']}
          bad={['отдельный Select Trigger, повторяющий Button']}
        />
        <Rule
          n={8}
          title="Форма: контролы — pill"
          text="Button, TextField, Chip, SegmentedControl — полностью скруглены. Контейнеры (карточки, окна, меню) — радиусами по своим токенам."
          demo={<PillDemo />}
          good={['control: var(--radius-round)']}
          bad={['радиус контрола задан числом']}
        />
        <Rule
          n={9}
          title="Состояния — через data-атрибуты"
          text="Вариант, размер, плотность — атрибуты на корне, а не набор модификаторных классов. Так состояние видно и в разметке, и в тестах."
          demo={
            <div className="sc-rule__col">
              <Cell cap='data-variant="primary" data-size="m"'><Button>Primary</Button></Cell>
              <Cell cap='data-variant="secondary" data-size="s"'><Button variant="secondary" size="s">Secondary</Button></Cell>
              <Cell cap='data-variant="link" data-size="s"'><Button variant="link" size="s">Link</Button></Cell>
            </div>
          }
          good={[".at-button[data-variant='link']", 'data-size, data-density, data-icon-only']}
          bad={['.at-button--link-hover-big']}
        />
        <Rule
          n={10}
          title="Focus виден всегда"
          text="Через :focus-visible: обводка Focus/<роль>/border плюс кольцо effect. У destructive роль error. Если в Figma у компонента нет focus, кольцо добавляем в код по образцу Button и Checkbox."
          demo={
            <>
              <div className="sc-rule__row">
                <Button size="s">Primary</Button>
                <Button size="s" variant="destructive">Delete</Button>
                <Checkbox label="Agree" />
              </div>
              <Cap>Нажмите Tab: у кнопки — кольцо brand, у destructive — кольцо error, у чекбокса — своё.</Cap>
            </>
          }
          good={['.at-button:focus-visible { … var(--focus-brand-ring) }']}
          bad={['outline: none без замены']}
          note="Так добавлено для Tertiary и Checkbox — записано в «Открыто»."
        />
        <Rule
          n={11}
          title="Размер и плотность — оси компонента"
          text="Size (m / s) и Density (default / compact) — свойства компонента, а не локальные переопределения отступов. Mobile-значения приходят из токенов Layout (ширина до 767px или data-layout=mobile)."
          demo={
            <div className="sc-rule__grid">
              <Cell cap='size="m"'><Button variant="secondary">Continue</Button></Cell>
              <Cell cap='size="m" density="compact"'><Button variant="secondary" density="compact">Continue</Button></Cell>
              <Cell cap='size="s"'><Button variant="secondary" size="s">Continue</Button></Cell>
              <Cell cap='size="s" density="compact"'><Button variant="secondary" size="s" density="compact">Continue</Button></Cell>
            </div>
          }
          good={['<Button size="s" density="compact">']}
          bad={['padding: 6px 10px поверх компонента']}
          note="Раскладочное переключение (например, Footer) делается через @media (max-width: 767px) — это значение Breakpoint/sm."
        />
      </Section>

      <Section title="Иконки и доступность" note="Иконка наследует цвет, интерфейс работает без мыши.">
        <Rule
          n={12}
          title="Иконки — контуры из «06 — Icons»"
          text="Цвет через currentColor, размер задаёт слот. Простые варианты (плюс, минус, крестик) — без круга там, где такой есть в наборе."
          demo={
            <>
              <Cell cap="content-primary"><span className="sc-rule__row"><IconSlot color="--content-primary"><PlusIcon /></IconSlot><IconSlot color="--content-primary"><MinusIcon /></IconSlot><IconSlot color="--content-primary"><CloseIcon /></IconSlot><IconSlot color="--content-primary"><SearchIcon /></IconSlot></span></Cell>
              <Cell cap="content-brand"><span className="sc-rule__row"><IconSlot color="--content-brand"><PlusIcon /></IconSlot><IconSlot color="--content-brand"><MinusIcon /></IconSlot><IconSlot color="--content-brand"><CloseIcon /></IconSlot><IconSlot color="--content-brand"><SearchIcon /></IconSlot></span></Cell>
              <Cell cap="content-error"><span className="sc-rule__row"><IconSlot color="--content-error"><PlusIcon /></IconSlot><IconSlot color="--content-error"><MinusIcon /></IconSlot><IconSlot color="--content-error"><CloseIcon /></IconSlot><IconSlot color="--content-error"><SearchIcon /></IconSlot></span></Cell>
            </>
          }
          good={['<PlusIcon /> внутри слота Button']}
          bad={['fill: #000 в SVG', 'иконка не из набора']}
        />
        <Rule
          n={13}
          title="У icon-only кнопки есть aria-label"
          text="Подпись у кнопки без текста обязательна. Декоративные иконки скрыты от скринридеров (aria-hidden)."
          demo={
            <>
              <Cell cap='aria-label="Add"'><Button iconOnly variant="secondary" iconLeft={<PlusIcon />} aria-label="Add" /></Cell>
              <Cell cap='aria-label="Search"'><Button iconOnly variant="secondary" iconLeft={<SearchIcon />} aria-label="Search" /></Cell>
              <Cell cap='aria-label="Close"'><Button iconOnly variant="secondary" iconLeft={<CloseIcon />} aria-label="Close" /></Cell>
            </>
          }
          good={['<Button iconOnly aria-label="Add" />']}
          bad={['<Button iconOnly /> без подписи']}
        />
        <Rule
          n={14}
          title="Движение отключается по запросу системы"
          text="Анимации (вращение Spinner, ход шара Switch) выключаются при prefers-reduced-motion: reduce. В Figma Spinner статичен — вращение добавлено в коде."
          demo={
            <>
              <Cell cap="Spinner вращается"><Spinner /></Cell>
              <Cell cap="Switch — шар едет плавно"><Switch aria-label="Notifications" defaultChecked /></Cell>
              <Cap>Если в системе включено «Уменьшить движение», спиннер замирает, а шар переключается мгновенно.</Cap>
            </>
          }
          good={['@media (prefers-reduced-motion: reduce) { animation: none }']}
        />
      </Section>

      <Section title="Процесс" note="От Figma до витрины — один путь.">
        <Rule
          n={15}
          title="Код → витрина → Figma"
          text="Для новых компонентов и токенов первичен код: токены (локальные — в tools/raw/local.txt), компонент в src/components/<Имя>, экспорт из index.ts и описание на витрине. Figma догоняется пачкой по списку npm run debt. Компонент собирается из токенов, попадает в src/components/<Имя>, экспортируется из index.ts и описывается на витрине: Preview плюс Doc («Где используется / Отступы / Почему так»)."
          demo={
            <>
              <Flow steps={['Токены', 'Компонент', 'Витрина', 'Figma (пачкой)']} />
              <FormCard primaryAction={<Button size="s">Continue</Button>}>
                <TextField label="Email" placeholder="name@example.com" />
              </FormCard>
              <Cap>Так выглядит результат на витрине: компонент из токенов — с Preview и Doc на странице «Компоненты».</Cap>
            </>
          }
          good={['токены → компонент → витрина → запись в docs/FIGMA-DEBT.md (npm run debt)']}
          bad={['компонент или токен только в коде и нигде не записан']}
        />
        <Rule
          n={16}
          title="Расхождения записываем, не принимаем молча"
          text="Если в Figma чего-то не хватает или есть противоречие (нет токена, дубль в макете, нет состояния), решение не выбирается втихую: оно уходит владельцу и фиксируется как допущение."
          demo={
            <div className="sc-rule__col">
              <Cap>Так выглядят записи в «Открыто» (реальные):</Cap>
              <ul className="sc-doc__list text-body-xs">
                <li>Mega Menu: в Figma «Luxury» дважды — в демо заменён на «Import / Export».</li>
                <li>Switch: тень шара не привязана к токену — взята Elevation/Overlay/1, слабее оригинала.</li>
                <li>Spinner: в Figma статичен, в коде вращается.</li>
              </ul>
            </div>
          }
          good={['допущение в итоге волны: «Открыто»']}
          bad={['тихая подмена значения в коде']}
        />
      </Section>

      <Section title="Окна поверх страницы" note="Модальное окно перекрывает страницу — страница это показывает.">
        <Rule
          n={17}
          title="У модального окна задний экран размывается и затемняется"
          text="Всё, что открывается окном поверх страницы (подтверждение, короткая форма), ставится в компонент Modal: страница под ним размыта на 24 и затемнена чёрным 32%. Само окно — Form Card (+ Window Header с кнопкой закрытия), собранный из компонентов и токенов. Значения 24 и 32% — по решению владельца 2026-10-30, смотрим на практике."
          demo={<ModalDemo />}
          good={['<Modal open onClose>…<FormCard/>…</Modal>', 'background: var(--c-modal-scrim)', 'backdrop-filter: blur(var(--c-modal-backdrop-blur))']}
          bad={['самодельный fixed-блок с rgba(0,0,0,.5)', 'окно без затемнения и размытия']}
          note="Токены: Modal/scrim → Surface/Overlay/modal-scrim → Black/alpha-32; Modal/backdrop-blur → Blur/Modal-backdrop = 24. Заведены локально (tools/raw/local.txt), в Figma перенести по npm run debt."
        />
      </Section>
    </>
  );
}
