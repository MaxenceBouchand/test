import type { BudgetMethod } from './category'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface UserSettings {
  method: BudgetMethod
  monthlyIncome: number
  currency: 'EUR'
  theme: ThemeMode
  onboardingCompleted: boolean
  createdAt: string
}
