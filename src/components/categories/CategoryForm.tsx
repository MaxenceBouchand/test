import { useState } from 'react'
import type { BudgetMethod, Category, CategoryGroup } from '../../types'
import { Input, Select, Button } from '../ui'
import { ICON_OPTIONS } from '../../lib/iconRegistry'

interface CategoryFormValues {
  name: string
  icon: string
  group?: CategoryGroup
  monthlyBudget: number
}

interface CategoryFormProps {
  method: BudgetMethod
  initial?: Category
  onSubmit: (values: CategoryFormValues) => void
  onCancel: () => void
}

const GROUP_OPTIONS: { value: CategoryGroup; label: string }[] = [
  { value: 'needs', label: 'Besoins' },
  { value: 'wants', label: 'Envies' },
  { value: 'savings', label: 'Épargne' },
]

export function CategoryForm({ method, initial, onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [icon, setIcon] = useState(initial?.icon ?? ICON_OPTIONS[0])
  const [group, setGroup] = useState<CategoryGroup>(initial?.group ?? 'needs')
  const [monthlyBudget, setMonthlyBudget] = useState(initial?.monthlyBudget ?? 0)
  const [nameError, setNameError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!name.trim()) {
      setNameError('Le nom de la catégorie est requis.')
      return
    }
    onSubmit({
      name: name.trim(),
      icon,
      group: method === '50-30-20' ? group : undefined,
      monthlyBudget,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nom de la catégorie"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          if (e.target.value.trim()) setNameError(null)
        }}
        error={nameError ?? undefined}
        placeholder="Ex : Restaurants"
        autoFocus
      />
      <Select
        label="Icône"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        options={ICON_OPTIONS.map((name) => ({ value: name, label: name }))}
      />
      {method === '50-30-20' && (
        <Select
          label="Groupe"
          value={group}
          onChange={(e) => setGroup(e.target.value as CategoryGroup)}
          options={GROUP_OPTIONS}
        />
      )}
      <Input
        label={method === 'zero-based' ? 'Montant assigné' : 'Budget mensuel'}
        type="number"
        min={0}
        step={5}
        value={monthlyBudget || ''}
        onChange={(e) => setMonthlyBudget(Number(e.target.value))}
        placeholder="0"
      />
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">{initial ? 'Enregistrer' : 'Ajouter'}</Button>
      </div>
    </form>
  )
}
