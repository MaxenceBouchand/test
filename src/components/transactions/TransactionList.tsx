import { ArrowRightLeft } from 'lucide-react'
import type { Category, Transaction } from '../../types'
import { EmptyState } from '../ui'
import { TransactionRow } from './TransactionRow'

interface TransactionListProps {
  transactions: Transaction[]
  categories: Category[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function TransactionList({ transactions, categories, onEdit, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={ArrowRightLeft}
        title="Aucune transaction ce mois-ci"
        description="Ajoutez votre première transaction pour voir votre budget se mettre à jour."
      />
    )
  }

  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))

  return (
    <div className="flex flex-col gap-2">
      {sorted.map((transaction) => (
        <TransactionRow
          key={transaction.id}
          transaction={transaction}
          category={categories.find((c) => c.id === transaction.categoryId)}
          onEdit={() => onEdit(transaction.id)}
          onDelete={() => onDelete(transaction.id)}
        />
      ))}
    </div>
  )
}
