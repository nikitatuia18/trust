# Долг перед Figma

Генерируется `npm run debt`. Код первичен для новых компонентов и токенов; раз в несколько экранов всё это переносится в Figma одной пачкой (`use_figma`), строки из `tools/raw/local.txt` — в основные raw после следующего экспорта.

## Локальные токены (21)

| Секция | Токен | Тип | Значение |
|---|---|---|---|
| Theme | `Surface/Overlay/modal-scrim` | C | `@Primitives:Colors/Black/alpha-8` |
| Layout | `Blur/Modal-backdrop` | F | `16` |
| Layout | `Corner/Superellipse` | F | `1.5` |
| Layout | `Size/QR-code/width` | F | `180` |
| Layout | `Size/Account-menu/width` | F | `388` |
| Components | `Chip/brand/bg-hover` | C | `@T:Surface/Brand/subtle-hover` |
| Components | `Chip/neutral/bg-hover` | C | `@T:Surface/Neutral/hover` |
| Components | `Modal/scrim` | C | `@T:Surface/Overlay/modal-scrim` |
| Components | `Modal/backdrop-blur` | F | `@L:Blur/Modal-backdrop` |
| Components | `Modal/padding` | F | `@L:Space/xl` |
| Components | `Modal/bg` | C | `@T:Surface/Neutral/base` |
| Components | `Modal/border` | C | `@T:Border/Neutral/default` |
| Components | `Modal/stroke` | F | `@L:Stroke/default` |
| Components | `Modal/radius` | F | `@L:Radius/2xl` |
| Components | `Modal/max-width` | F | `@L:Size/Form-card/width` |
| Components | `Modal/zone-padding` | F | `@L:Space/2xl` |
| Components | `Modal/edge-padding` | F | `@L:Space/5xl` |
| Components | `Modal/header-gap` | F | `@L:Space/sm` |
| Components | `Modal/actions-gap` | F | `@L:Space/sm` |
| Components | `Modal/body-gap` | F | `@L:Space/xl` |
| Components | `Form Card/header-padding-y` | F | `@L:Space/2xl` |

## Компоненты без компонентных токенов `--c-*` (11)

Эвристика по именам групп в `tools/raw/components.txt`: Icon, Logo, Spinner и обёртки (HeaderBar, MegaMenu — часть группы Header) могут не требовать своих токенов.

- Badge
- Breadcrumbs
- HeaderBar
- Icon
- IconCircle
- Logo
- MegaMenu
- Modal
- Spinner
- StatTile
- Table
