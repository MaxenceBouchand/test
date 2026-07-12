import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-200 px-6 py-14 text-center dark:border-stone-800">
      <div className="flex size-12 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-900/30 dark:text-rose-300">
        <Icon size={22} />
      </div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-100">{title}</h3>
      <p className="max-w-sm text-sm text-stone-500 dark:text-stone-400">{description}</p>
      {action}
    </div>
  )
}
