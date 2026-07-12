import type { Category } from './category'
import type { Transaction } from './transaction'
import type { MonthlyBudget } from './budget'
import type { SavingsGoal } from './goal'
import type { UserSettings } from './settings'

export * from './category'
export * from './transaction'
export * from './budget'
export * from './goal'
export * from './settings'

export const APP_STATE_VERSION = 1

export interface AppState {
  version: number
  settings: UserSettings
  categories: Category[]
  transactions: Transaction[]
  monthlyBudgets: MonthlyBudget[]
  goals: SavingsGoal[]
}
