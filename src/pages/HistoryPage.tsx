import { useMonthlyTrend } from '../store/selectors'
import { useCurrentMonth } from '../hooks/useCurrentMonth'
import { formatCurrency, formatMonthLabel } from '../lib/dateUtils'
import { MonthSwitcher } from '../components/layout/MonthSwitcher'
import { TrendChart } from '../components/history/TrendChart'
import { Card } from '../components/ui'

export function HistoryPage() {
  const { monthKey } = useCurrentMonth()
  const points = useMonthlyTrend(6, monthKey)
  const rows = [...points].reverse()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">Historique</h1>
        <MonthSwitcher />
      </div>

      <TrendChart points={points} />

      <Card header={<h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200">Comparatif mensuel</h2>} padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-xs uppercase tracking-wide text-stone-400 dark:border-stone-800">
                <th className="px-6 py-3 font-medium">Mois</th>
                <th className="px-6 py-3 font-medium">Revenu</th>
                <th className="px-6 py-3 font-medium">Dépensé</th>
                <th className="px-6 py-3 font-medium">Solde</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((point) => {
                const remaining = point.income - point.spent
                return (
                  <tr key={point.monthKey} className="border-b border-stone-50 last:border-0 dark:border-stone-900">
                    <td className="px-6 py-3 text-stone-700 dark:text-stone-200">{formatMonthLabel(point.monthKey)}</td>
                    <td className="px-6 py-3 text-stone-600 dark:text-stone-300">{formatCurrency(point.income)}</td>
                    <td className="px-6 py-3 text-stone-600 dark:text-stone-300">{formatCurrency(point.spent)}</td>
                    <td
                      className={
                        remaining < 0
                          ? 'px-6 py-3 font-medium text-red-600 dark:text-red-400'
                          : 'px-6 py-3 font-medium text-emerald-600 dark:text-emerald-400'
                      }
                    >
                      {formatCurrency(remaining)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
