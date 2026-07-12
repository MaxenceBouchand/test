import { Wallet, TrendingDown, PiggyBank, Percent } from 'lucide-react'
import type { MonthSummary } from '../../lib/budgetMath'
import { formatCurrency } from '../../lib/dateUtils'
import { Card } from '../ui'

interface SummaryCardsProps {
  summary: MonthSummary
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const tiles = [
    { label: 'Revenu du mois', value: formatCurrency(summary.income), icon: Wallet, tone: 'text-stone-700 dark:text-stone-200' },
    { label: 'Dépensé', value: formatCurrency(summary.totalSpent), icon: TrendingDown, tone: 'text-stone-700 dark:text-stone-200' },
    {
      label: 'Solde restant',
      value: formatCurrency(summary.remaining),
      icon: PiggyBank,
      tone: summary.remaining < 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: "Taux d'épargne",
      value: `${Math.round(summary.savingsRate * 100)} %`,
      icon: Percent,
      tone: summary.savingsRate < 0 ? 'text-red-600 dark:text-red-400' : 'text-stone-700 dark:text-stone-200',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {tiles.map(({ label, value, icon: Icon, tone }) => (
        <Card key={label} padded className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-stone-400">
            <Icon size={15} />
            <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
          </div>
          <span className={`text-xl font-semibold ${tone}`}>{value}</span>
        </Card>
      ))}
    </div>
  )
}
