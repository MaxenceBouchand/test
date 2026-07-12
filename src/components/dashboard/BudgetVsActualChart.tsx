import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { BarChart3 } from 'lucide-react'
import type { CategoryTotal } from '../../lib/budgetMath'
import { formatCurrency } from '../../lib/dateUtils'
import { CHART_CHROME, statusColor } from '../../lib/chartPalette'
import { useIsDarkMode } from '../../hooks/useIsDarkMode'
import { Card, EmptyState } from '../ui'

interface BudgetVsActualChartProps {
  totals: CategoryTotal[]
}

export function BudgetVsActualChart({ totals }: BudgetVsActualChartProps) {
  const isDark = useIsDarkMode()
  const mode = isDark ? 'dark' : 'light'
  const withBudget = totals.filter((t) => t.budget > 0 || t.spent > 0)

  const chromeGridline = CHART_CHROME.gridline[mode]
  const chromeMuted = CHART_CHROME.mutedInk[mode]
  const budgetTrackColor = isDark ? '#383835' : '#c3c2b7'

  return (
    <Card header={<h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200">Budget vs dépensé</h2>}>
      {withBudget.length === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="Rien à comparer pour l'instant"
          description="Ajoutez des budgets et des transactions pour comparer le prévu et le réel."
        />
      ) : (
        <>
          <div style={{ height: Math.max(180, withBudget.length * 44) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={withBudget} layout="vertical" margin={{ left: 8, right: 16 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke={chromeGridline} horizontal={false} />
                <XAxis
                  type="number"
                  tickFormatter={(v) => formatCurrency(v)}
                  tick={{ fill: chromeMuted, fontSize: 11 }}
                  axisLine={{ stroke: chromeGridline }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="category.name"
                  width={110}
                  tick={{ fill: chromeMuted, fontSize: 12 }}
                  axisLine={{ stroke: chromeGridline }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: CHART_CHROME.surface[mode],
                    border: `1px solid ${chromeGridline}`,
                    borderRadius: 12,
                    color: CHART_CHROME.primaryInk[mode],
                    fontSize: 13,
                  }}
                />
                <Bar
                  dataKey="budget"
                  name="Budget"
                  fill={budgetTrackColor}
                  radius={[4, 4, 4, 4]}
                  barSize={10}
                  isAnimationActive={false}
                />
                <Bar dataKey="spent" name="Dépensé" radius={[4, 4, 4, 4]} barSize={10} isAnimationActive={false}>
                  {withBudget.map((entry) => (
                    <Cell key={entry.category.id} fill={statusColor(entry.status, isDark)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: budgetTrackColor }} /> Budget
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: statusColor('good', isDark) }} /> Dans le budget
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: statusColor('warning', isDark) }} /> Presque atteint
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: statusColor('critical', isDark) }} /> Dépassé
            </span>
          </div>
        </>
      )}
    </Card>
  )
}
