import type { Key, ReactNode } from 'react';
import { cn } from '../cn';
import './Table.css';

export type TableColumn<T> = {
  /** Ключ колонки (для React) */
  key: string;
  /** Заголовок колонки */
  header: ReactNode;
  /** Что показать в ячейке строки */
  cell: (row: T) => ReactNode;
  /** Колонка забирает всю свободную ширину, остальные — по содержимому. Нужна ровно одна */
  grow?: boolean;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  /** Ключ строки (React) */
  rowKey: (row: T) => Key;
  /** Подпись таблицы для скринридеров */
  caption?: string;
  className?: string;
};

/** Таблица данных: заголовок secondary, строки разделены линиями, ширина колонок — по содержимому, одна колонка растягивается. На узком экране прокручивается по горизонтали. */
export function Table<T>({ columns, rows, rowKey, caption, className }: TableProps<T>) {
  return (
    <div className={cn('at-table-scroll', className)}>
      <table className="at-table">
        {caption && <caption className="at-table__caption">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className="at-table__head text-label-md" data-grow={c.grow || undefined}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="at-table__row">
              {columns.map((c) => (
                <td key={c.key} className="at-table__cell text-label-md" data-grow={c.grow || undefined}>{c.cell(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
