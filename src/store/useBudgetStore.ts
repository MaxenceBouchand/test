import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, BudgetMethod, Category, SavingsGoal, Transaction } from '../types'
import { APP_STATE_VERSION } from '../types'
import { STORAGE_KEY } from '../lib/storage'
import { categoricalColorAt } from '../lib/chartPalette'
import { currentMonthKey, todayIso } from '../lib/dateUtils'

function createDefaultState(): AppState {
  return {
    version: APP_STATE_VERSION,
    settings: {
      method: '50-30-20',
      monthlyIncome: 0,
      currency: 'EUR',
      theme: 'system',
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
    },
    categories: [],
    transactions: [],
    monthlyBudgets: [],
    goals: [],
  }
}

export interface BudgetStoreActions {
  addTransaction: (input: Omit<Transaction, 'id' | 'createdAt'>) => void
  updateTransaction: (id: string, patch: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => void
  deleteTransaction: (id: string) => void

  addCategory: (input: Omit<Category, 'id' | 'color'>) => void
  updateCategory: (id: string, patch: Partial<Omit<Category, 'id'>>) => void
  archiveCategory: (id: string) => void
  deleteCategory: (id: string) => void
  seedCategories: (categories: Category[]) => void

  setMethod: (method: BudgetMethod) => void
  setMonthlyIncome: (amount: number) => void
  completeOnboarding: () => void

  addGoal: (input: Omit<SavingsGoal, 'id' | 'createdAt' | 'currentAmount' | 'completedAt' | 'color'>) => void
  updateGoal: (id: string, patch: Partial<Omit<SavingsGoal, 'id' | 'createdAt'>>) => void
  deleteGoal: (id: string) => void
  contributeToGoal: (id: string, amount: number) => void

  setMonthlyBudgetOverride: (monthKey: string, categoryId: string, amount: number) => void

  importState: (state: AppState) => void
  resetState: () => void
}

export type BudgetStore = AppState & BudgetStoreActions

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      ...createDefaultState(),

      addTransaction: (input) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
          ],
        })),

      updateTransaction: (id, patch) =>
        set((state) => ({
          transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),

      deleteTransaction: (id) =>
        set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),

      addCategory: (input) =>
        set((state) => ({
          categories: [
            ...state.categories,
            {
              ...input,
              id: crypto.randomUUID(),
              color: categoricalColorAt(state.categories.length),
            },
          ],
        })),

      updateCategory: (id, patch) =>
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),

      archiveCategory: (id) =>
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, archived: true } : c)),
        })),

      deleteCategory: (id) =>
        set((state) => ({ categories: state.categories.filter((c) => c.id !== id) })),

      seedCategories: (categories) => set(() => ({ categories })),

      setMethod: (method) =>
        set((state) => ({ settings: { ...state.settings, method } })),

      setMonthlyIncome: (amount) =>
        set((state) => ({ settings: { ...state.settings, monthlyIncome: amount } })),

      completeOnboarding: () =>
        set((state) => ({ settings: { ...state.settings, onboardingCompleted: true } })),

      addGoal: (input) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              ...input,
              id: crypto.randomUUID(),
              currentAmount: 0,
              createdAt: new Date().toISOString(),
              color: categoricalColorAt(state.goals.length),
            },
          ],
        })),

      updateGoal: (id, patch) =>
        set((state) => ({ goals: state.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)) })),

      deleteGoal: (id) => set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),

      contributeToGoal: (id, amount) =>
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== id) return g
            const currentAmount = g.currentAmount + amount
            const completedAt =
              currentAmount >= g.targetAmount && !g.completedAt ? new Date().toISOString() : g.completedAt
            return { ...g, currentAmount, completedAt }
          }),
        })),

      setMonthlyBudgetOverride: (monthKey, categoryId, amount) =>
        set((state) => {
          const existing = state.monthlyBudgets.find((b) => b.monthKey === monthKey)
          if (existing) {
            return {
              monthlyBudgets: state.monthlyBudgets.map((b) =>
                b.monthKey === monthKey
                  ? { ...b, categoryBudgets: { ...b.categoryBudgets, [categoryId]: amount } }
                  : b,
              ),
            }
          }
          return {
            monthlyBudgets: [
              ...state.monthlyBudgets,
              {
                monthKey,
                method: state.settings.method,
                income: state.settings.monthlyIncome,
                categoryBudgets: { [categoryId]: amount },
              },
            ],
          }
        }),

      importState: (imported) => set(() => ({ ...imported })),

      resetState: () => set(() => createDefaultState()),
    }),
    {
      name: STORAGE_KEY,
      version: APP_STATE_VERSION,
    },
  ),
)

// Re-exported for convenience so callers don't need to reach into ./lib for these two.
export { currentMonthKey, todayIso }
