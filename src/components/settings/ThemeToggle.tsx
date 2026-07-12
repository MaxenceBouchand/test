import { Sun, Moon, Monitor } from 'lucide-react'
import clsx from 'clsx'
import { useBudgetStore } from '../../store/useBudgetStore'
import type { ThemeMode } from '../../types'
import { Card } from '../ui'

const OPTIONS: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Clair', icon: Sun },
  { value: 'dark', label: 'Sombre', icon: Moon },
  { value: 'system', label: 'Système', icon: Monitor },
]

export function ThemeToggle() {
  const theme = useBudgetStore((s) => s.settings.theme)
  const updateSettings = useBudgetStore.setState

  const setTheme = (value: ThemeMode) => {
    updateSettings((state) => ({ settings: { ...state.settings, theme: value } }))
  }

  return (
    <Card header={<h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200">Apparence</h2>}>
      <div className="flex gap-2">
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={clsx(
              'flex flex-1 flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-colors',
              theme === value
                ? 'border-rose-400 bg-rose-50 text-rose-700 dark:border-rose-600 dark:bg-rose-900/20 dark:text-rose-200'
                : 'border-stone-200 text-stone-500 hover:bg-stone-50 dark:border-stone-800 dark:text-stone-400 dark:hover:bg-stone-800',
            )}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
    </Card>
  )
}
