import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react'
import type { CategoryTotal } from '../../lib/budgetMath'
import { formatCurrency } from '../../lib/dateUtils'
import { CHART_CHROME } from '../../lib/chartPalette'
import { useIsDarkMode } from '../../hooks/useIsDarkMode'
import { Card, EmptyState } from '../ui'

interface CategoryBreakdownChartProps {
  totals: CategoryTotal[]
}

export function CategoryBreakdownChart({ totals }: CategoryBreakdownChartProps) {
  const isDark = useIsDarkMode()
  const mode = isDark ? 'dark' : 'light'
  const spending = totals.filter((t) => t.spent > 0)

  return (
    <Card header={<h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200">Répartition des dépenses</h2>}>
      {spending.length === 0 ? (
        <EmptyState
          icon={PieChartIcon}
          title="Pas encore de dépenses"
          description="Ajoutez des transactions pour voir la répartition par catégorie."
        />
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="h-56 w-full sm:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spending}
                  dataKey="spent"
                  nameKey="category.name"
                  innerRadius="55%"
                  outerRadius="85%"
                  paddingAngle={2}
                  stroke={CHART_CHROME.surface[mode]}
                  strokeWidth={2}
                  isAnimationActive={false}
                >
                  {spending.map((entry) => (
                    <Cell key={entry.category.id} fill={entry.category.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: CHART_CHROME.surface[mode],
                    border: `1px solid ${CHART_CHROME.gridline[mode]}`,
                    borderRadius: 12,
                    color: CHART_CHROME.primaryInk[mode],
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="flex-1 space-y-2">
            {spending
              .slice()
              .sort((a, b) => b.spent - a.spent)
              .map((t) => (
                <li key={t.category.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex min-w-0 items-center gap-2 truncate text-stone-600 dark:text-stone-300">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: t.category.color }} />
                    <span className="truncate">{t.category.name}</span>
                  </span>
                  <span className="shrink-0 font-medium text-stone-800 dark:text-stone-100">
                    {formatCurrency(t.spent)}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
