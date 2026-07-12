export interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  /** ISO date */
  targetDate?: string
  color: string
  createdAt: string
  completedAt?: string
}
