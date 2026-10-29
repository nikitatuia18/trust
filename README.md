# AllTrust Design System

Дизайн-система AllTrust в коде: токены → компоненты → экраны. React + TypeScript + Vite + CSS-переменные.
Источник дизайна — Figma («02 — Tokens», «03 — Components», «06 — Icons»). Здесь — единая «правда» для разработчиков и для сборки экранов.

Figma-файлы: [Tokens](https://www.figma.com/design/Qs2FvuAGGN8aGkCDwDdXRV), [Components](https://www.figma.com/design/Yx54uaftsAx8GDb6qTxYLX), [Icons](https://www.figma.com/design/4R6K06aIr2xLc1zCJXxKRA).
Витрина: https://nikitatuia18.github.io/trust/ (токены, компоненты).

## Компоненты

`src/components/`, спеки из Figma — `specs/*.json`. Каждый компонент задокументирован на странице «Компоненты» витрины.

| Волна | Компоненты |
|---|---|
| A | Button, TextField (text, stepper), AmountField, SegmentedControl, Checkbox |
| B | Chip, Divider, TextContainer, List, ListItem |
| C | FormCard, WindowHeader, StepIndicator, OrderSummary |
| D | LogoWithBadge, BankLogo, CurrencyIcon, NetworkLogo, MethodIcon, StatusIcon (знаки: TBC, Visa, Mastercard, USD, GEL, Gram, Arbitrum; BOG и Credo — буква-заглушка) |
| E | Switch, Avatar, Logo, LanguageSelector, Spinner, EmbedPlaceholder (флаги EN, RU, GE) |
| F | HeaderBar, MegaMenu, Header, Footer (иконки меню: briefcase, buildings, ruler-pen, car, dollar-coin, global-search, bank; знаки App Store и Google Play) |
| Иконки | Icon (arrow-right, 4 направления), Plus, Minus, Close, Check, Alert, Search, Dot — контуры из «06 — Icons» |

## Экраны

`src/screens/` — страницы, собранные из компонентов без нового CSS поверх (только раскладка). Сейчас: **Регистрация** — три шага (Email → Code → Details) на каркасе `PageLayout` (Header + Footer). Витрина: вкладка «Экраны»; отдельной страницей — `#/registration`.

## Быстрый старт

```bash
npm install
npm run dev        # витрина (токены, компоненты, правила)
npm run tokens     # перегенерировать токены из tools/raw/*.txt
npm run build      # проверка типов + сборка витрины
```

## Токены

Три уровня, алиасы сохраняются цепочкой `var()`:

| Уровень | CSS-префикс | Где использовать |
|---|---|---|
| Primitives | `--prim-*` | только как цель алиасов, в компонентах — никогда |
| Semantic · Theme / Layout | `--surface-*`, `--content-*`, `--border-*`, `--focus-*`, `--space-*`, `--size-*`, `--radius-*`, `--typography-*` | в компонентах и экранах |
| Components | `--c-*` | внутри конкретного компонента |

Файлы: `tokens/*.json` (машиночитаемо), `src/styles/tokens.css` (подключается в приложение), `src/styles/typography.css` (классы `.text-<группа>-<имя>`).
Mobile-значения Layout включаются при ширине ≤ 767px или атрибутом `<html data-layout="mobile">`.

`src/styles/tokens.css`, `typography.css`, `tokens/*.json`, `src/tokens/registry.json` — **генерируются**, руками не править.
Правка токена = правка в Figma → новый экспорт в `tools/raw/` → `npm run tokens`.

## Железные правила

Коротко ниже; полный список из 16 правил с примерами «верно / неверно» — на вкладке «Правила» витрины (`src/showcase/RulesPage.tsx`).

1. Никаких сырых значений: цвет, отступ, радиус, шрифт — только токены.
2. Reuse-first: сначала существующий компонент → свойство/слот → ось существующего → новый (только с обоснованием).
3. Контролы (Button, TextField, Chip, Segmented) — pill (`--radius-round`); контейнеры — по токенам.
4. Каждая заливка имеет пару `Content/on-<роль>` с контрастом ≥ 4.5:1.
5. Disabled — только через `--opacity-disabled`.
