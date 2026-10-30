# Карта компонентов

Генерируется `npm run map` из кода и витрины; шаблоны — из `tools/component-patterns.txt`. Руками не править. Читать при сборке экрана вместо обхода папок (шаг 2 `/build-screen`).

## Шаблон макета → компонент

| В макете | Компонент | Замечание |
|---|---|---|
| кнопка действия (заливка / контур / текст) | Button | variant primary |
| кнопка только с иконкой | Button | обязателен aria-label |
| поле с подписью и подсказкой | TextField | stepper-вариант для чисел; ошибка и disabled — состояниями |
| поле суммы с валютой | AmountField |  |
| выбор из списка (страна, сеть) | TextField + List + ListItem | отдельного Select пока нет — см. registration/CountrySelect |
| код из ячеек (OTP) | — | компонента нет (локально registration/OtpInput) — предложить владельцу |
| флажок «согласен» | Checkbox |  |
| переключатель вкл/выкл | Switch |  |
| ряд вкладок / переключатель режима | SegmentedControl | size m для плотных карточек |
| пилюля-фильтр или тег-переключатель | Chip | всегда aria-pressed: для действия не подходит |
| статус «Received / Pending / Failed» | Badge | variant success |
| меню из трёх точек | DropdownMenu | иконка more из 06 — Icons |
| карточка формы / окна | FormCard (+ WindowHeader, StepIndicator) | fluid — на всю ширину колонки |
| итог операции / строки «ключ — значение» | OrderSummary |  |
| плитка метрики («0 USDT», подпись) | StatTile | иконка в IconCircle |
| иконка в круге | IconCircle |  |
| хлебные крошки | Breadcrumbs |  |
| таблица | Table | ячейки — render-функции |
| логотип банка / валюты / сети / способа оплаты | BankLogo, CurrencyIcon, NetworkLogo, MethodIcon | буквы-заглушки у BOG и Credo — осознанно |
| шапка и подвал страницы | Header, Footer (через SiteShell: PageLayout, SiteHeader, SiteFooter) | не перерисовывать по макету; без аватара и Talk to sales для вошедшего |
| разделитель | Divider |  |
| индикатор шагов | StepIndicator |  |
| загрузка | Spinner |  |
| окно поверх страницы (подтверждение, короткая форма) | Modal | свой компонент, не FormCard; слоты title/description/primaryAction/secondaryAction; фон размывается и затемняется — Правило 17 |

## Компоненты

### AmountField

Amount Field — Figma 666:163. Контейнер (не pill): радиус Amount Field/radius. Hover в Figma не заведён.

Группа витрины: Ввод данных.
Где используется: Ввод суммы в обмене/платеже: «отдаёте» и «получаете». Селектор валюты и подсказка мин. суммы — слоты.

Props:
- `error?: boolean`
- `label?: ReactNode`
- `selector?: ReactNode`
- `topSlot?: ReactNode`
- `bottomSlot?: ReactNode`
- `hint?: ReactNode`

### Avatar

Аватар пользователя (Figma 373:2094): круг 24 с фото. Фото — данные, не ассет системы.

Группа витрины: Бренд, переключатели и ожидание.

Props:
- `src?: string`
- `alt?: string`
- `name?: string`

### Badge

Плашка статуса: радиус 8 (Radius/sm) со сглаживанием, короткая подпись. Не интерактивна (кликабельная — Chip).

Группа витрины: Из экрана Account.
Где используется: Статус строки в таблице («Received» в Earnings history).

Props:
- `variant?: 'success' | 'warning' | 'error' | 'brand' | 'neutral'`

### BankLogo

Cash — Currency Icon GEL l без подложки и бейджа (как в Figma). Остальное — подложка + знак 16 + бейдж.

Группа витрины: Логотипы и статусы.
Где используется: Банк или карта в строке выбора метода оплаты (List Item, slot-left). Бейдж — валюта счёта (по умолчанию GEL).

Props:
- `name: BankName`
- `showBadge?: boolean`
- `badge?: ReactNode`
- `logo?: ReactNode`

### Breadcrumbs

