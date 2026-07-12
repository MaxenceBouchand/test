import { useState } from 'react'
import type { SavingsGoal } from '../../types'
import { Input, Button } from '../ui'

interface GoalFormValues {
  name: string
  targetAmount: number
  targetDate?: string
}

interface GoalFormProps {
  initial?: SavingsGoal
  onSubmit: (values: GoalFormValues) => void
  onCancel: () => void
}

export function GoalForm({ initial, onSubmit, onCancel }: GoalFormProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [targetAmount, setTargetAmount] = useState(initial?.targetAmount ?? 0)
  const [targetDate, setTargetDate] = useState(initial?.targetDate ?? '')
  const [errors, setErrors] = useState<{ name?: string; targetAmount?: string }>({})

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    if (!name.trim()) nextErrors.name = "Le nom de l'objectif est requis."
    if (targetAmount <= 0) nextErrors.targetAmount = 'Le montant cible doit être supérieur à 0.'
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    onSubmit({ name: name.trim(), targetAmount, targetDate: targetDate || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nom de l'objectif"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        placeholder="Ex : Fonds d'urgence"
        autoFocus
      />
      <Input
        label="Montant cible"
        type="number"
        min={0}
        step={10}
        value={targetAmount || ''}
        onChange={(e) => setTargetAmount(Number(e.target.value))}
        error={errors.targetAmount}
        placeholder="0"
      />
      <Input
        label="Date cible (optionnel)"
        type="date"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
      />
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">{initial ? 'Enregistrer' : 'Créer'}</Button>
      </div>
    </form>
  )
}
