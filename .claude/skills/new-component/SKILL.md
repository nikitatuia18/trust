---
name: new-component
description: Добавить новый компонент в дизайн-систему trust (токены, код, витрина). Вызов: /new-component <название> <зачем нужен>. Применять только после согласия владельца на компонент.
---

Аргументы: `$ARGUMENTS`. Работай по-русски.

## Перед началом
Reuse-first: существующий компонент → свойство/слот → ось существующего → новый. Показать владельцу обоснование: что это, где ещё пригодится, почему не подходят существующие. Ось добавлять только если она есть в Figma «03 — Components».

## Маршрут
1. **Токены (код первичен).** Нужен семантический токен, которого нет → завести в `tools/raw/local.txt` (не примитив, не сырое значение) → `npm run tokens`. Компонентные `--c-*` — секция `## Components`, алиасы на семантику. В Figma не заводим сейчас — это пачкой по `npm run debt`.
2. **Заготовка.** `npm run new:component -- Name --group=<группа>` (группы — `src/showcase/components/*.group.tsx`): создаёт `src/components/<Name>/<Name>.tsx|css`, экспорт в `index.ts` и блок Preview + Doc в группе. Дальше заполнить: props, CSS только на токенах; состояния — data-атрибуты; focus по образцу Checkbox/Button; disabled через `--opacity-disabled`; icon-only → `aria-label`; reuse (Button, List, ListItem, Divider…).
3. **Витрина.** Заполнить TODO в блоке Preview/Doc («Где используется / Отступы (токены) / Почему так»), строка в таблице волн README. Если компонент — шаблон из макета, добавить строку в `tools/component-patterns.txt`.
4. **Проверка.** `npm run build`; `npm run check`; `npm run shots -- components` и посмотреть PNG (mobile 390 — там же).
5. **Фиксация.** `npm run debt` и `npm run map` обновляют `docs/FIGMA-DEBT.md` и `docs/COMPONENT-MAP.md` (закоммитить). Коммит и пуш сразу.

## Итог владельцу
Список вошедшего + явный список решений и допущений («Открыто»).
