import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useBudgetStore } from '../store/useBudgetStore'
import { useCurrentMonth } from '../hooks/useCurrentMonth'
import { transactionsForMonth, activeCategories } from '../lib/budgetMath'
import type { Transaction } from '../types'
import { Modal, Button } from '../components/ui'
import { MonthSwitcher } from '../components/layout/MonthSwitcher'
import { TransactionList } from '../components/transactions/TransactionList'
import { TransactionForm } from '../components/transactions/TransactionForm'
import { TransactionFilters, type TransactionFilterValues } from '../components/transactions/TransactionFilters'

export function TransactionsPage() {
  const { monthKey } = useCurrentMonth()
  const state = useBudgetStore()
  const addTransaction = useBudgetStore((s) => s.addTransaction)
  const updateTransaction = useBudgetStore((s) => s.updateTransaction)
  const deleteTransaction = useBudgetStore((s) => s.deleteTransaction)

  const categories = activeCategories(state)
  const monthTransactions = transactionsForMonth(state.transactions, monthKey)

  const [filters, setFilters] = useState<TransactionFilterValues>({ type: 'all', categoryId: 'all' })
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | undefined>(undefined)

  const filtered = monthTransactions.filter((t) => {
    if (filters.type !== 'all' && t.type !== filters.type) return false
    if (filters.categoryId !== 'all' && t.categoryId !== filters.categoryId) return false
    return true
  })

  const openAdd = () => {
    setEditing(undefined)
    setModalOpen(true)
  }
  const openEdit = (id: string) => {
    setEditing(state.transactions.find((t) => t.id === id))
    setModalOpen(true)
  }
  const closeModal = () => setModalOpen(false)

  const handleSubmit = (values: Omit<Transaction, 'id' | 'createdAt'>) => {
    if (editing) {
      updateTransaction(editing.id, values)
    } else {
      addTransaction(values)
    }
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Supprimer cette transaction ?')) deleteTransaction(id)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">Transactions</h1>
        <div className="flex items-center gap-3">
          <MonthSwitcher />
          <Button onClick={openAdd} icon={<Plus size={16} />} size="sm">
            Ajouter
          </Button>
        </div>
      </div>

      {categories.length > 0 && (
        <TransactionFilters categories={categories} value={filters} onChange={setFilters} />
      )}

      <TransactionList transactions={filtered} categories={categories} onEdit={openEdit} onDelete={handleDelete} />

      <Modal open={modalOpen} title={editing ? 'Modifier la transaction' : 'Nouvelle transaction'} onClose={closeModal}>
        <TransactionForm categories={categories} initial={editing} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </div>
  )
}