Хлебные крошки: путь до текущей страницы. Последний пункт — текущая страница, остальные — ссылки.

Группа витрины: Из экрана Account.
Где используется: Верх страницы кабинета, под шапкой сайта.

Props:
- `items: BreadcrumbItem[]`

### Button

Button — Figma 91:1390. Только токены --c-button-*, семантика Focus/*, Opacity/disabled.

Группа витрины: Действия.
Где используется: Главное действие шага флоу (primary), «Назад» (secondary/ghost), необратимое (destructive). Селекторы и фильтры — тот же Button в compact (отдельного Select Trigger нет). Кнопки «−/+» внутри TextField-stepper.

Props:
- `variant?: ButtonVariant`
- `size?: 'm' | 's'`
- `density?: 'default' | 'compact'`
- `iconLeft?: ReactNode`
- `iconRight?: ReactNode`
- `iconOnly?: boolean`

### Checkbox

Круглый чекбокс (квадратного в системе нет — решение владельца). Нативный input спрятан, состояние читает CSS.

Группа витрины: Ввод данных.
Где используется: Согласие с условиями, опции анкеты верификации (1.8.x), подтверждения. Круглый индикатор выбора в списках анкеты.

Props:
- `label?: ReactNode`

### Chip

Chip — Figma 502:3270. Радиус 8 (Radius/sm) со сглаживанием. Selected = обводка + focus-эффект (как в Figma). Hover в Figma не заведён: заливка на ступень темнее (токены Chip/brand/bg-hover и Chip/neutral/bg-hover, заведены в коде).

Группа витрины: Контент и списки.
Где используется: Быстрые фильтры и пресеты: валюта, сумма, период. Подсказка мин. суммы под Amount Field (neutral s).

Props:
- `variant?: 'brand' | 'neutral'`
- `size?: 's' | 'l'`
- `selected?: boolean`
- `iconLeft?: ReactNode`
- `leadingSlot?: ReactNode`
- `trailingSlot?: ReactNode`

### CurrencyIcon

Currency Icon — Figma 690:5169. Слот Logo with Badge перекрывает размер (width/height 100%).

Группа витрины: Логотипы и статусы.
Где используется: Валюта, монета или банк в строке выбора: слот List Item, Amount Field (селектор), Method Chip. Бейдж — сеть (Gram, Arbitrum) или валюта счёта.

Props:
- `currency: 'USD' | 'GEL'`
- `size?: 'm' | 'l'`

### Divider

Divider — Figma 363:829. Ось Style (strong) в Figma идентична default — в коде не заведена.

Группа витрины: Контент и списки.
Где используется: Text Container — заголовочный блок экранов и внутренность List Item. Divider — разделитель секций и строк списка; с подписью «или».

Props:
- `orientation?: 'horizontal' | 'vertical'`
- `label?: ReactNode`

### DropdownMenu

Меню действий: кнопка с тремя точками и список (List + List Item, как у Language Selector). Закрывается по выбору, Esc и клику снаружи.

Группа витрины: Из экрана Account.
Где используется: Меню действий рядом с главной кнопкой (QR-код в кабинете).

Props:
- `items: DropdownMenuItem[]`
- `label: string`
- `align?: 'start' | 'end'`
- `placement?: 'bottom' | 'top'`
- `variant?: 'secondary' | 'ghost'`
- `size?: 'm' | 's'`

### EmbedPlaceholder

Заглушка внешнего встраиваемого блока, например iframe (Figma 669:10, 760:6168). Высота растёт по содержимому.

Группа витрины: Бренд, переключатели и ожидание.

Props:
- `size?: 'default' | 'compact'`
- `title?: string`
- `description?: string`

### Footer

Подвал сайта (Figma 600:185, Platform=desktop): бренд, ссылки, действия и ссылки на приложение. Мобильная раскладка — столбиком.

Группа витрины: Шапка и подвал.
Где используется: Подвал каждой страницы сайта: бренд и юридическая справка, навигация, главные действия, ссылки на приложение.

Props:
- `logo?: ReactNode`
- `description?: ReactNode`
- `copyright?: ReactNode`
- `linkGroups?: FooterLink[][]`
- `actions?: ReactNode`
- `appTitle?: ReactNode`
- `appLinks?: FooterAppLink[]`

### FormCard

Form Card — Figma 618:2210 (Root 522 FIXED → max-width из Size/Form-card/width). Корень без padding, зоны несут Space/2xl. Обводка корня — настоящая граница (в Figma INSIDE, места не занимает): так отступ от неё до содержимого одинаков со всех сторон и равен отступу у разделителей.

Группа витрины: Каркас окна и шаги.
Где используется: Любая форма на экране: вход, ввод данных, подтверждение. Внутри — Segmented Control, поля, кнопки, Divider «или».

Props:
- `actions?: 'stacked' | 'inline'`
- `header?: ReactNode`
- `primaryAction?: ReactNode`
- `secondaryAction?: ReactNode`
- `altActions?: ReactNode`
- `dividerLabel?: ReactNode`
- `fluid?: boolean`

### Header

Шапка сайта (Figma 464:3830): Header Bar и под ним Mega Menu, которая накрывает страницу, а не сдвигает её.

Группа витрины: Каркас окна и шаги.
Где используется: Window Header — верх каждого окна флоу: назад, заголовок, закрыть. Step Indicator — прогресс верификации; compact внутри шапки, labeled — на широких экранах.

Props:
- `menu?: MegaMenuItem[][]`
- `open?: boolean`
- `onClose?: () => void`

### HeaderBar

Базовая полоса шапки (Figma 391:1447): логотип, навигация, кнопки. Содержимое — слоты; внутри Header.

Группа витрины: Шапка и подвал.
Где используется: Header — верх каждой страницы сайта; Header Bar — сама полоса (логотип, навигация, кнопки). Mega Menu — список услуг под полосой: раскрывается из пункта навигации.

Props:
- `logo?: ReactNode`
- `modeSwitch?: ReactNode`
- `links?: ReactNode`
- `actions?: ReactNode`

### Icon

Иконка-прототип: Figma «06 — Icons», arrow-right, Property 1=outline (43:13880). Размер — от слота, цвет — currentColor.

Группа витрины: Из экрана Account.
Где используется: Левый слот ListItem в меню кабинета; строка «My referral link».

Props:
- `direction?: IconDirection`

### IconCircle

Круг с иконкой для строк списков (пункты меню, строка со ссылкой). Размер — Size/xl, иконка — Size/icon/md.

Группа витрины: Из экрана Account.
Где используется: Левый слот ListItem в меню кабинета; строка «My referral link».

Props:
- `tone?: 'subtle' | 'brand'`

### LanguageSelector

Выбор языка (Figma 377:3689): кнопка с глобусом и кодом + выпадающий список. Закрывается по выбору, Esc и клику снаружи.

Группа витрины: Бренд, переключатели и ожидание.

Props:
- `value: string`
- `onChange: (code: string) => void`
- `languages?: Language[]`
- `open?: boolean`

### List

List — Figma 464:3379. card: фон, обводка, радиус; list: без подложки (радиус в Figma не задан).

Группа витрины: Контент и списки.
Где используется: Выбор из вариантов (страна, документ, метод) и строки данных. Список шагов/результатов проверки.

Props:
- `variant?: 'card' | 'list'`

### ListItem

List Item — Figma 373:1842. Hover/active/selected — через фон и (у card) обводку. Disabled — opacity.

Группа витрины: Контент и списки.
Где используется: Выбор из вариантов (страна, документ, метод) и строки данных. Список шагов/результатов проверки.

Props:
- `size?: 'large' | 'small'`
- `variant?: 'list' | 'card'`
- `selected?: boolean`
- `disabled?: boolean`
- `showDivider?: boolean`
- `leftSlot?: ReactNode`
- `centerSlot?: ReactNode`
- `rightSlot?: ReactNode`
- `title?: ReactNode`
- `subtitle?: ReactNode`
- `description?: ReactNode`
- `caption?: ReactNode`
- `onClick?: () => void`

### Logo

Логотип AllTrust (Figma 354:2882): знак и вордмарк. Бренд-арт вне токенов, цвета зашиты в SVG.

Группа витрины: Логотипы и статусы.
Где используется: Валюта, монета или банк в строке выбора: слот List Item, Amount Field (селектор), Method Chip. Бейдж — сеть (Gram, Arbitrum) или валюта счёта.

Props:
- `label?: string`

### LogoWithBadge

Logo with Badge — Figma 691:99. Бейдж — абсолютная обёртка справа снизу, 16 на всех размерах.

Группа витрины: Логотипы и статусы.
Где используется: Валюта, монета или банк в строке выбора: слот List Item, Amount Field (селектор), Method Chip. Бейдж — сеть (Gram, Arbitrum) или валюта счёта.

Props:
- `size?: 's' | 'm' | 'l'`
- `main: ReactNode`
- `badge?: ReactNode`

### MegaMenu

Выпадающая панель шапки (Figma 420:1598): столбцы списков услуг под Header Bar.

Группа витрины: Шапка и подвал.
Где используется: Header — верх каждой страницы сайта; Header Bar — сама полоса (логотип, навигация, кнопки). Mega Menu — список услуг под полосой: раскрывается из пункта навигации.

Props:
- `columns: MegaMenuItem[][]`

### MethodIcon

Круг-иконка способа оплаты (Figma 693:77): bank = brand, cash = success, crypto = warning.

Группа витрины: Логотипы и статусы.
Где используется: Method Icon — способ оплаты: банк, наличные, крипта (строки выбора, Method Chip). Status Icon — итог операции в шапке результата (успех или ошибка), над Text Container.

Props:
- `kind: 'bank' | 'cash' | 'crypto'`

### Modal

Модальное окно: страница под ним размывается и слегка затемняется, фокус остаётся внутри, Esc закрывает. Окно — свой компонент (не Form Card): по центру заголовок и пояснение, поля сверху и снизу крупнее (Space/5xl), два действия в ряд. Для подтверждений, коротких форм и сообщений, которые требуют ответа до возврата на страницу.

Группа витрины: Каркас окна и шаги.
Где используется: Подтверждение необратимого действия (блокировка аккаунта, выход), короткая форма или сообщение, на которое нужен ответ до возврата на страницу. Окно — собственный компонент, не Form Card: заголовок и пояснение по центру, два действия в ряд, над заголовком место под иллюстрацию (слот illustration, сами иллюстрации позже). Крестика нет — закрывает «Cancel», Esc или клик по затемнению. Для широких форм и потоков — отдельная страница, не модалка.

Props:
- `open: boolean`
- `onClose: () => void`
- `illustration?: ReactNode`
- `title: ReactNode`
- `description?: ReactNode`
- `primaryAction?: ReactNode`
- `secondaryAction?: ReactNode`

### NetworkLogo

Network Logo — Figma 691:23 / 691:24. Размер по умолчанию — Size/Icon/xs; слот бейджа (Logo with Badge) перекрывает его.

Группа витрины: Логотипы и статусы.
Где используется: Валюта, монета или банк в строке выбора: слот List Item, Amount Field (селектор), Method Chip. Бейдж — сеть (Gram, Arbitrum) или валюта счёта.

Props:
- `network: 'gram' | 'arbitrum'`

### OrderSummary

Order Summary — Figma 667:291. Корень без padding и фона, карточка — Summary/card/*.

Группа витрины: Каркас окна и шаги.
Где используется: Итог перед оплатой: сумма, комиссии, итого. Свёрнутый вид — на мобильном, чтобы не занимать экран.

Props:
- `title?: ReactNode`
- `defaultExpanded?: boolean`
- `expanded?: boolean`
- `onExpandedChange?: (expanded: boolean) => void`
- `showHeader?: boolean`
- `chevron?: ReactNode`

### SegmentedControl

Segmented Control + Segment Item — Figma 377:3955. Токены --c-segment-control-*, --c-segment-item-*.

Группа витрины: Ввод данных.
Где используется: Переключение режима в рамках одного экрана: способ оплаты, период, вид. Не навигация между страницами.

Props:
- `options: SegmentedOption<T>[]`
- `value: T`
- `onChange: (value: T) => void`
- `size?: 's' | 'm'`

### Spinner

Индикатор загрузки (Figma 669:4): кольцо-трек + дуга. Размер — Status/icon/size; в Figma статичен, вращение добавлено в коде.

Группа витрины: Бренд, переключатели и ожидание.

Props:
- `label?: string`

### StatTile

Плитка показателя: иконка, крупное значение и подпись, по центру. Плитки в ряду делят ширину поровну.

Группа витрины: Из экрана Account.
Где используется: Показатели в карточке Earnings.

Props:
- `icon?: ReactNode`
- `value: ReactNode`
- `label: ReactNode`

### StatusIcon

Итог операции (Figma 692:5460): halo 64 + круг-глиф 48 с галочкой или крестом.

Группа витрины: Логотипы и статусы.
Где используется: Method Icon — способ оплаты: банк, наличные, крипта (строки выбора, Method Chip). Status Icon — итог операции в шапке результата (успех или ошибка), над Text Container.

Props:
- `type: 'success' | 'failed'`
- `label?: string`

### StepIndicator

Step Indicator — Figma 655:165. Статус шага (done/current/pending/error) задаёт цвет маркера через data-status.

Группа витрины: Каркас окна и шаги.
Где используется: Window Header — верх каждого окна флоу: назад, заголовок, закрыть. Step Indicator — прогресс верификации; compact внутри шапки, labeled — на широких экранах.

Props:
- `step: number`
- `state?: 'default' | 'error'`
- `layout?: 'compact' | 'labeled'`
- `labels: string[]`

### Switch

Переключатель вкл/выкл (Figma-ось Checked = checked). Нативный input спрятан, состояние читает CSS; подпись — aria-label.

Группа витрины: Бренд, переключатели и ожидание.

### Table

Таблица данных: заголовок secondary, строки разделены линиями, ширина колонок — по содержимому, одна колонка растягивается. На узком экране прокручивается по горизонтали.

Группа витрины: Из экрана Account.
Где используется: Earnings history в кабинете.

Props:
- `columns: TableColumn<T>[]`
- `rows: T[]`
- `rowKey: (row: T) => Key`
- `caption?: string`

### TextContainer

Text Container — Figma 372:1700. Цвета в Figma — токены List Item/* (у 2xlarge — Text Container/2xlarge/*).

Группа витрины: Контент и списки.
Где используется: Text Container — заголовочный блок экранов и внутренность List Item. Divider — разделитель секций и строк списка; с подписью «или».

Props:
- `align?: 'left' | 'center' | 'right'`
- `size?: 'default' | 'large' | 'xlarge' | '2xlarge'`
- `title?: ReactNode`
- `subtitle?: ReactNode`
- `description?: ReactNode`
- `caption?: ReactNode`

### TextField

TextField — Figma 572:729. Токены --c-input-*; отступы атомов — напрямую Space/*, Size/* (решение владельца).

Группа витрины: Ввод данных.
Где используется: Поля анкеты верификации (имя, e-mail, адрес), поиск. Stepper — числовые значения с шагом (количество, сумма шагами). Password — смена пароля в кабинете (Account / Security): текущий, новый, повтор.

Props:
- `type?: 'text' | 'stepper' | 'password'`
- `revealed?: boolean`
- `onRevealedChange?: (revealed: boolean) => void`
- `validation?: 'none' | 'error' | 'success'`
- `label?: ReactNode`
- `description?: ReactNode`
- `hint?: ReactNode`
- `leftSlot?: ReactNode`
- `rightSlot?: ReactNode`

### WindowHeader

Window Header — Figma 656:17. Строка: слот 40 · заголовок по центру · слот 40; снизу тонкая линия.

Группа витрины: Каркас окна и шаги.
Где используется: Window Header — верх каждого окна флоу: назад, заголовок, закрыть. Step Indicator — прогресс верификации; compact внутри шапки, labeled — на широких экранах.

Props:
- `title?: ReactNode`
- `leftAction?: ReactNode`
- `rightAction?: ReactNode`
- `stepIndicator?: ReactNode`
