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
        'rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900',
        className,
      )}
      {...rest}
    >
      {header && (
        <div className="border-b border-stone-100 px-6 py-4 dark:border-stone-800">{header}</div>
      )}
      <div className={padded ? 'p-6' : undefined}>{children}</div>
    </div>
  )
}
