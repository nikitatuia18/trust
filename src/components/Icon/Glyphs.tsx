import type { ReactNode, SVGProps } from 'react';
import './Icon.css';

/*
 * ВРЕМЕННЫЕ иконки-заглушки (геометрия по центру 24×24 вместо текстовых глифов, которые «плывут» по базовой линии).
 * Заменить на иконки из «06 — Icons», когда они будут выбраны; размер задаёт слот, как у Icon.
 */
type GlyphProps = Omit<SVGProps<SVGSVGElement>, 'children'>;

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Glyph({ children, className, ...rest }: GlyphProps & { children: ReactNode }) {
  return (
    <svg className={className ? `at-icon ${className}` : 'at-icon'} viewBox="0 0 24 24" aria-hidden focusable="false" {...rest}>
      {children}
    </svg>
  );
}

export const PlusIcon = (p: GlyphProps) => <Glyph {...p}><path {...stroke} d="M12 5v14M5 12h14" /></Glyph>;
export const MinusIcon = (p: GlyphProps) => <Glyph {...p}><path {...stroke} d="M5 12h14" /></Glyph>;
export const CloseIcon = (p: GlyphProps) => <Glyph {...p}><path {...stroke} d="M6 6l12 12M18 6L6 18" /></Glyph>;
export const CheckIcon = (p: GlyphProps) => <Glyph {...p}><path {...stroke} d="M5 12.5l4.5 4.5L19 7.5" /></Glyph>;
export const AlertIcon = (p: GlyphProps) => <Glyph {...p}><path {...stroke} d="M12 6v8" /><circle cx="12" cy="18" r="1.25" fill="currentColor" /></Glyph>;
export const SearchIcon = (p: GlyphProps) => <Glyph {...p}><circle {...stroke} cx="11" cy="11" r="6" /><path {...stroke} d="M16 16l4 4" /></Glyph>;
export const DotIcon = (p: GlyphProps) => <Glyph {...p}><circle cx="12" cy="12" r="5" fill="currentColor" /></Glyph>;
