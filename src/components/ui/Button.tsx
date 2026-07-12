import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type Size = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-gradient-brand-strong text-white shadow-glow-rose hover:brightness-105 active:brightness-95 disabled:bg-none disabled:bg-rose-300 disabled:shadow-none dark:disabled:bg-rose-900 dark:disabled:text-stone-500',
  secondary:
    'border border-rose-200 bg-white text-rose-700 hover:bg-rose-50 disabled:text-stone-300 dark:border-stone-700 dark:bg-stone-900 dark:text-rose-200 dark:hover:bg-stone-800',
  ghost:
    'text-stone-600 hover:bg-rose-50 disabled:text-stone-300 dark:text-stone-300 dark:hover:bg-stone-800',
  destructive:
    'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 dark:bg-red-500 dark:hover:bg-red-400',
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-full font-medium transition-all disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}
