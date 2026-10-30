# AllTrust design system (`trust`)

React 19 + TypeScript + Vite + чистый CSS с переменными. Токены → компоненты → экраны. Витрина: https://nikitatuia18.github.io/trust/ (вкладки Токены / Компоненты / Правила / Экраны).

Общаемся по-русски. Владелец пишет коротко: «Делаем след волну», «продолжить», ссылка на макет — этого достаточно.

## Закон сборки экранов

Экран собирается **только из компонентов `src/components` и токенов `src/styles`**. Макет Figma даёт только вид (что где стоит) и логику (состояния, действия). Цвета, радиусы, размеры, иконки, состав компонентов — всегда из системы; заглушки и устаревшие значения макета не копируем. Нужного нет → сначала предложить владельцу новый компонент/токен, а не верстать одноразово. Не придумывать тексты, пункты меню, действия — явная заглушка и вопрос.

Сборка экрана — команда `/build-screen <ссылка на кадр> <смысл>`. Новый компонент — `/new-component`.

## Железные правила (полный список — `src/showcase/RulesPage.tsx`, прочитать перед экраном)

1. Никаких сырых значений: цвет, отступ, радиус, шрифт — только токены. В компонентах нет `--prim-*`.
2. Три уровня токенов: Primitives → Semantic (`--surface-*`, `--content-*`, `--space-*`…) → Components (`--c-*`).
3. Сгенерированное руками не правим: `src/styles/tokens.css`, `typography.css`, `tokens/*.json`, `src/tokens/registry.json`.
4. Текст — классами типографики `.text-<группа>-<имя>`.
5. Заливка → пара `Content/on-<роль>`; disabled — только `--opacity-disabled`.
6. Reuse-first: существующий компонент → свойство/слот → ось существующего → новый (с обоснованием).
7. Контролы — pill (`--radius-round`); состояния через data-атрибуты; focus виден всегда; icon-only кнопка имеет `aria-label`; иконки — контуры из «06 — Icons».
8. Расхождения (макет/Figma/код) записываем и сообщаем владельцу, не принимаем молча.

Осознанные исключения (не пересматривать): контраст on-brand/on-success/crypto, подсказка в поле = Content/tertiary, ширина столбца Mega Menu 298. Они перечислены на странице «Правила».

## Команды

```
npm run dev       # витрина
npm run build     # tsc --noEmit + vite build — обязательно перед коммитом
npm run tokens    # tools/raw/*.txt → tokens/*.json + src/styles/tokens.css + src/tokens/registry.json
```

## Новые токены

Нужного семантического токена нет → заводим (не берём примитив, не пишем сырое). Текущий порядок: Figma «02 — Tokens» (`use_figma`) → строки в `tools/raw/*.txt` → `npm run tokens`. Только в raw нельзя: следующий экспорт из Figma их сотрёт.

## Каркас и структура

- `src/components/<Name>/<Name>.tsx|css`, экспорт в `src/components/index.ts`; витрина — `src/showcase/ComponentsPage.tsx` (Preview + Doc: «Где используется / Отступы (токены) / Почему так»).
- `src/screens/` — каркас `SiteShell.tsx` (`PageLayout`, `SiteHeader`, `SiteFooter`) берётся оттуда; экран = папка `src/screens/<name>/` (данные в `<name>Data.ts`, колбэки `onXxx`, props вместо логики бэкенда), страница `#/<name>`, запись во вкладке «Экраны».
- Шапка только системная (Individual | Business, Resources, Contacts, язык); аватара в шапке нет.

## Проверка перед отчётом

`npm run build` → скриншот десктопа → mobile 390px через `<iframe style="width:390px">` (headless Edge не уже ~492px) и средняя ширина ~1100 → поиск сырых значений в новом CSS (`px` кроме 0, `#hex`, `rgb(`, `--prim-`). Python в системе нет — скрипты на node. В Bash не смешивать длинные heredoc с `node -e '…'`; файлы — через Write.

## Коммит и пуш

Сразу после готовой работы и зелёного `npm run build`, без вопроса, в `main`. Сообщение `Wave X: …` (для остального — короткое описание), в конце строка Co-Authored-By. Деплой GitHub Pages сам (~1–2 мин, кеш 10 мин → Ctrl+Shift+R); проверка: `curl https://api.github.com/repos/nikitatuia18/trust/actions/runs` (gh нет).

## Куда смотреть

- `PLAN.md` — статус, следующий шаг, вопросы к разработчикам.
- `docs/SCREEN-BUILD-ERRORS.md` — журнал ошибок сборки экранов (читать перед экраном; повторившаяся ошибка → правило в skill или check).
- `docs/PROMPT-BUILD-SCREEN.md` — исходный текст промта (рабочая версия — skill `build-screen`).
- Figma: Tokens `Qs2FvuAGGN8aGkCDwDdXRV`, Components `Yx54uaftsAx8GDb6qTxYLX`, Icons `4R6K06aIr2xLc1zCJXxKRA`. Code Connect не нужен.
- Решения владельца и контекст прошлых сессий — в памяти ассистента (`MEMORY.md`).
