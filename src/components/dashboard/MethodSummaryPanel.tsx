import type { CategoryGroup } from '../../types'
import type { GroupTotal } from '../../lib/budgetMath'
import { formatCurrency } from '../../lib/dateUtils'
import { budgetStatusFor } from '../../lib/chartPalette'
import { Card, ProgressBar, Badge } from '../ui'
import { ZeroBasedAllocationBar } from '../categories/ZeroBasedAllocationBar'

const GROUP_LABELS: Record<CategoryGroup, string> = {
  needs: 'Besoins',
  wants: 'Envies',
  savings: 'Épargne',
}

interface MethodSummaryPanelProps {
  method: '50-30-20' | 'zero-based'
  groupTotals: GroupTotal[]
  income: number
  allocated: number
  unassigned: number
}

export function MethodSummaryPanel({ method, groupTotals, income, allocated, unassigned }: MethodSummaryPanelProps) {
  if (method === 'zero-based') {
    return <ZeroBasedAllocationBar income={income} allocated={allocated} unassigned={unassigned} />
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {groupTotals.map((g) => {
        const status = budgetStatusFor(g.spent, g.targetAmount)
        return (
          <Card key={g.group} padded className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{GROUP_LABELS[g.group]}</span>
              <Badge tone="rose">{Math.round(g.targetShare * 100)} %</Badge>
            </div>
            <ProgressBar value={g.spent} max={g.targetAmount} status={status} />
            <p className="text-xs text-stone-400">
              {formatCurrency(g.spent)} / {formatCurrency(g.targetAmount)} visé
            </p>
          </Card>
        )
      })}
    </div>
  )
}
