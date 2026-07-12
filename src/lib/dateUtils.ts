import { format, parse, addMonths, subMonths, startOfMonth, isSameMonth } from 'date-fns'
import { fr } from 'date-fns/locale'

const MONTH_KEY_FORMAT = 'yyyy-MM'

export function monthKeyOf(date: Date): string {
  return format(date, MONTH_KEY_FORMAT)
}

export function currentMonthKey(): string {
  return monthKeyOf(new Date())
}

export function monthKeyToDate(monthKey: string): Date {
  return parse(monthKey, MONTH_KEY_FORMAT, new Date())
}

export function shiftMonthKey(monthKey: string, delta: number): string {
  const date = monthKeyToDate(monthKey)
  const shifted = delta >= 0 ? addMonths(date, delta) : subMonths(date, -delta)
  return monthKeyOf(shifted)
}

export function formatMonthLabel(monthKey: string): string {
  const date = monthKeyToDate(monthKey)
  const label = format(date, 'MMMM yyyy', { locale: fr })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function isDateInMonth(isoDate: string, monthKey: string): boolean {
  const date = parse(isoDate, 'yyyy-MM-dd', new Date())
  return isSameMonth(date, monthKeyToDate(monthKey))
}

export function dateKeyOf(monthKey: string): Date {
  return startOfMonth(monthKeyToDate(monthKey))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDateFr(isoDate: string): string {
  const date = parse(isoDate, 'yyyy-MM-dd', new Date())
  return format(date, 'd MMMM yyyy', { locale: fr })
}

export function todayIso(): string {
  return format(new Date(), 'yyyy-MM-dd')
}
