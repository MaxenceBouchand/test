import { Pencil, Trash2, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import type { Category, Transaction } from '../../types'
import { formatCurrency, formatDateFr } from '../../lib/dateUtils'
import { iconFor } from '../../lib/iconRegistry'

interface TransactionRowProps {
  transaction: Transaction
  category?: Category
  onEdit: () => void
  onDelete: () => void
}

export function TransactionRow({ transaction, category, onEdit, onDelete }: TransactionRowProps) {
  const isIncome = transaction.type === 'income'
  const Icon = category ? iconFor(category.icon) : isIncome ? ArrowDownLeft : ArrowUpRight

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 px-4 py-3 dark:border-stone-800">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: category ? `${category.color}1a` : isIncome ? '#0ca30c1a' : '#8987811a',
            color: category ? category.color : isIncome ? '#0ca30c' : '#898781',
          }}
        >
          <Icon size={17} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-stone-800 dark:text-stone-100">
            {category ? category.name : isIncome ? 'Revenu' : 'Sans catégorie'}
          </p>
          <p className="truncate text-xs text-stone-400">
            {formatDateFr(transaction.date)}
            {transaction.note ? ` · ${transaction.note}` : ''}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={
            isIncome
              ? 'text-sm font-semibold text-emerald-600 dark:text-emerald-400'
              : 'text-sm font-semibold text-stone-800 dark:text-stone-100'
          }
        >
          {isIncome ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </span>
        <button
          type="button"
          onClick={onEdit}
          aria-label="Modifier la transaction"
          className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-800"
        >
          <Pencil size={15} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label="Supprimer la transaction"
          className="rounded-lg p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}
