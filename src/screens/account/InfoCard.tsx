import type { ReactNode } from 'react';
import { FormCard } from '../../components';

/** Карточка-подсказка: брендовая иконка, заголовок и пояснение. Кандидат в компонент, если повторится на других экранах. */
export function InfoCard({ icon, title, children }: { icon: ReactNode; title: ReactNode; children: ReactNode }) {
  return (
    <FormCard fluid>
      <span className="scr-info__icon" aria-hidden="true">{icon}</span>
      <div className="scr-info__text">
        <h3 className="scr-info__title text-heading-h4">{title}</h3>
        <p className="scr-info__body text-body-sm">{children}</p>
      </div>
    </FormCard>
  );
}
