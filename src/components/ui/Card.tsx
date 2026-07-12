import type { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode
  padded?: boolean
}

export function Card({ header, padded = true, className, children, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-3xl border border-rose-100 bg-white shadow-[0_4px_20px_-8px_rgba(240,73,138,0.18)] dark:border-stone-800 dark:bg-stone-900 dark:shadow-none',
        className,
      )}
      {...rest}
    >
      {header && (
        <div className="border-b border-rose-50 px-6 py-4 dark:border-stone-800">{header}</div>
      )}
      <div className={padded ? 'p-6' : undefined}>{children}</div>
    </div>
  )
}
