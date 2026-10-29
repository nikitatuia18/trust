import { useState } from 'react';
import { Chip } from '../components';
import { REGISTRATION_STEPS, RegistrationFlow, type Details, type RegistrationStep } from '../screens';

const DOC = [
  {
    h: 'Из чего собрано',
    items: [
      'Каркас: Header + Footer + холст Surface/neutral/canvas, ширина контента Grid/max-width, боковые отступы Space/6xl.',
      '1 · Email: Form Card (header — Segmented Control, body — TextField, Button primary, Divider с подписью, Button secondary с иконкой).',
      '2 · Code: Form Card inline, четыре TextField в ряд, Button primary и secondary.',
      '3 · Details: Form Card inline, четыре поля (TextField и выбор страны), Checkbox, Button primary и secondary.',
    ],
  },
  {
    h: 'Чего в системе не хватило',
    items: [
      'Поле кода из 4 ячеек: собрано из четырёх TextField + логика фокуса и вставки (кандидат в компонент OTP Input).',
      'Выбор из списка: TextField с шевроном + List и ListItem по образцу Language Selector — во второй раз; кандидат в компонент Select.',
      'Ссылка внутри текста: пока локальный класс .scr-link (кандидат в компонент Link).',
      'Токен ширины окна-формы: появился Size/Form-card/width = 522 → --c-form-card-max-width (в Figma и в коде).',
    ],
  },
  {
    h: 'Допущения',
    items: [
      'В Figma для шагов 2 и 3 нарисованы только карточки: заголовки и подзаголовки над ними — мои.',
      'Тестовый режим: подходит любой код из 4 цифр; Continue на последнем шаге только сообщает, что данные собраны.',
      'Кнопка «Change Email» в Figma бледная, как disabled; здесь она активна — ведёт назад к e-mail.',
      'Список стран — тестовый; Google и Support service без действия.',
    ],
  },
];

export function ScreensPage() {
  const [step, setStep] = useState<RegistrationStep>('email');
  const [done, setDone] = useState<Details | null>(null);

  return (
    <>
      <div className="sc-intro">
        <h1 className="text-heading-h1">Экраны</h1>
        <p className="text-body-lg sc-muted">
          Регистрация — три экрана, собранные из готовых компонентов и токенов, без нового CSS поверх. Это живой флоу: вводите e-mail,
          любой код из 4 цифр и данные. Переключать шаги можно и чипами. Отдельной страницей: <a className="sc-link" href="#/registration">#/registration</a>.
        </p>
      </div>

      <div className="sc-demo__row sc-screens__steps" role="group" aria-label="Шаг регистрации">
        {REGISTRATION_STEPS.map((s) => (
          <Chip key={s.id} selected={step === s.id} onClick={() => { setDone(null); setStep(s.id); }}>{s.label}</Chip>
        ))}
      </div>

      <div className="sc-screen-frame">
        <RegistrationFlow step={step} onStepChange={(s) => { setDone(null); setStep(s); }} onFinish={setDone} />
      </div>
      {done && (
        <p className="text-body-sm sc-muted sc-screens__status" role="status">
          Готово: данные собраны ({done.email}, {done.telegram}, {done.phone}, {done.country}). Отправки на сервер в тестовом экране нет.
        </p>
      )}

      <aside className="sc-card sc-doc sc-screens__doc">
        {DOC.map((b) => (
          <div key={b.h} className="sc-doc__block">
            <h4 className="text-label-sm">{b.h}</h4>
            <ul className="sc-doc__list text-body-xs sc-muted">
              {b.items.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </aside>
    </>
  );
}
