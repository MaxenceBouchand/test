import type { BudgetMethod, Category, CategoryGroup } from '../types'
import { assignCategoryColors } from './chartPalette'

interface CategoryTemplate {
  name: string
  icon: string
  group: CategoryGroup
  isEssential?: boolean
}

const TEMPLATES: CategoryTemplate[] = [
  { name: 'Logement', icon: 'Home', group: 'needs', isEssential: true },
  { name: 'Alimentation', icon: 'ShoppingCart', group: 'needs', isEssential: true },
  { name: 'Transport', icon: 'Car', group: 'needs', isEssential: true },
  { name: 'Assurances & santé', icon: 'HeartPulse', group: 'needs', isEssential: true },
  { name: 'Factures & énergie', icon: 'Zap', group: 'needs', isEssential: true },
  { name: 'Loisirs & sorties', icon: 'PartyPopper', group: 'wants' },
  { name: 'Abonnements', icon: 'Tv', group: 'wants' },
  { name: 'Shopping', icon: 'ShoppingBag', group: 'wants' },
  { name: 'Épargne', icon: 'PiggyBank', group: 'savings' },
  { name: 'Remboursement de dettes', icon: 'CreditCard', group: 'savings' },
]

const GROUP_SHARE: Record<CategoryGroup, number> = {
  needs: 0.5,
  wants: 0.3,
  savings: 0.2,
}

export function buildSeedCategories(method: BudgetMethod, monthlyIncome: number): Category[] {
  const byGroup: Record<CategoryGroup, CategoryTemplate[]> = {
    needs: TEMPLATES.filter((t) => t.group === 'needs'),
    wants: TEMPLATES.filter((t) => t.group === 'wants'),
    savings: TEMPLATES.filter((t) => t.group === 'savings'),
  }

  const categories: Category[] = TEMPLATES.map((template) => {
    const groupCategories = byGroup[template.group]
    const groupBudget = monthlyIncome * GROUP_SHARE[template.group]
    const monthlyBudget =
      method === '50-30-20' && monthlyIncome > 0
        ? Math.round((groupBudget / groupCategories.length) * 100) / 100
        : 0

    return {
      id: crypto.randomUUID(),
      name: template.name,
      icon: template.icon,
      group: method === '50-30-20' ? template.group : template.group,
      monthlyBudget,
      color: '',
      isEssential: template.isEssential,
    }
  })

  const colors = assignCategoryColors(categories.map((c) => c.id))
  return categories.map((c) => ({ ...c, color: colors[c.id] }))
}
