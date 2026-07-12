import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, id, className, ...rest }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-stone-700 dark:text-stone-200">
        {label}
      </label>
      <input
        id={inputId}
        className={clsx(
          'rounded-2xl border bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm outline-none transition-colors',
          'placeholder:text-stone-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100',
          'dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:ring-rose-900/40',
          error
            ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
            : 'border-rose-200 dark:border-stone-700',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-xs text-stone-400">
          {hint}
        </p>
      )}
    </div>
  )
}
