import { useState } from 'react'
import { useBudgetStore } from '../store/useBudgetStore'
import { useCategoryTotals, useUnassignedAmount, useMonthSummary } from '../store/selectors'
import { useCurrentMonth } from '../hooks/useCurrentMonth'
import type { Category } from '../types'
import { Modal } from '../components/ui'
import { MonthSwitcher } from '../components/layout/MonthSwitcher'
import { CategoryList } from '../components/categories/CategoryList'
import { CategoryForm } from '../components/categories/CategoryForm'
import { ZeroBasedAllocationBar } from '../components/categories/ZeroBasedAllocationBar'

export function CategoriesPage() {
  const { monthKey } = useCurrentMonth()
  const method = useBudgetStore((s) => s.settings.method)
  const addCategory = useBudgetStore((s) => s.addCategory)
  const updateCategory = useBudgetStore((s) => s.updateCategory)
  const archiveCategory = useBudgetStore((s) => s.archiveCategory)
  const deleteCategory = useBudgetStore((s) => s.deleteCategory)
  const categories = useBudgetStore((s) => s.categories)

  const totals = useCategoryTotals(monthKey)
  const unassigned = useUnassignedAmount(monthKey)
  const summary = useMonthSummary(monthKey)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Category | undefined>(undefined)

  const openAdd = () => {
    setEditing(undefined)
    setModalOpen(true)
  }
  const openEdit = (id: string) => {
    setEditing(categories.find((c) => c.id === id))
    setModalOpen(true)
  }
  const closeModal = () => setModalOpen(false)

  const handleSubmit = (values: { name: string; icon: string; group?: Category['group']; monthlyBudget: number }) => {
    if (editing) {
      updateCategory(editing.id, values)
    } else {
      addCategory(values)
    }
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    const category = categories.find((c) => c.id === id)
    if (!category) return
    const confirmed = window.confirm(`Supprimer définitivement la catégorie « ${category.name} » ?`)
    if (confirmed) deleteCategory(id)
  }

  const allocated = totals.reduce((sum, t) => sum + t.budget, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">Catégories</h1>
        <MonthSwitcher />
      </div>

      {method === 'zero-based' && (
        <ZeroBasedAllocationBar income={summary.income} allocated={allocated} unassigned={unassigned} />
      )}

      <CategoryList
        totals={totals}
        method={method}
        onAdd={openAdd}
        onEdit={openEdit}
        onArchive={archiveCategory}
        onDelete={handleDelete}
      />

      <Modal open={modalOpen} title={editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'} onClose={closeModal}>
        <CategoryForm method={method} initial={editing} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </div>
  )
}
