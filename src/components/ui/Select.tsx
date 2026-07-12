import type { SelectHTMLAttributes } from 'react'
import { useId } from 'react'
import clsx from 'clsx'

interface Option {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
  error?: string
}

export function Select({ label, options, error, id, className, ...rest }: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-stone-700 dark:text-stone-200">
        {label}
      </label>
      <select
        id={selectId}
        className={clsx(
          'rounded-2xl border bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm outline-none transition-colors',
          'focus:border-rose-400 focus:ring-2 focus:ring-rose-100',
          'dark:bg-stone-900 dark:text-stone-100 dark:focus:ring-rose-900/40',
          error ? 'border-red-400' : 'border-rose-200 dark:border-stone-700',
          className,
        )}
        aria-invalid={Boolean(error)}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}
