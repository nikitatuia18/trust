import { cn } from '../cn';
import './Spinner.css';

export type SpinnerProps = {
  /** Подпись для скринридера */
  label?: string;
  className?: string;
};

/** Индикатор загрузки (Figma 669:4): кольцо-трек + дуга. Размер — Status/icon/size; в Figma статичен, вращение добавлено в коде. */
export function Spinner({ label = 'Loading', className }: SpinnerProps) {
  return (
    <span className={cn('at-spinner', className)} role="status" aria-label={label}>
      <svg viewBox="0 0 64 64" fill="none" aria-hidden focusable="false">
        <path
          className="at-spinner__track"
          d="M64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32ZM6.4 32C6.4 46.1385 17.8615 57.6 32 57.6C46.1385 57.6 57.6 46.1385 57.6 32C57.6 17.8615 46.1385 6.4 32 6.4C17.8615 6.4 6.4 17.8615 6.4 32Z"
        />
        <path
          className="at-spinner__indicator"
          d="M32 0C36.2023 -1.83688e-07 40.3634 0.827704 44.2459 2.43585C48.1283 4.044 51.6559 6.40111 54.6274 9.37258C57.5989 12.3441 59.956 15.8717 61.5641 19.7541C63.1723 23.6365 64 27.7977 64 32H57.6C57.6 28.6382 56.9378 25.3092 55.6513 22.2033C54.3648 19.0974 52.4791 16.2752 50.1019 13.8981C47.7248 11.5209 44.9026 9.6352 41.7967 8.34868C38.6908 7.06216 35.3618 6.4 32 6.4V0Z"
        />
      </svg>
    </span>
  );
}
