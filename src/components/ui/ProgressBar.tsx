import clsx from 'clsx'
import type { BudgetStatus } from '../../lib/chartPalette'

interface ProgressBarProps {
  value: number
  max: number
  status?: BudgetStatus
  className?: string
}

const STATUS_TRACK_CLASSES: Record<BudgetStatus, string> = {
  good: 'bg-gradient-brand',
  warning: 'bg-amber-500 dark:bg-amber-400',
  critical: 'bg-red-600 dark:bg-red-500',
}

export function ProgressBar({ value, max, status = 'good', className }: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : value > 0 ? 100 : 0

  return (
    <div
      className={clsx('h-2.5 w-full overflow-hidden rounded-full bg-rose-50 dark:bg-stone-800', className)}
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={clsx('h-full rounded-full transition-all', STATUS_TRACK_CLASSES[status])}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
