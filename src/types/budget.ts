import type { BudgetMethod } from './category'

export interface MonthlyBudget {
  /** "YYYY-MM" */
  monthKey: string
  method: BudgetMethod
  income: number
  /** categoryId -> allocated amount for that month */
  categoryBudgets: Record<string, number>
}
