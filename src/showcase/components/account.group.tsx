import { Button, Chip, List, ListItem, Icon, Badge, Breadcrumbs, DropdownMenu, CopyIcon, ExportIcon, StatTile, IconCircle, Table, WalletIcon, UsersIcon, LinkIcon, StarIcon, StarOutlineIcon } from '../../components';
import { Doc, Preview } from './doc-kit';

/** Группа страницы «Компоненты». order — позиция, title/note — заголовок группы. */
export const meta = { order: 70, title: "Из экрана Account", note: "Компоненты, которых не хватило при сборке кабинета. Плюс расширения: Segmented Control size m, Form Card fluid." };

export default function AccountDemo() {
  const rows = [
    { id: 1, user: 'nikitatuia18@gmail.com', date: '17.08.2026 13:15', sum: '+12 USDT' },
    { id: 2, user: 'nikitatuia18@gmail.com', date: '16.08.2026 18:42', sum: '+12 USDT' },
  ];
  return (
    <>
      <Preview title="Badge" note="Variant: success | warning | error | brand | neutral">
        <div className="sc-demo"><div className="sc-demo__row"><Badge>Received</Badge><Badge variant="warning">Pending</Badge><Badge variant="error">Failed</Badge><Badge variant="brand">New</Badge><Badge variant="neutral">Draft</Badge></div></div>
      </Preview>
      <Doc
        where={['Статус строки в таблице («Received» в Earnings history).']}
        spacing={['Padding: Space/xs по вертикали, Space/md по горизонтали; радиус Radius/round; текст Label/sm.']}
        why={[
          'Не интерактивна. Кликабельная плашка — Chip.',
          'Зелёный — выполнено, оранжевый — в процессе, красный — отказ. Контраст пар: success 3.2, warning 3.0, error 5.6 (решение по исключениям — за владельцем).',
        ]}
      />
      <Preview title="Dropdown Menu" note="Кнопка с тремя точками (more/outline) и список действий; закрывается по выбору, Esc и клику снаружи">
        <div className="sc-demo"><DropdownMenu label="More actions" align="start" items={[{ id: 'c', label: 'Copy link', icon: <CopyIcon />, onSelect: () => undefined }, { id: 's', label: 'Share', icon: <ExportIcon />, onSelect: () => undefined }]} /></div>
      </Preview>
      <Doc
        where={['Меню действий рядом с главной кнопкой (QR-код в кабинете).']}
        spacing={['Список — List + List Item small, зазор до кнопки Space/sm, тень Elevation/Overlay.']}
        why={['Устроено как Language Selector: кнопка Button и список из готовых компонентов, без своих стилей строк. Пункты и колбэки — данные (items).']}
      />
      <Preview title="Breadcrumbs" note="Последний пункт — текущая страница (aria-current)">
        <div className="sc-demo"><Breadcrumbs items={[{ label: 'Home', href: '#/components' }, { label: 'Account' }]} /></div>
      </Preview>
      <Doc
        where={['Верх страницы кабинета, под шапкой сайта.']}
        spacing={['Зазор между пунктами и стрелкой Space/xs; стрелка Size/icon/xs (arrow-right).']}
        why={['Пройденные пункты tertiary (ссылки), текущий — secondary. Hover и фокус в Figma не нарисованы: hover → primary, фокус — общий Focus.']}
      />
      <Preview title="Stat Tile" note="В ряду плитки делят ширину поровну, переносятся при ширине < Size/min-width/md">
        <div className="sc-demo" style={{ width: '100%' }}>
          <div style={{ display: 'flex', gap: 'var(--space-xl)', width: '100%' }}>
            <StatTile icon={<WalletIcon />} value="0 USDT" label="Total earnings" />
            <StatTile icon={<UsersIcon />} value="1 referral" label="Referred users" />
          </div>
        </div>
      </Preview>
      <Doc
        where={['Показатели в карточке Earnings.']}
        spacing={['Padding: Space/lg по вертикали, Space/xl по горизонтали; зазор Space/sm; радиус Radius/lg; фон Surface/neutral/canvas; иконка Size/icon/lg.']}
        why={['Значение — Heading/h4, подпись — Caption. Иконки — currentColor, цвет задаёт плитка.']}
      />
      <Preview title="Icon Circle" note="Tone: subtle | brand">
        <div className="sc-demo"><div className="sc-demo__row"><IconCircle><StarOutlineIcon /></IconCircle><IconCircle><LinkIcon /></IconCircle><IconCircle tone="brand"><StarIcon /></IconCircle></div></div>
      </Preview>
      <Doc
        where={['Левый слот ListItem в меню кабинета; строка «My referral link».']}
        spacing={['Плашка Size/xl с радиусом 8 (Icon Circle/radius = Radius/sm) и сглаживанием, иконка Size/icon/md.']}
        why={['Отличие от Method Icon: произвольная иконка, а не способ оплаты. brand — выбранный пункт меню: иконка в нём залитая, в невыбранном — контурная.']}
      />
      <Preview title="Table" note="Ширина колонок по содержимому, одна колонка растягивается; на узком экране прокручивается">
        <div className="sc-demo" style={{ width: '100%' }}>
          <Table
            caption="Example"
            rowKey={(r) => r.id}
            rows={rows}
            columns={[
              { key: 'u', header: 'Referred user', grow: true, cell: (r) => r.user },
              { key: 'd', header: 'Date', cell: (r) => r.date },
              { key: 's', header: 'Commission', cell: (r) => r.sum },
            ]}
          />
        </div>
      </Preview>
      <Doc
        where={['Earnings history в кабинете.']}
        spacing={['Строки: Space/xl сверху и снизу, линия Border/neutral/default; зазор колонок Space/2xl; заголовок Space/sm до первой строки.']}
        why={[
          'Настоящий table: заголовки scope=col, подпись для скринридеров. Содержимое ячеек — render-функции (бейджи, цвет).',
          'Ширины колонок не заданы числами: так таблица остаётся адаптивной. Если дизайнеру нужна жёсткая сетка — обсудить токены.',
        ]}
      />
    </>
  );
}
