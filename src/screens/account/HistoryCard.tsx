import { Badge, Button, FormCard, SortIcon, Table, type TableColumn } from '../../components';
import { formatCommission, formatDateTime, type EarningStatus, type ReferralEarning } from './accountData';

const STATUS: Record<EarningStatus, { label: string; variant: 'success' | 'warning' | 'error' }> = {
  received: { label: 'Received', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  failed: { label: 'Failed', variant: 'error' },
};

const COLUMNS: TableColumn<ReferralEarning>[] = [
  { key: 'user', header: 'Referred user', grow: true, cell: (r) => r.user },
  { key: 'date', header: 'Date', cell: (r) => formatDateTime(r.date) },
  { key: 'commission', header: 'Commission', cell: (r) => <span className={r.status === 'received' ? 'scr-positive' : undefined}>{formatCommission(r.commission)}</span> },
  { key: 'status', header: 'Status', cell: (r) => <Badge variant={STATUS[r.status].variant}>{STATUS[r.status].label}</Badge> },
];

type HistoryCardProps = {
  rows: ReferralEarning[];
  onSort?: () => void;
  onViewAll?: () => void;
};

/** «Earnings history»: последние начисления; полный список — по «View all» */
export function HistoryCard({ rows, onSort, onViewAll }: HistoryCardProps) {
  return (
    <FormCard
      fluid
      header={
        <div className="scr-card-head">
          <h2 className="at-form-card__title text-heading-h4">Earnings history</h2>
          <div className="scr-card-head__actions">
            <Button variant="secondary" size="s" iconOnly iconLeft={<SortIcon />} aria-label="Sort" onClick={onSort} />
            <Button variant="secondary" size="s" onClick={onViewAll}>View all</Button>
          </div>
        </div>
      }
    >
      <Table caption="Earnings history" columns={COLUMNS} rows={rows} rowKey={(r) => r.id} />
    </FormCard>
  );
}
