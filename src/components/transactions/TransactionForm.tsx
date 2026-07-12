import { useState } from 'react'
import type { Category, Transaction, TransactionType } from '../../types'
import { Input, Select, Button } from '../ui'
import { todayIso } from '../../lib/dateUtils'

interface TransactionFormValues {
  type: TransactionType
  amount: number
  categoryId: string | null
  date: string
  note?: string
}

interface TransactionFormProps {
  categories: Category[]
  initial?: Transaction
  onSubmit: (values: TransactionFormValues) => void
  onCancel: () => void
}

export function TransactionForm({ categories, initial, onSubmit, onCancel }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(initial?.type ?? 'expense')
  const [amount, setAmount] = useState(initial?.amount ?? 0)
  const [categoryId, setCategoryId] = useState<string>(initial?.categoryId ?? categories[0]?.id ?? '')
  const [date, setDate] = useState(initial?.date ?? todayIso())
  const [note, setNote] = useState(initial?.note ?? '')
  const [errors, setErrors] = useState<{ amount?: string; category?: string }>({})

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    if (amount <= 0) nextErrors.amount = 'Le montant doit être supérieur à 0.'
    if (type === 'expense' && !categoryId) nextErrors.category = 'Choisissez une catégorie.'
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    onSubmit({
      type,
      amount,
      categoryId: type === 'expense' ? categoryId : null,
      date,
      note: note.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Select
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType)}
        options={[
          { value: 'expense', label: 'Dépense' },
          { value: 'income', label: 'Revenu' },
        ]}
      />
      <Input
        label="Montant"
        type="number"
        min={0}
        step={0.01}
        value={amount || ''}
        onChange={(e) => setAmount(Number(e.target.value))}
        error={errors.amount}
        placeholder="0.00"
        autoFocus
      />
      {type === 'expense' && (
        <Select
          label="Catégorie"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          error={errors.category}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />
      )}
      <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <Input
        label="Note (optionnel)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ex : Courses de la semaine"
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
