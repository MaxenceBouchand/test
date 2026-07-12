import { Tags, Plus } from 'lucide-react'
import type { BudgetMethod, CategoryGroup } from '../../types'
import type { CategoryTotal } from '../../lib/budgetMath'
import { Button, EmptyState } from '../ui'
import { CategoryRow } from './CategoryRow'

interface CategoryListProps {
  totals: CategoryTotal[]
  method: BudgetMethod
  onAdd: () => void
  onEdit: (id: string) => void
  onArchive: (id: string) => void
  onDelete: (id: string) => void
}

const GROUP_LABELS: Record<CategoryGroup, string> = {
  needs: 'Besoins',
  wants: 'Envies',
  savings: 'Épargne',
}

const GROUP_ORDER: CategoryGroup[] = ['needs', 'wants', 'savings']

export function CategoryList({ totals, method, onAdd, onEdit, onArchive, onDelete }: CategoryListProps) {
  if (totals.length === 0) {
    return (
      <EmptyState
        icon={Tags}
        title="Aucune catégorie pour l'instant"
        description="Créez vos premières catégories pour commencer à répartir votre budget."
        action={
          <Button onClick={onAdd} icon={<Plus size={16} />}>
            Ajouter une catégorie
          </Button>
        }
      />
    )
  }

  const rowProps = (total: CategoryTotal) => ({
    total,
    onEdit: () => onEdit(total.category.id),
    onArchive: () => onArchive(total.category.id),
    onDelete: () => onDelete(total.category.id),
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button onClick={onAdd} icon={<Plus size={16} />} size="sm">
          Ajouter une catégorie
        </Button>
      </div>

      {method === '50-30-20' ? (
        GROUP_ORDER.map((group) => {
          const groupTotals = totals.filter((t) => t.category.group === group)
          if (groupTotals.length === 0) return null
          return (
            <div key={group}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
                {GROUP_LABELS[group]}
              </h3>
              <div className="flex flex-col gap-2">
                {groupTotals.map((total) => (
                  <CategoryRow key={total.category.id} {...rowProps(total)} />
                ))}
              </div>
            </div>
          )
        })
      ) : (
        <div className="flex flex-col gap-2">
          {totals.map((total) => (
            <CategoryRow key={total.category.id} {...rowProps(total)} />
          ))}
        </div>
      )}
    </div>
  )
}
