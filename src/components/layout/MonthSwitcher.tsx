import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCurrentMonth } from '../../hooks/useCurrentMonth'
import { currentMonthKey, formatMonthLabel } from '../../lib/dateUtils'

export function MonthSwitcher() {
  const { monthKey, goToPreviousMonth, goToNextMonth, goToCurrentMonth } = useCurrentMonth()
  const isCurrentMonth = monthKey === currentMonthKey()

  return (
    <div className="flex items-center gap-1 rounded-full border border-rose-100 bg-white p-1 dark:border-stone-800 dark:bg-stone-900">
      <button
        type="button"
        onClick={goToPreviousMonth}
        aria-label="Mois précédent"
        className="rounded-full p-1.5 text-rose-400 hover:bg-rose-50 dark:text-stone-400 dark:hover:bg-stone-800"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={goToCurrentMonth}
        className="min-w-32 px-2 text-center text-sm font-medium text-stone-700 hover:text-rose-600 dark:text-stone-200 dark:hover:text-rose-400"
        title={isCurrentMonth ? undefined : "Revenir au mois en cours"}
      >
        {formatMonthLabel(monthKey)}
      </button>
      <button
        type="button"
        onClick={goToNextMonth}
        aria-label="Mois suivant"
        className="rounded-full p-1.5 text-rose-400 hover:bg-rose-50 dark:text-stone-400 dark:hover:bg-stone-800"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
