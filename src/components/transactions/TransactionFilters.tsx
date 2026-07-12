import type { Category, TransactionType } from '../../types'
import { Select } from '../ui'

export interface TransactionFilterValues {
  type: TransactionType | 'all'
  categoryId: string | 'all'
}

interface TransactionFiltersProps {
  categories: Category[]
  value: TransactionFilterValues
  onChange: (value: TransactionFilterValues) => void
}

export function TransactionFilters({ categories, value, onChange }: TransactionFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Select
        label="Type"
        value={value.type}
        onChange={(e) => onChange({ ...value, type: e.target.value as TransactionFilterValues['type'] })}
        options={[
          { value: 'all', label: 'Tous' },
          { value: 'expense', label: 'Dépenses' },
          { value: 'income', label: 'Revenus' },
        ]}
        className="w-40"
      />
      <Select
        label="Catégorie"
        value={value.categoryId}
        onChange={(e) => onChange({ ...value, categoryId: e.target.value })}
        options={[{ value: 'all', label: 'Toutes' }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
        className="w-48"
      />
    </div>
  )
}
