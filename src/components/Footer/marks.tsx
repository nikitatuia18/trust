import type { SVGProps } from 'react';

type MarkProps = Omit<SVGProps<SVGSVGElement>, 'children'>;

/*
 * Знаки магазинов приложений (Figma 600:312, 600:320): бренд-арт вне токенов, 24×24.
 * Google Play собран из четырёх кусков, как в Figma; каждый перевёрнут по вертикали (в Figma узлы повёрнуты на 180° и отражены).
 */
export const AppStoreMark = (p: MarkProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M16.2983 6.68164C17.6565 6.68177 19.0956 7.42591 20.1195 8.70996C16.7624 10.5609 17.3055 15.3838 20.6977 16.6738C20.2313 17.7133 20.0065 18.1779 19.4057 19.0986C18.5676 20.3839 17.3861 21.9843 15.9203 21.9961C14.6194 22.0102 14.2839 21.1438 12.518 21.1543C10.7517 21.1637 10.3829 22.0129 9.07951 22C7.61518 21.9869 6.49566 20.5429 5.65763 19.2578C3.31276 15.6664 3.06518 11.4496 4.51115 9.20703C5.53979 7.61488 7.16271 6.68363 8.68693 6.68359C10.2379 6.68359 11.214 7.53984 12.4985 7.54004C13.7445 7.54004 14.5039 6.68164 16.2983 6.68164ZM15.9057 2C16.0845 3.21475 15.5892 4.40509 14.9369 5.24707C14.2391 6.14998 13.0367 6.84885 11.8715 6.8125C11.6588 5.64965 12.203 4.45104 12.8656 3.64551C13.5927 2.75648 14.8396 2.07409 15.9057 2Z" />
  </svg>
);

export const GooglePlayMark = (p: MarkProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...p}>
      <svg x="3" y="2.2512" width="10.2967" height="19.4919" viewBox="0 0 10.2967 19.4919" overflow="visible">
        <defs><linearGradient id="at-gp0-paint0_linear_0_91" x1="9.42038" y1="0.966877" x2="-3.62547" y2="14.3288" gradientUnits="userSpaceOnUse"><stop stopColor="#00A0FF" /><stop offset="0.0066" stopColor="#00A1FF" /><stop offset="0.2601" stopColor="#00BEFF" /><stop offset="0.5122" stopColor="#00D2FF" /><stop offset="0.7604" stopColor="#00DFFF" /><stop offset="1" stopColor="#00E3FF" /></linearGradient></defs>
        <g transform="matrix(1 0 0 -1 0 19.4919)"><path d="M0.369338 19.4355C0.13539 19.1964 0 18.8242 0 18.3421V1.14595C0 0.663857 0.13539 0.291592 0.369338 0.0524872L0.427079 0L10.2967 9.63223V9.85967L0.427079 19.4919L0.369338 19.4355Z" fill="url(#at-gp0-paint0_linear_0_91)" /></g>
      </svg>
      <svg x="13.296" y="8.671" width="8.09439" height="6.6522" viewBox="0 0 8.09439 6.6522" overflow="visible">
        <defs><linearGradient id="at-gp1-paint0_linear_0_99" x1="8.70835" y1="3.32717" x2="-10.5625" y2="3.32717" gradientUnits="userSpaceOnUse"><stop stopColor="#FFE000" /><stop offset="0.4087" stopColor="#FFBD00" /><stop offset="0.7754" stopColor="#FFA500" /><stop offset="1" stopColor="#FF9C00" /></linearGradient></defs>
        <g transform="matrix(1 0 0 -1 0 6.6522)"><path d="M3.28622 0L0 3.21236V3.4398L3.2902 6.65216L3.36387 6.61037L7.26034 4.44579C8.37234 3.83151 8.37234 2.82066 7.26034 2.20248L3.36387 0.0417959L3.28622 0V0Z" fill="url(#at-gp1-paint0_linear_0_99)" /></g>
      </svg>
      <svg x="3.37" y="11.998" width="13.2912" height="10.0016" viewBox="0 0 13.2912 10.0016" overflow="visible">
        <defs><linearGradient id="at-gp2-paint0_linear_0_79" x1="11.462" y1="11.787" x2="-6.2292" y2="29.9069" gradientUnits="userSpaceOnUse"><stop stopColor="#FF3A44" /><stop offset="1" stopColor="#C31162" /></linearGradient></defs>
        <g transform="matrix(1 0 0 -1 0 10.0016)"><path d="M13.2912 6.71735L9.92735 10.0016L0 0.308173C0.369339 -0.0708956 0.971629 -0.116579 1.65655 0.262489L13.2912 6.71735" fill="url(#at-gp2-paint0_linear_0_79)" /></g>
      </svg>
      <svg x="3.37" y="2" width="13.2912" height="9.99836" viewBox="0 0 13.2912 9.99836" overflow="visible">
        <defs><linearGradient id="at-gp3-paint0_linear_0_67" x1="-2.49892" y1="-15.4145" x2="5.40101" y2="-7.3232" gradientUnits="userSpaceOnUse"><stop stopColor="#32A071" /><stop offset="0.0685" stopColor="#2DA771" /><stop offset="0.4762" stopColor="#15CF74" /><stop offset="0.8009" stopColor="#06E775" /><stop offset="1" stopColor="#00F076" /></linearGradient></defs>
        <g transform="matrix(1 0 0 -1 0 9.99836)"><path d="M13.2912 3.28432L1.65655 9.73918C0.971629 10.1144 0.369339 10.0687 0 9.68961L9.92735 3.81214e-05L13.2912 3.28432Z" fill="url(#at-gp3-paint0_linear_0_67)" /></g>
      </svg>
  </svg>
);
