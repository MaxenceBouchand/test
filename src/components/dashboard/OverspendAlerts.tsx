import { AlertTriangle } from 'lucide-react'
import type { CategoryTotal } from '../../lib/budgetMath'
import { formatCurrency } from '../../lib/dateUtils'

interface OverspendAlertsProps {
  overspent: CategoryTotal[]
}

export function OverspendAlerts({ overspent }: OverspendAlertsProps) {
  if (overspent.length === 0) return null

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
      <div className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-300">
        <AlertTriangle size={16} />
        {overspent.length > 1 ? 'Catégories en dépassement' : 'Catégorie en dépassement'}
      </div>
      <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
        {overspent.map((t) => (
          <li key={t.category.id}>
            {t.category.name} — dépassé de {formatCurrency(-t.remaining)}
          </li>
        ))}
      </ul>
    </div>
  )
}
