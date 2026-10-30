import { useState } from 'react';
import { Button, List, Icon, Avatar, EmbedPlaceholder, LanguageSelector, Logo, Spinner, Switch, Footer, Header } from '../../components';
import { Doc, Preview } from './doc-kit';

/** Группа страницы «Компоненты». order — позиция, title/note — заголовок группы. */
export const meta = { order: 60, title: "Бренд, переключатели и ожидание", note: "Логотип, язык, переключатель, аватар, загрузка и заглушка внешнего блока." };

export default function BrandDemo() {
  const [on, setOn] = useState(true);
  const [lang, setLang] = useState("EN");
  return (
    <>
      <Preview title="Switch + Avatar" note="Checked: false | true · Avatar — фото или инициалы">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">switch</span>
            <Switch aria-label="Уведомления" checked={on} onChange={(e) => setOn(e.target.checked)} />
            <Switch aria-label="Выключено" defaultChecked={false} />
            <Switch aria-label="Недоступно" disabled />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">avatar</span>
            <Avatar name="Nikita Tuia" />
            <Avatar name="AllTrust" />
            <Avatar alt="Пример фото" src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Crect width=%2724%27 height=%2724%27 fill=%27%230094ff%27/%3E%3Ccircle cx=%2712%27 cy=%279%27 r=%274%27 fill=%27white%27/%3E%3Cpath d=%27M4 24c0-5 3.5-8 8-8s8 3 8 8%27 fill=%27white%27/%3E%3C/svg%3E" />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          "Switch — настройки вкл/выкл: уведомления, сохранить способ оплаты, режимы.",
          "Avatar — пользователь в шапке и меню; в строках списка (slot-left).",
        ]}
        spacing={[
          "Switch: дорожка = шар + 2 × --c-switch-padding (2), шар --c-switch-ball-size (24), обводка --c-switch-stroke.",
          "Avatar: круг Size/sm (24), радиус --c-avatar-radius.",
        ]}
        why={[
          "Switch — нативный input role=switch: клавиатура и скринридер работают сами, подписи нет — задаётся aria-label.",
          "Тень шара — токен Elevation/Control/1 (0 8 6 −4, чёрный 16%, как в Figma): отдельный токен, не Overlay, потому что у подвижного элемента управления другая тень.",
          "Avatar без фото показывает инициалы (добавлено в коде, в Figma только фото); само фото — данные, не ассет системы.",
        ]}
      />
      <Preview title="Logo + Language Selector" note="Language Selector: State default | active — список открывается по клику">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">logo</span>
            <Logo />
          </div>
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">default</span>
            <LanguageSelector value={lang} onChange={setLang} />
          </div>
          <div className="sc-demo__row" style={{ minHeight: "calc(var(--size-lg) * 6)", alignItems: "flex-start" }}>
            <span className="sc-demo__tag text-caption-default sc-muted">active</span>
            <LanguageSelector value="RU" onChange={() => {}} open />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          "Logo — Header Bar слева, Footer, экран входа.",
          "Language Selector — Header Bar справа, перед кнопкой входа.",
        ]}
        spacing={[
          "Logo: высота Size/lg (40), пропорция 150:40; знак и вордмарк — как в Figma, без токенов отступов.",
          "Language Selector: Button secondary S compact + List card, зазор Space/sm, тень Elevation/Overlay/1+2.",
          "Строка: List Item small, флаг Size/md (32), галочка — Size/Icon/md (24), Content/brand.",
        ]}
        why={[
          "Собран из Button, List и List Item — своих стилей почти нет, только позиция и тень выпадашки.",
          "Закрывается по выбору, Esc и клику снаружи; кнопка отдаёт aria-expanded.",
          "Флаги EN, RU, GE — бренд-арт вне токенов; другие языки передаются через languages.",
        ]}
      />
      <Preview title="Spinner + Embed Placeholder" note="Embed Placeholder: Size default | compact · title, description">
        <div className="sc-demo sc-demo--col">
          <div className="sc-demo__row">
            <span className="sc-demo__tag text-caption-default sc-muted">spinner</span>
            <Spinner />
          </div>
          <div className="sc-demo__row sc-demo__row--stack" style={{ width: "100%" }}>
            <span className="sc-demo__tag text-caption-default sc-muted">default</span>
            <EmbedPlaceholder />
          </div>
          <div className="sc-demo__row sc-demo__row--stack" style={{ width: "100%" }}>
            <span className="sc-demo__tag text-caption-default sc-muted">compact</span>
            <EmbedPlaceholder size="compact" />
          </div>
        </div>
      </Preview>
      <Doc
        where={[
          "Spinner — ожидание ответа: проверка заявки, загрузка внешнего блока.",
          "Embed Placeholder — место под внешний iframe (платёжная форма, верификация), пока блок не подключён.",
        ]}
        spacing={[
          "Spinner: Size Status/icon/size (64), трек --c-status-spinner-track, дуга --c-status-spinner-indicator.",
          "Embed Placeholder: padding --c-embed-placeholder-padding, gap --c-embed-placeholder-gap, радиус --c-embed-placeholder-radius, min-height 400 | 285.",
        ]}
        why={[
          "Spinner в Figma статичен; вращение добавлено в коде и отключается при prefers-reduced-motion.",
          "Embed Placeholder тянется на ширину родителя; пунктир — свойство компонента, не токен.",
          "Цвета заглушки — brand: она должна выглядеть временной, не контентом.",
        ]}
      />
    </>
  );
}
