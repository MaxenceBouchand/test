import type { AppState, Category, CategoryGroup, Transaction } from '../types'
import { isDateInMonth, shiftMonthKey } from './dateUtils'
import { type BudgetStatus, budgetStatusFor } from './chartPalette'

export function activeCategories(state: AppState): Category[] {
  return state.categories.filter((c) => !c.archived)
}

export function transactionsForMonth(transactions: Transaction[], monthKey: string): Transaction[] {
  return transactions.filter((t) => isDateInMonth(t.date, monthKey))
}

/** Per-month override if one was recorded for this month, else the category's default. */
export function resolveCategoryBudget(state: AppState, categoryId: string, monthKey: string): number {
  const snapshot = state.monthlyBudgets.find((b) => b.monthKey === monthKey)
  if (snapshot && snapshot.categoryBudgets[categoryId] !== undefined) {
    return snapshot.categoryBudgets[categoryId]
  }
  const category = state.categories.find((c) => c.id === categoryId)
  return category?.monthlyBudget ?? 0
}

/**
 * Actual recorded income for the month if any income transactions exist,
 * otherwise the planned income (per-month snapshot, falling back to settings).
 * This lets the dashboard show a plan before the user logs real income, then
 * switch to reality once they do.
 */
export function monthIncome(state: AppState, monthKey: string): number {
  const monthTx = transactionsForMonth(state.transactions, monthKey)
  const actual = monthTx.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  if (actual > 0) return actual

  const snapshot = state.monthlyBudgets.find((b) => b.monthKey === monthKey)
  return snapshot?.income ?? state.settings.monthlyIncome
}

export function categorySpent(transactions: Transaction[], categoryId: string, monthKey: string): number {
  return transactionsForMonth(transactions, monthKey)
    .filter((t) => t.type === 'expense' && t.categoryId === categoryId)
    .reduce((sum, t) => sum + t.amount, 0)
}

export interface CategoryTotal {
  category: Category
  budget: number
  spent: number
  remaining: number
  percentUsed: number
  status: BudgetStatus
}

export function getCategoryTotals(state: AppState, monthKey: string): CategoryTotal[] {
  return activeCategories(state).map((category) => {
    const budget = resolveCategoryBudget(state, category.id, monthKey)
    const spent = categorySpent(state.transactions, category.id, monthKey)
    const remaining = budget - spent
    const percentUsed = budget > 0 ? spent / budget : spent > 0 ? Infinity : 0
    return {
      category,
      budget,
      spent,
      remaining,
      percentUsed,
      status: budgetStatusFor(spent, budget),
    }
  })
}

export interface GroupTotal {
  group: CategoryGroup
  targetShare: number
  targetAmount: number
  allocated: number
  spent: number
  remaining: number
}

const GROUP_TARGET_SHARE: Record<CategoryGroup, number> = {
  needs: 0.5,
  wants: 0.3,
  savings: 0.2,
}

export function getGroupTotals(state: AppState, monthKey: string): GroupTotal[] {
  const income = monthIncome(state, monthKey)
  const totals = getCategoryTotals(state, monthKey)
  const groups: CategoryGroup[] = ['needs', 'wants', 'savings']

  return groups.map((group) => {
    const inGroup = totals.filter((t) => t.category.group === group)
    const allocated = inGroup.reduce((sum, t) => sum + t.budget, 0)
    const spent = inGroup.reduce((sum, t) => sum + t.spent, 0)
    const targetShare = GROUP_TARGET_SHARE[group]
    const targetAmount = income * targetShare
    return {
      group,
      targetShare,
      targetAmount,
      allocated,
      spent,
      remaining: targetAmount - spent,
    }
  })
}

/** For zero-based budgeting: what's left of income once every category budget is subtracted. */
export function getUnassignedAmount(state: AppState, monthKey: string): number {
  const income = monthIncome(state, monthKey)
  const allocated = activeCategories(state).reduce(
    (sum, c) => sum + resolveCategoryBudget(state, c.id, monthKey),
    0,
  )
  return income - allocated
}

export interface MonthSummary {
  monthKey: string
  income: number
  totalSpent: number
  totalBudget: number
  remaining: number
  savingsRate: number
}

export function getMonthSummary(state: AppState, monthKey: string): MonthSummary {
  const income = monthIncome(state, monthKey)
  const totals = getCategoryTotals(state, monthKey)
  const totalSpent = totals.reduce((sum, t) => sum + t.spent, 0)
  const totalBudget = totals.reduce((sum, t) => sum + t.budget, 0)
  const remaining = income - totalSpent
  const savingsRate = income > 0 ? remaining / income : 0
  return { monthKey, income, totalSpent, totalBudget, remaining, savingsRate }
}

export function getOverspentCategories(state: AppState, monthKey: string): CategoryTotal[] {
  return getCategoryTotals(state, monthKey).filter((t) => t.status === 'critical')
}

export function hasReportableData(state: AppState, monthKey: string): boolean {
  const summary = getMonthSummary(state, monthKey)
  const categoryTotals = getCategoryTotals(state, monthKey)
  return summary.income > 0 || summary.totalSpent > 0 || categoryTotals.some((t) => t.budget > 0)
}

export interface MonthTrendPoint {
  monthKey: string
  income: number
  spent: number
}

export function getMonthlyTrend(state: AppState, monthsBack: number, endMonthKey: string): MonthTrendPoint[] {
  const points: MonthTrendPoint[] = []
  for (let i = monthsBack - 1; i >= 0; i--) {
    const monthKey = shiftMonthKey(endMonthKey, -i)
    const summary = getMonthSummary(state, monthKey)
    points.push({ monthKey, income: summary.income, spent: summary.totalSpent })
  }
  return points
}
