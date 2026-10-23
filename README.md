# AllTrust Design System

Дизайн-система AllTrust в коде: токены → компоненты → экраны. React + TypeScript + Vite + CSS-переменные.
Источник дизайна — Figma («02 — Tokens», «03 — Components», «06 — Icons»). Здесь — единая «правда» для разработчиков и для сборки экранов.

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

1. Никаких сырых значений: цвет, отступ, радиус, шрифт — только токены.
2. Reuse-first: сначала существующий компонент → свойство/слот → ось существующего → новый (только с обоснованием).
3. Контролы (Button, TextField, Chip, Segmented) — pill (`--radius-round`); контейнеры — по токенам.
4. Каждая заливка имеет пару `Content/on-<роль>` с контрастом ≥ 4.5:1.
5. Disabled — только через `--opacity-disabled`.
