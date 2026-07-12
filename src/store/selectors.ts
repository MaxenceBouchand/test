import { useMemo } from 'react'
import { useBudgetStore } from './useBudgetStore'
import {
  getCategoryTotals,
  getGroupTotals,
  getMonthSummary,
  getMonthlyTrend,
  getOverspentCategories,
  getUnassignedAmount,
} from '../lib/budgetMath'

export function useMonthSummary(monthKey: string) {
  const state = useBudgetStore()
  return useMemo(() => getMonthSummary(state, monthKey), [state, monthKey])
}

export function useCategoryTotals(monthKey: string) {
  const state = useBudgetStore()
  return useMemo(() => getCategoryTotals(state, monthKey), [state, monthKey])
}

export function useGroupTotals(monthKey: string) {
  const state = useBudgetStore()
  return useMemo(() => getGroupTotals(state, monthKey), [state, monthKey])
}

export function useUnassignedAmount(monthKey: string) {
  const state = useBudgetStore()
  return useMemo(() => getUnassignedAmount(state, monthKey), [state, monthKey])
}

export function useOverspentCategories(monthKey: string) {
  const state = useBudgetStore()
  return useMemo(() => getOverspentCategories(state, monthKey), [state, monthKey])
}

export function useMonthlyTrend(monthsBack: number, endMonthKey: string) {
  const state = useBudgetStore()
  return useMemo(() => getMonthlyTrend(state, monthsBack, endMonthKey), [state, monthsBack, endMonthKey])
}
