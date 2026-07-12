import clsx from 'clsx'
import { formatCurrency } from '../../lib/dateUtils'

interface ZeroBasedAllocationBarProps {
  income: number
  allocated: number
  unassigned: number
}

export function ZeroBasedAllocationBar({ income, allocated, unassigned }: ZeroBasedAllocationBarProps) {
  const isBalanced = Math.abs(unassigned) < 0.5
  const isOverAssigned = unassigned < -0.5
  const percent = income > 0 ? Math.min(100, Math.max(0, (allocated / income) * 100)) : 0

  return (
    <div
      className={clsx(
        'rounded-2xl border p-5',
        isBalanced
          ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-900/20'
          : isOverAssigned
            ? 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20'
            : 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-900/20',
      )}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-stone-700 dark:text-stone-200">
          {formatCurrency(allocated)} assignés sur {formatCurrency(income)}
        </span>
        <span
          className={clsx(
            'font-semibold',
            isBalanced
              ? 'text-emerald-700 dark:text-emerald-300'
              : isOverAssigned
                ? 'text-red-700 dark:text-red-300'
                : 'text-amber-700 dark:text-amber-300',
          )}
        >
          {isBalanced
            ? 'Chaque euro est assigné ✓'
            : isOverAssigned
              ? `${formatCurrency(-unassigned)} de trop assignés`
              : `${formatCurrency(unassigned)} restants à assigner`}
        </span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/70 dark:bg-stone-900/60">
        <div
          className={clsx(
            'h-full rounded-full transition-all',
            isBalanced ? 'bg-emerald-500' : isOverAssigned ? 'bg-red-500' : 'bg-amber-500',
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
