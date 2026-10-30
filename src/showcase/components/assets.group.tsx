import { Chip, List, Icon, BankLogo, CurrencyIcon, LogoWithBadge, MethodIcon, NetworkLogo, StatusIcon, Logo, Badge } from '../../components';
import { Doc, Preview } from './doc-kit';

/** Группа страницы «Компоненты». order — позиция, title/note — заголовок группы. */
export const meta = { order: 50, title: "Логотипы и статусы", note: "Валюты, сети, банки, способы оплаты, итог операции." };

export default function AssetsDemo() {
  return (
    <>
      <Preview title="Logo with Badge + Currency Icon + Network Logo" note="Size: s | m | l · main и badge — подмена (swap), show-badge — badge передан">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">currency m | l</span>
            <CurrencyIcon currency="USD" />
            <CurrencyIcon currency="GEL" />
            <CurrencyIcon currency="USD" size="l" />
            <CurrencyIcon currency="GEL" size="l" />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">network</span>
            <NetworkLogo network="gram" />
            <NetworkLogo network="arbitrum" />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">s | m | l + badge</span>
            {(['s', 'm', 'l'] as const).map((s) => (
              <LogoWithBadge key={s} size={s} main={<CurrencyIcon currency="USD" size="l" />} badge={<NetworkLogo network="arbitrum" />} />
            ))}
            <LogoWithBadge size="l" main={<CurrencyIcon currency="GEL" size="l" />} badge={<NetworkLogo network="gram" />} />
            <LogoWithBadge size="l" main={<CurrencyIcon currency="GEL" size="l" />} />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Валюта, монета или банк в строке выбора: слот List Item, Amount Field (селектор), Method Chip.',
          'Бейдж — сеть (Gram, Arbitrum) или валюта счёта.',
        ]}
        spacing={[
          'Корень: --c-asset-logo-s|m|l-size (20 | 24 | 32), без отступов.',
          'Бейдж: --c-asset-logo-badge-size (16), --c-asset-logo-badge-padding (2), фон --c-asset-logo-badge-bg, справа снизу.',
          'Currency Icon: размер m | l — те же токены Asset Logo/M|L/size.',
        ]}
        why={[
          'Один корень с двумя слотами (main, badge) вместо отдельного компонента на каждую пару «монета + сеть».',
          'Бейдж 16 на всех размерах: на s и m он перекрывает логотип сильнее — допущение из Figma.',
          'Знаки валют и сетей — бренд-арт вне токенов (исключение владельца); монеты берутся из «06 — Icons» по мере надобности.',
        ]}
      />
      <Preview title="Bank Logo" note="Name: BOG | TBC | Credo | Visa | Mastercard | Cash · show-badge · badge">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">с бейджем</span>
            <BankLogo name="TBC" />
            <BankLogo name="Visa" />
            <BankLogo name="Mastercard" />
            <BankLogo name="Cash" />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">без бейджа</span>
            <BankLogo name="TBC" showBadge={false} />
            <BankLogo name="Visa" showBadge={false} />
            <BankLogo name="Mastercard" showBadge={false} />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">арт не перенесён</span>
            <BankLogo name="BOG" />
            <BankLogo name="Credo" />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Банк или карта в строке выбора метода оплаты (List Item, slot-left).',
          'Бейдж — валюта счёта (по умолчанию GEL).',
        ]}
        spacing={[
          'Корень 32: --c-asset-logo-l-size; подложка на всю ширину (--c-asset-logo-bg, радиус round).',
          'Знак внутри подложки 16: Size/Icon/xs, по центру.',
          'Cash — Currency Icon GEL l без подложки и бейджа.',
        ]}
        why={[
          'Собран из Logo with Badge: подложка со знаком — main, валюта — badge.',
          'Знаки TBC, Visa, Mastercard перенесены; BOG (27 КБ SVG) и Credo — пока буква вместо знака, свой знак можно передать через logo.',
        ]}
      />
      <Preview title="Method Icon + Status Icon" note="Kind: bank | cash | crypto · Type: success | failed">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">method</span>
            <MethodIcon kind="bank" />
            <MethodIcon kind="cash" />
            <MethodIcon kind="crypto" />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">status</span>
            <StatusIcon type="success" />
            <StatusIcon type="failed" />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          'Method Icon — способ оплаты: банк, наличные, крипта (строки выбора, Method Chip).',
          'Status Icon — итог операции в шапке результата (успех или ошибка), над Text Container.',
        ]}
        spacing={[
          'Method Icon: круг --c-method-icon-size (Size/lg), иконка --c-method-icon-icon-size.',
          'Status Icon: halo --c-status-icon-size (64), глиф --c-status-icon-glyph-size (48).',
        ]}
        why={[
          'Цвета только по роли: bank = brand, cash = success, crypto = warning; failed = error.',
          'Иконка наследует цвет (currentColor), поэтому один глиф работает для всех видов.',
          'Контраст crypto (Content/warning на Warning/subtle) 2.98 — иконка крупная, оставлено владельцем, в «Открыто».',
        ]}
      />
    </>
  );
}
