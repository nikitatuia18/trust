import type { ReactNode } from 'react';

type RuleProps = {
  n: number;
  title: string;
  text: string;
  good?: string[];
  bad?: string[];
  note?: string;
};

function Rule({ n, title, text, good, bad, note }: RuleProps) {
  return (
    <section className="sc-card sc-rule">
      <header className="sc-card__head">
        <span className="text-caption-default sc-muted">Правило {n}</span>
        <h3 className="text-label-lg">{title}</h3>
      </header>
      <p className="text-body-sm sc-muted">{text}</p>
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
      <div className="sc-bento">{children}</div>
    </>
  );
}

export function RulesPage() {
  return (
    <>
      <div className="sc-intro">
        <h1 className="text-heading-h1">Правила</h1>
        <p className="text-body-lg sc-muted">
          Что соблюдаем при работе с системой — в Figma, в компонентах и на экранах. Правила взяты из того, как уже устроен код;
          там, где есть исключения, они названы прямо в карточке и перечислены в списке «Открыто».
        </p>
      </div>

      <Section title="Токены" note="Единственный источник значений — токены из Figma.">
        <Rule
          n={1}
          title="Никаких сырых значений"
          text="Цвет, отступ, размер, радиус, шрифт — только токены. Нужного токена нет — сначала он появляется в Figma."
          good={['padding: var(--space-lg)', 'border-radius: var(--radius-round)']}
          bad={['padding: 12px', 'color: #1a1a1a']}
          note="Исключения сейчас: ширина столбца Mega Menu (298px, токена нет); значения в @media (var() там не работает); 1px у скрытого текста StepIndicator."
        />
        <Rule
          n={2}
          title="Три уровня токенов"
          text="Primitives — только цель алиасов. Semantic (Theme / Layout) — в компонентах и на экранах. Components (--c-*) — внутри своего компонента."
          good={['var(--surface-brand-default)', 'var(--c-button-m-padding-x)']}
          bad={['var(--prim-spacing-400)']}
          note="Исключение: Checkbox берёт размеры бокса и галочки из примитивов --prim-spacing-450 и 400 — семантического токена размера под них нет."
        />
        <Rule
          n={3}
          title="Сгенерированное руками не правим"
          text="tokens.css, typography.css, tokens/*.json и registry.json генерируются. Правка токена = правка в Figma, новый экспорт в tools/raw, затем скрипт."
          good={['npm run tokens']}
          bad={['правка src/styles/tokens.css']}
        />
        <Rule
          n={4}
          title="Текст — классами типографики"
          text="Размер, вес и межстрочный задаются классом .text-<группа>-<имя> или токенами --typography-*. Свои комбинации не собираем."
          good={['className="text-label-md"', 'font-size: var(--typography-font-size-xs)']}
          bad={['font-size: 14px']}
        />
      </Section>

      <Section title="Цвет" note="Цвет — это роль, а не оттенок.">
        <Rule
          n={5}
          title="У каждой заливки есть пара Content/on-<роль>"
          text="Контраст текста или иконки на заливке не ниже 4.5:1. Проверка по всем парам — на странице «Токены», блок «Контраст»."
          good={['surface-brand-default + content-on-brand']}
          note="Известное исключение: crypto в Method Icon — контраст 2.98, оставлено владельцем."
        />
        <Rule
          n={6}
          title="Disabled — только через opacity-токен"
          text="Отдельных «серых» цветов для недоступного состояния нет: элемент остаётся в своих цветах и тускнеет одним токеном. Так одинаково у всех стилей и ролей."
          good={['opacity: var(--opacity-disabled)']}
          bad={['color: #999', 'opacity: 0.4']}
        />
      </Section>

      <Section title="Компоненты" note="Сначала переиспользуем, новое — только с обоснованием.">
        <Rule
          n={7}
          title="Reuse-first"
          text="Порядок решения: существующий компонент → его свойство или слот → ось существующего → новый компонент (только с обоснованием). Новый без Doc на витрине не считается готовым."
          good={['Селектор = Button в density compact']}
          bad={['отдельный Select Trigger, повторяющий Button']}
        />
        <Rule
          n={8}
          title="Форма: контролы — pill"
          text="Button, TextField, Chip, SegmentedControl — полностью скруглены. Контейнеры (карточки, окна, меню) — радиусами по своим токенам."
          good={['control: var(--radius-round)']}
          bad={['радиус контрола задан числом']}
        />
        <Rule
          n={9}
          title="Состояния — через data-атрибуты"
          text="Вариант, размер, состояние — атрибуты на корне, а не набор модификаторных классов. Так состояние видно и в разметке, и в тестах."
          good={[".at-button[data-variant='link']", 'data-size, data-disabled, data-selected']}
          bad={['.at-button--link-hover-big']}
        />
        <Rule
          n={10}
          title="Focus виден всегда"
          text="Через :focus-visible: обводка Focus/<роль>/border плюс кольцо effect. У destructive роль error. Если в Figma у компонента нет focus, кольцо добавляем в код по образцу Button и Checkbox."
          good={['.at-button:focus-visible { … var(--focus-brand-ring) }']}
          bad={['outline: none без замены']}
          note="Так добавлено для Tertiary и Checkbox — записано в «Открыто»."
        />
        <Rule
          n={11}
          title="Размер и плотность — оси компонента"
          text="Size (m / s) и Density (default / compact) — свойства компонента, а не локальные переопределения отступов. Mobile-значения приходят из токенов Layout (ширина до 767px или data-layout=mobile)."
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
          good={['<PlusIcon /> внутри слота Button']}
          bad={['fill: #000 в SVG', 'иконка не из набора']}
        />
        <Rule
          n={13}
          title="У icon-only кнопки есть aria-label"
          text="Подпись у кнопки без текста обязательна. Декоративные иконки скрыты от скринридеров (aria-hidden)."
          good={['<Button iconOnly aria-label="Add" />']}
          bad={['<Button iconOnly /> без подписи']}
        />
        <Rule
          n={14}
          title="Движение отключается по запросу системы"
          text="Анимации (вращение Spinner, ход шара Switch) выключаются при prefers-reduced-motion: reduce. В Figma Spinner статичен — вращение добавлено в коде."
          good={['@media (prefers-reduced-motion: reduce) { animation: none }']}
        />
      </Section>

      <Section title="Процесс" note="От Figma до витрины — один путь.">
        <Rule
          n={15}
          title="Figma → компонент → витрина"
          text="Источник — Figma. Компонент собирается из токенов, попадает в src/components/<Имя>, экспортируется из index.ts и описывается на витрине: Preview плюс Doc («Где используется / Отступы / Почему так»)."
          good={['Figma → токены → компонент → витрина']}
          bad={['компонент в коде, которого нет в Figma, без записи в «Открыто»']}
        />
        <Rule
          n={16}
          title="Расхождения записываем, не принимаем молча"
          text="Если в Figma чего-то не хватает или есть противоречие (нет токена, дубль в макете, нет состояния), решение не выбирается втихую: оно уходит владельцу и фиксируется как допущение."
          good={['допущение в итоге волны: «Открыто»']}
          bad={['тихая подмена значения в коде']}
        />
      </Section>
    </>
  );
}
