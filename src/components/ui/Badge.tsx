import type { ReactNode } from 'react'
import clsx from 'clsx'

type Tone = 'rose' | 'stone' | 'good' | 'warning' | 'critical'

interface BadgeProps {
  children: ReactNode
  tone?: Tone
  className?: string
}

const TONE_CLASSES: Record<Tone, string> = {
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200',
  stone: 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300',
  good: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

export function Badge({ children, tone = 'stone', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
