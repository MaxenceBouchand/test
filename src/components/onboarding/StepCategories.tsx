import type { BudgetMethod, Category, CategoryGroup } from '../../types'
import { formatCurrency } from '../../lib/dateUtils'
import clsx from 'clsx'

interface StepCategoriesProps {
  categories: Category[]
  method: BudgetMethod
  income: number
  onChange: (categories: Category[]) => void
}

const GROUP_LABELS: Record<CategoryGroup, string> = {
  needs: 'Besoins (50 %)',
  wants: 'Envies (30 %)',
  savings: 'Épargne (20 %)',
}

const GROUP_ORDER: CategoryGroup[] = ['needs', 'wants', 'savings']

export function StepCategories({ categories, method, income, onChange }: StepCategoriesProps) {
  const updateBudget = (id: string, value: number) => {
    onChange(categories.map((c) => (c.id === id ? { ...c, monthlyBudget: value } : c)))
  }

  const totalAssigned = categories.reduce((sum, c) => sum + c.monthlyBudget, 0)
  const unassigned = income - totalAssigned

  const renderRow = (category: Category) => (
    <div
      key={category.id}
      className="flex items-center justify-between gap-3 rounded-2xl border border-rose-100 px-4 py-2.5 dark:border-stone-800"
    >
      <span className="text-sm text-stone-700 dark:text-stone-200">{category.name}</span>
      <div className="flex items-center gap-1">
        <input
          type="number"
          min={0}
          step={5}
          value={category.monthlyBudget || ''}
          onChange={(e) => updateBudget(category.id, Number(e.target.value))}
          className="w-24 rounded-full border border-rose-200 bg-white px-3 py-1 text-right text-sm text-stone-900 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
        />
        <span className="text-xs text-stone-400">€</span>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-50">
          Vos catégories de départ
        </h2>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Nous avons pré-rempli des catégories courantes. Ajustez les montants si besoin — vous
          pourrez en ajouter, modifier ou supprimer plus tard.
        </p>
      </div>

      {method === '50-30-20' ? (
        <div className="flex flex-col gap-5">
          {GROUP_ORDER.map((group) => (
            <div key={group}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
                {GROUP_LABELS[group]}
              </h3>
              <div className="flex flex-col gap-2">
                {categories.filter((c) => c.group === group).map(renderRow)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">{categories.map(renderRow)}</div>
      )}

      <div
        className={clsx(
          'rounded-2xl px-4 py-3 text-sm font-medium',
          method === 'zero-based' && Math.abs(unassigned) > 0.5
            ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'
            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300',
        )}
      >
        {method === 'zero-based'
          ? `Reste à assigner : ${formatCurrency(unassigned)}`
          : `Total attribué : ${formatCurrency(totalAssigned)} sur ${formatCurrency(income)}`}
      </div>
    </div>
  )
}
