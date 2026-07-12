import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'
import type { MonthTrendPoint } from '../../lib/budgetMath'
import { formatCurrency, formatMonthLabel } from '../../lib/dateUtils'
import { CATEGORICAL_PALETTE, CATEGORICAL_PALETTE_DARK, CHART_CHROME } from '../../lib/chartPalette'
import { useIsDarkMode } from '../../hooks/useIsDarkMode'
import { Card, EmptyState } from '../ui'

interface TrendChartProps {
  points: MonthTrendPoint[]
}

export function TrendChart({ points }: TrendChartProps) {
  const isDark = useIsDarkMode()
  const mode = isDark ? 'dark' : 'light'
  const palette = isDark ? CATEGORICAL_PALETTE_DARK : CATEGORICAL_PALETTE
  const hasData = points.some((p) => p.income > 0 || p.spent > 0)

  const data = points.map((p) => ({ ...p, label: formatMonthLabel(p.monthKey).split(' ')[0] }))

  return (
    <Card header={<h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200">Tendance sur 6 mois</h2>}>
      {!hasData ? (
        <EmptyState
          icon={TrendingUp}
          title="Pas encore d'historique"
          description="Revenez d'ici quelques mois pour voir l'évolution de votre budget."
        />
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 4, right: 16, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_CHROME.gridline[mode]} vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: CHART_CHROME.mutedInk[mode], fontSize: 12 }}
                axisLine={{ stroke: CHART_CHROME.gridline[mode] }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => formatCurrency(v)}
                tick={{ fill: CHART_CHROME.mutedInk[mode], fontSize: 11 }}
                axisLine={{ stroke: CHART_CHROME.gridline[mode] }}
                tickLine={false}
                width={80}
              />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(_, payload) => (payload?.[0] ? formatMonthLabel(payload[0].payload.monthKey) : '')}
                contentStyle={{
                  backgroundColor: CHART_CHROME.surface[mode],
                  border: `1px solid ${CHART_CHROME.gridline[mode]}`,
                  borderRadius: 12,
                  color: CHART_CHROME.primaryInk[mode],
                  fontSize: 13,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: CHART_CHROME.secondaryInk[mode] }} />
              <Line
                type="monotone"
                dataKey="income"
                name="Revenu"
                stroke={palette[0]}
                strokeWidth={2}
                dot={{ r: 3 }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="spent"
                name="Dépensé"
                stroke={palette[1]}
                strokeWidth={2}
                dot={{ r: 3 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
