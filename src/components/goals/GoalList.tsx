import { Target, Plus } from 'lucide-react'
import type { SavingsGoal } from '../../types'
import { Button, EmptyState } from '../ui'
import { GoalCard } from './GoalCard'

interface GoalListProps {
  goals: SavingsGoal[]
  onAdd: () => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onContribute: (id: string, amount: number) => void
}

export function GoalList({ goals, onAdd, onEdit, onDelete, onContribute }: GoalListProps) {
  if (goals.length === 0) {
    return (
      <EmptyState
        icon={Target}
        title="Aucun objectif d'épargne"
        description="Créez un objectif pour donner un cap concret à votre épargne."
        action={
          <Button onClick={onAdd} icon={<Plus size={16} />}>
            Créer un objectif
          </Button>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={onAdd} icon={<Plus size={16} />} size="sm">
          Nouvel objectif
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={() => onEdit(goal.id)}
            onDelete={() => onDelete(goal.id)}
            onContribute={(amount) => onContribute(goal.id, amount)}
          />
        ))}
      </div>
    </div>
  )
}
