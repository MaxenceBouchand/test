/**
 * Categorical/status/chrome tokens for charts, sourced from the dataviz skill's
 * validated reference palette (CVD-safe, fixed hue order — never cycled or
 * reassigned by rank). Category colors are UI brand (rose) elsewhere; these are
 * reserved for chart marks and status semantics so both stay legible together.
 */

export const CATEGORICAL_PALETTE = [
  '#2a78d6', // 1 blue
  '#1baf7a', // 2 aqua
  '#eda100', // 3 yellow
  '#008300', // 4 green
  '#4a3aa7', // 5 violet
  '#e34948', // 6 red
  '#e87ba4', // 7 magenta
  '#eb6834', // 8 orange
] as const

export const CATEGORICAL_PALETTE_DARK = [
  '#3987e5',
  '#199e70',
  '#c98500',
  '#008300',
  '#9085e9',
  '#e66767',
  '#d55181',
  '#d95926',
] as const

export const STATUS_COLORS = {
  good: { light: '#0ca30c', dark: '#0ca30c' },
  warning: { light: '#fab219', dark: '#fab219' },
  serious: { light: '#ec835a', dark: '#ec835a' },
  critical: { light: '#d03b3b', dark: '#d03b3b' },
} as const

export const CHART_CHROME = {
  surface: { light: '#fcfcfb', dark: '#1a1a19' },
  primaryInk: { light: '#0b0b0b', dark: '#ffffff' },
  secondaryInk: { light: '#52514e', dark: '#c3c2b7' },
  mutedInk: { light: '#898781', dark: '#898781' },
  gridline: { light: '#e1e0d9', dark: '#2c2c2a' },
  baseline: { light: '#c3c2b7', dark: '#383835' },
} as const

/** Deterministically assigns a fixed-order categorical color to each category id. */
export function assignCategoryColors(categoryIds: string[]): Record<string, string> {
  const map: Record<string, string> = {}
  categoryIds.forEach((id, index) => {
    map[id] = CATEGORICAL_PALETTE[index % CATEGORICAL_PALETTE.length]
  })
  return map
}

export function categoricalColorAt(index: number, isDark = false): string {
  const palette = isDark ? CATEGORICAL_PALETTE_DARK : CATEGORICAL_PALETTE
  return palette[index % palette.length]
}

export type BudgetStatus = 'good' | 'warning' | 'critical'

/** Under 80% consumed = good, 80-100% = warning, over 100% = critical. */
export function budgetStatusFor(spent: number, budget: number): BudgetStatus {
  if (budget <= 0) return spent > 0 ? 'critical' : 'good'
  const ratio = spent / budget
  if (ratio > 1) return 'critical'
  if (ratio >= 0.8) return 'warning'
  return 'good'
}

export function statusColor(status: BudgetStatus, isDark = false): string {
  const mode = isDark ? 'dark' : 'light'
  if (status === 'critical') return STATUS_COLORS.critical[mode]
  if (status === 'warning') return STATUS_COLORS.warning[mode]
  return STATUS_COLORS.good[mode]
}
