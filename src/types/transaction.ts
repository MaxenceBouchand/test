export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  type: TransactionType
  /** always positive; sign implied by `type` */
  amount: number
  categoryId: string | null
  /** ISO date "YYYY-MM-DD" */
  date: string
  note?: string
  createdAt: string
}
