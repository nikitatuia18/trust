import type { ComponentType } from 'react';
import { Group } from './components/doc-kit';

type GroupMeta = { order: number; title: string; note: string };
type GroupModule = { meta: GroupMeta; default: ComponentType };

// Группы страницы — файлы src/showcase/components/*.group.tsx (экспортируют meta и компонент по умолчанию).
// Новый компонент добавляется Preview + Doc в подходящую группу (npm run new:component делает это сам).
const groups = Object.values(import.meta.glob<GroupModule>('./components/*.group.tsx', { eager: true }))
  .sort((a, b) => a.meta.order - b.meta.order);

export function ComponentsPage() {
  return (
    <>
      <div className="sc-intro">
        <h1 className="text-heading-h1">Компоненты</h1>
        <p className="text-body-lg sc-muted">
          Волны A–F: самое нужное для флоу верификации. Всё стилизовано только токенами, состояния — через data-атрибуты.
          Иконки взяты из «06 — Icons» (outline): стрелки и шевроны — arrow-right, плюс — add, минус — minus, крестик — close-circle, поиск — search-normal, точка — record; галочка и «!» — внутренние глифы tick-circle и info-circle (простых без круга в наборе нет).
        </p>
      </div>
      {groups.map(({ meta, default: Demo }) => (
        <Group key={meta.title} title={meta.title} note={meta.note}>
          <Demo />
        </Group>
      ))}
    </>
  );
}
