import { Button, Checkbox, Icon, PlusIcon, TextField, type ButtonVariant } from '../../components';
import { Doc, Preview } from './doc-kit';

/** Группа страницы «Компоненты». order — позиция, title/note — заголовок группы. */
export const meta = { order: 10, title: "Действия", note: "То, что запускает шаг или переключает режим." };

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'link'];

export default function ButtonDemo() {
  return (
    <>
      <Preview title="Button" note="Style × Size × Density; состояния — hover / active / focus / disabled">
        <div className="sc-demo sc-demo--col">
          {VARIANTS.map((v) => (
            <div key={v} className="sc-demo__row sc-demo__row--stack">
              <span className="sc-demo__tag text-caption-default sc-muted">{v}</span>
              <Button variant={v}>Continue</Button>
              <Button variant={v} iconLeft={<Icon direction="left" />}>Back</Button>
              <Button variant={v} iconRight={<Icon />}>Next</Button>
              <Button variant={v} iconOnly iconLeft={<PlusIcon />} aria-label="Add" />
              <Button variant={v} disabled>Disabled</Button>
            </div>
          ))}
          <div className="sc-demo__row sc-demo__row--stack">
            <span className="sc-demo__tag text-caption-default sc-muted">size s</span>
            <Button size="s">Small</Button>
            <Button size="s" variant="secondary" density="compact">Compact</Button>
            <Button size="s" variant="secondary" iconOnly iconLeft={<PlusIcon />} aria-label="Add" />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Главное действие шага флоу (primary), «Назад» (secondary/ghost), необратимое (destructive).',
          'Селекторы и фильтры — тот же Button в compact (отдельного Select Trigger нет).',
          'Кнопки «−/+» внутри TextField-stepper.',
        ]}
        spacing={[
          'M/S: --c-button-m|s-padding-y и padding-x, gap, icon-size.',
          'Compact: --c-button-*-padding-x-compact.',
          'Icon-only: --c-button-*-icon-padding-x/y.',
          'Внутри подписи: text-container padding-x + gap корня.',
        ]}
        why={[
          'Радиус 16 (Radius/lg) со сглаживанием углов iOS 60% — решение владельца 2026-10-30; поля и переключатели остаются pill. На mobile шкала уменьшает радиус до 12.',
          'Один компонент вместо Select Trigger / Dropdown trigger — reuse-first.',
          'Disabled через opacity-токен, а не отдельные цвета: меньше токенов, одинаково для всех стилей.',
          'Tertiary и Checkbox в Figma без focus — в коде добавлено кольцо (доступность), записано в «Открыто».',
        ]}
      />
    </>
  );
}
