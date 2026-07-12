import { Pencil, Archive, Trash2 } from 'lucide-react'
import type { CategoryTotal } from '../../lib/budgetMath'
import { formatCurrency } from '../../lib/dateUtils'
import { iconFor } from '../../lib/iconRegistry'
import { ProgressBar, Badge } from '../ui'

interface CategoryRowProps {
  total: CategoryTotal
  onEdit: () => void
  onArchive: () => void
  onDelete: () => void
}

const STATUS_BADGE_TONE = { good: 'good', warning: 'warning', critical: 'critical' } as const

export function CategoryRow({ total, onEdit, onArchive, onDelete }: CategoryRowProps) {
  const { category, budget, spent, remaining, status } = total
  const Icon = iconFor(category.icon)

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-stone-200 p-4 dark:border-stone-800">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${category.color}1a`, color: category.color }}
          >
            <Icon size={17} />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-800 dark:text-stone-100">{category.name}</p>
            <p className="text-xs text-stone-400">
              {formatCurrency(spent)} / {formatCurrency(budget)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Badge tone={STATUS_BADGE_TONE[status]}>
            {status === 'critical' ? 'Dépassé' : status === 'warning' ? 'Presque atteint' : 'OK'}
          </Badge>
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Modifier ${category.name}`}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-800"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={onArchive}
            aria-label={`Archiver ${category.name}`}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-800"
          >
            <Archive size={15} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Supprimer ${category.name}`}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <ProgressBar value={spent} max={budget} status={status} />
      <p className="text-xs text-stone-400">
        {remaining >= 0 ? `${formatCurrency(remaining)} restants` : `${formatCurrency(-remaining)} de dépassement`}
      </p>
    </div>
  )
}
