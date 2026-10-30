# Долг перед Figma

Генерируется `npm run debt`. Код первичен для новых компонентов и токенов; раз в несколько экранов всё это переносится в Figma одной пачкой (`use_figma`), строки из `tools/raw/local.txt` — в основные raw после следующего экспорта.

## Локальные токены (4)

| Секция | Токен | Тип | Значение |
|---|---|---|---|
| Layout | `Size/QR-code/width` | F | `180` |
| Layout | `Size/Account-menu/width` | F | `388` |
| Components | `Chip/brand/bg-hover` | C | `@T:Surface/Brand/subtle-hover` |
| Components | `Chip/neutral/bg-hover` | C | `@T:Surface/Neutral/hover` |

## Компоненты без компонентных токенов `--c-*` (10)

Эвристика по именам групп в `tools/raw/components.txt`: Icon, Logo, Spinner и обёртки (HeaderBar, MegaMenu — часть группы Header) могут не требовать своих токенов.

- Badge
- Breadcrumbs
- HeaderBar
- Icon
- IconCircle
- Logo
- MegaMenu
- Spinner
- StatTile
- Table
