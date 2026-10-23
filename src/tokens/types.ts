import registryJson from './registry.json';

export type Layer = 'primitives' | 'theme' | 'layout' | 'components';

export interface TokenEntry {
  layer: Layer;
  name: string; // имя в Figma
  css: string; // имя CSS-переменной
  type: 'C' | 'F' | 'S';
  group: string;
  alias?: string | null;
  aliasMobile?: string | null;
  value: string | number;
  valueMobile?: string | number;
}

export const registry = registryJson as TokenEntry[];

export const byLayer = (layer: Layer) => registry.filter((t) => t.layer === layer);

export function groupBy<T>(items: T[], key: (t: T) => string): [string, T[]][] {
  const m = new Map<string, T[]>();
  for (const i of items) {
    const k = key(i);
    if (!m.has(k)) m.set(k, []);
    m.get(k)!.push(i);
  }
  return [...m];
}
