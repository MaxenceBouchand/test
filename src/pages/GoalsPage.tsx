import { useState } from 'react'
import { useBudgetStore } from '../store/useBudgetStore'
import type { SavingsGoal } from '../types'
import { Modal } from '../components/ui'
import { GoalList } from '../components/goals/GoalList'
import { GoalForm } from '../components/goals/GoalForm'

export function GoalsPage() {
  const goals = useBudgetStore((s) => s.goals)
  const addGoal = useBudgetStore((s) => s.addGoal)
  const updateGoal = useBudgetStore((s) => s.updateGoal)
  const deleteGoal = useBudgetStore((s) => s.deleteGoal)
  const contributeToGoal = useBudgetStore((s) => s.contributeToGoal)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<SavingsGoal | undefined>(undefined)

  const openAdd = () => {
    setEditing(undefined)
    setModalOpen(true)
  }
  const openEdit = (id: string) => {
    setEditing(goals.find((g) => g.id === id))
    setModalOpen(true)
  }
  const closeModal = () => setModalOpen(false)

  const handleSubmit = (values: { name: string; targetAmount: number; targetDate?: string }) => {
    if (editing) {
      updateGoal(editing.id, values)
    } else {
      addGoal(values)
    }
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    const goal = goals.find((g) => g.id === id)
    if (!goal) return
    if (window.confirm(`Supprimer l'objectif « ${goal.name} » ?`)) deleteGoal(id)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">Objectifs</h1>

      <GoalList
        goals={goals}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onContribute={contributeToGoal}
      />

      <Modal open={modalOpen} title={editing ? "Modifier l'objectif" : 'Nouvel objectif'} onClose={closeModal}>
        <GoalForm initial={editing} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </div>
  )
}
