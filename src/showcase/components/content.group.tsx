import { useState } from 'react';
import { Chip, Divider, List, ListItem, Icon, CloseIcon, DotIcon, TextContainer } from '../../components';
import { Doc, Preview } from './doc-kit';

/** Группа страницы «Компоненты». order — позиция, title/note — заголовок группы. */
export const meta = { order: 30, title: "Контент и списки", note: "Чипы, текст, разделители, списки выбора." };

export default function ContentDemo() {
  const [chip, setChip] = useState<string[]>(['eur']);
  const [row, setRow] = useState('a');
  const toggle = (id: string) => setChip((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const dot = <DotIcon />;
  return (
    <>
      <Preview title="Chip" note="Style: brand | neutral · Size: s | l · Selected · with-slots">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">brand s</span>
            {['usd', 'eur', 'gbp'].map((id) => (
              <Chip key={id} selected={chip.includes(id)} onClick={() => toggle(id)}>{id.toUpperCase()}</Chip>
            ))}
            <Chip disabled>Disabled</Chip>
            <Chip>Action (no selected)</Chip>
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">neutral s</span>
            <Chip variant="neutral">Min 10 USD</Chip>
            <Chip variant="neutral" selected>Selected</Chip>
            <Chip variant="neutral" iconLeft={dot}>With icon</Chip>
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">size l</span>
            <Chip size="l">Large</Chip>
            <Chip size="l" variant="neutral" iconLeft={dot}>Large icon</Chip>
            <Chip leadingSlot={dot} trailingSlot={<CloseIcon />}>With slots</Chip>
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Быстрые фильтры и пресеты: валюта, сумма, период.',
          'Подсказка мин. суммы под Amount Field (neutral s).',
        ]}
        spacing={[
          'S: --c-chip-s-padding-x/y, gap, text-container padding-x.',
          'L: --c-chip-l-padding, min-height, icon-size.',
          'With-slots: токены Chip/M/* (зазор 0).',
        ]}
        why={[
          'Pill, как все контролы выбора.',
          'Selected: обводка + focus-эффект (как в Figma). Hover: заливка на ступень темнее (Chip/*/bg-hover) — в Figma не заведён, добавлено в коде.',
          'aria-pressed есть, только когда передан selected (чип-переключатель). Без selected чип — кнопка-действие: открывает ссылку или подсказку.',
        ]}
      />
      <Preview title="Divider + Text Container" note="Orientation: horizontal | vertical · Alignment × Size">
        <div className="sc-demo sc-demo--col">
          <TextContainer title="Title" subtitle="Subtitle" description="Description under the title" caption="Caption" />
          <Divider />
          <Divider label="or" />
          <TextContainer align="center" size="large" title="Large centered" description="Description" />
          <TextContainer align="right" size="xlarge" title="XLarge right" />
          <TextContainer align="center" size="2xlarge" title="Heading" subtitle="Subheading" />
        </div>
      </Preview>
      <Doc
        where={[
          'Text Container — заголовочный блок экранов и внутренность List Item.',
          'Divider — разделитель секций и строк списка; с подписью «или».',
        ]}
        spacing={[
          'Text Container: gap по умолчанию 0, 2xlarge — --c-text-container-2xlarge-gap.',
          'Divider: толщина --c-divider-stroke, подпись — Space/xl по бокам.',
        ]}
        why={[
          'Один текстовый блок вместо ручных связок заголовок+подпись.',
          'Style=strong у Divider в Figma не отличается от default — в код не вынесен.',
          'Цвета Text Container берутся из токенов List Item (так собрано в Figma) — в «Открыто».',
        ]}
      />
      <Preview title="List + List Item" note="List: card | list · Item: Size × Style × Selected · hover / active / disabled">
        <div className="sc-demo sc-demo--grid">
          <List variant="card">
            {['a', 'b', 'c'].map((id, i) => (
              <ListItem
                key={id}
                showDivider={i > 0}
                selected={row === id}
                onClick={() => setRow(id)}
                leftSlot={dot}
                title={`Option ${id.toUpperCase()}`}
                subtitle="Subtitle"
                rightSlot={<Icon />}
              />
            ))}
            <ListItem disabled showDivider title="Disabled" subtitle="Not available" />
          </List>
          <List variant="list">
            <ListItem variant="list" size="small" showDivider={false} title="Small row" rightSlot={<Icon />} />
            <ListItem variant="list" size="small" title="Small row" rightSlot={<Icon />} />
            <ListItem variant="card" size="small" showDivider={false} selected title="Card item, selected" />
          </List>
        </div>
      </Preview>
      <Doc
        where={[
          'Выбор из вариантов (страна, документ, метод) и строки данных.',
          'Список шагов/результатов проверки.',
        ]}
        spacing={[
          'List: --c-list-padding-x/y, gap, radius (только card).',
          'Item: --c-list-item-main-container-padding-x/y; у card боковые — Space/xl (как в Figma), а если слева слот (круг-иконка, логотип) — слева те же Space/sm, что сверху: слот стоит на равных отступах от края.',
          'Слоты: gap --c-list-item-item-content-gap, высота слота — Size/lg (large) или Size/md (small).',
        ]}
        why={[
          'Слоты left/center/right вместо отдельных типов строк — reuse-first.',
          'Selected: фон, у card ещё и обводка brand.',
          'Если передан onClick — строка становится кнопкой (hover/active/focus).',
        ]}
      />
    </>
  );
}
