import { useBudgetStore } from '../store/useBudgetStore'
import { useCategoryTotals, useGroupTotals, useMonthSummary, useOverspentCategories, useUnassignedAmount } from '../store/selectors'
import { useCurrentMonth } from '../hooks/useCurrentMonth'
import { MonthSwitcher } from '../components/layout/MonthSwitcher'
import { SummaryCards } from '../components/dashboard/SummaryCards'
import { MethodSummaryPanel } from '../components/dashboard/MethodSummaryPanel'
import { OverspendAlerts } from '../components/dashboard/OverspendAlerts'
import { CategoryBreakdownChart } from '../components/dashboard/CategoryBreakdownChart'
import { BudgetVsActualChart } from '../components/dashboard/BudgetVsActualChart'
import { ReportDownloadButton } from '../components/dashboard/ReportDownloadButton'

export function DashboardPage() {
  const { monthKey } = useCurrentMonth()
  const method = useBudgetStore((s) => s.settings.method)

  const summary = useMonthSummary(monthKey)
  const categoryTotals = useCategoryTotals(monthKey)
  const groupTotals = useGroupTotals(monthKey)
  const unassigned = useUnassignedAmount(monthKey)
  const overspent = useOverspentCategories(monthKey)

  const allocated = categoryTotals.reduce((sum, t) => sum + t.budget, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">Tableau de bord</h1>
        <div className="flex items-center gap-3">
          <MonthSwitcher />
          <ReportDownloadButton monthKey={monthKey} />
        </div>
      </div>

      <SummaryCards summary={summary} />

      <OverspendAlerts overspent={overspent} />

      <MethodSummaryPanel
        method={method}
        groupTotals={groupTotals}
        income={summary.income}
        allocated={allocated}
        unassigned={unassigned}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <CategoryBreakdownChart totals={categoryTotals} />
        <BudgetVsActualChart totals={categoryTotals} />
      </div>
    </div>
  )
}
