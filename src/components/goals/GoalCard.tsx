import { useState } from 'react'
import { Pencil, Trash2, CheckCircle2 } from 'lucide-react'
import type { SavingsGoal } from '../../types'
import { formatCurrency, formatDateFr } from '../../lib/dateUtils'
import { Card, ProgressBar, Button, Input } from '../ui'

interface GoalCardProps {
  goal: SavingsGoal
  onContribute: (amount: number) => void
  onEdit: () => void
  onDelete: () => void
}

export function GoalCard({ goal, onContribute, onEdit, onDelete }: GoalCardProps) {
  const [amount, setAmount] = useState(0)
  const isComplete = Boolean(goal.completedAt)
  const percent = goal.targetAmount > 0 ? Math.min(100, (goal.currentAmount / goal.targetAmount) * 100) : 0

  const handleContribute = () => {
    if (amount <= 0) return
    onContribute(amount)
    setAmount(0)
  }

  return (
    <Card padded className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-stone-800 dark:text-stone-100">{goal.name}</p>
          {goal.targetDate && (
            <p className="text-xs text-stone-400">Objectif : {formatDateFr(goal.targetDate)}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Modifier ${goal.name}`}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-800"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Supprimer ${goal.name}`}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <ProgressBar value={goal.currentAmount} max={goal.targetAmount} status={isComplete ? 'good' : 'good'} />
      <p className="text-sm text-stone-500 dark:text-stone-400">
        {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)} ({Math.round(percent)} %)
      </p>

      {isComplete ? (
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={16} /> Objectif atteint
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            label="Contribuer"
            type="number"
            min={0}
            step={5}
            value={amount || ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="py-1.5"
            placeholder="0"
          />
          <Button size="sm" onClick={handleContribute} className="mt-6">
            Ajouter
          </Button>
        </div>
      )}
    </Card>
  )
}
