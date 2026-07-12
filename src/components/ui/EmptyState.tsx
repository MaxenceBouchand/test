import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Blob } from './Blob'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="relative isolate flex flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-dashed border-rose-200 px-6 py-14 text-center dark:border-stone-800">
      <Blob variant="blob" size={220} className="absolute -top-16 -right-10 -z-10" />
      <div className="flex size-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow-rose">
        <Icon size={24} />
      </div>
      <h3 className="font-display text-base font-semibold text-stone-800 dark:text-stone-100">{title}</h3>
      <p className="max-w-sm text-sm text-stone-500 dark:text-stone-400">{description}</p>
      {action}
    </div>
  )
}
