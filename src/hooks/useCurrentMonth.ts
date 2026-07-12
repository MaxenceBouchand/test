import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { currentMonthKey, shiftMonthKey } from '../lib/dateUtils'

/** The active month is driven by the `?month=YYYY-MM` query param so it survives refresh and is shareable. */
export function useCurrentMonth() {
  const [searchParams, setSearchParams] = useSearchParams()
  const monthKey = searchParams.get('month') ?? currentMonthKey()

  const setMonthKey = useCallback(
    (next: string) => {
      const params = new URLSearchParams(searchParams)
      params.set('month', next)
      setSearchParams(params)
    },
    [searchParams, setSearchParams],
  )

  const goToPreviousMonth = useCallback(() => setMonthKey(shiftMonthKey(monthKey, -1)), [monthKey, setMonthKey])
  const goToNextMonth = useCallback(() => setMonthKey(shiftMonthKey(monthKey, 1)), [monthKey, setMonthKey])
  const goToCurrentMonth = useCallback(() => setMonthKey(currentMonthKey()), [setMonthKey])

  return useMemo(
    () => ({ monthKey, setMonthKey, goToPreviousMonth, goToNextMonth, goToCurrentMonth }),
    [monthKey, setMonthKey, goToPreviousMonth, goToNextMonth, goToCurrentMonth],
  )
}
