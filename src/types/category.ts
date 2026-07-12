export type BudgetMethod = '50-30-20' | 'zero-based'

/** Only meaningful when the active method is '50-30-20'. */
export type CategoryGroup = 'needs' | 'wants' | 'savings'

export interface Category {
  id: string
  name: string
  /** lucide-react icon name */
  icon: string
  group?: CategoryGroup
  monthlyBudget: number
  /** key into the app's chart/category color palette */
  color: string
  isEssential?: boolean
  archived?: boolean
}
