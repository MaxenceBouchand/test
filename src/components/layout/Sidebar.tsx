import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowRightLeft,
  Tags,
  BookOpen,
  Target,
  TrendingUp,
  Settings,
  PiggyBank,
} from 'lucide-react'
import clsx from 'clsx'

const NAV_ITEMS: { to: string; label: string; icon: typeof LayoutDashboard; end?: boolean }[] = [
  { to: '/', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/transactions', label: 'Transactions', icon: ArrowRightLeft },
  { to: '/categories', label: 'Catégories', icon: Tags },
  { to: '/objectifs', label: 'Objectifs', icon: Target },
  { to: '/historique', label: 'Historique', icon: TrendingUp },
  { to: '/apprendre', label: 'Apprendre', icon: BookOpen },
  { to: '/parametres', label: 'Paramètres', icon: Settings },
]

export function Sidebar() {
  return (
    <>
      <aside className="hidden w-60 shrink-0 border-r border-stone-200 bg-white md:flex md:flex-col dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="flex size-8 items-center justify-center rounded-xl bg-rose-500 text-white">
            <PiggyBank size={18} />
          </div>
          <span className="text-base font-semibold text-stone-900 dark:text-stone-50">Budget rose</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200'
                    : 'text-stone-600 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800',
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Icon-only on mobile: 7 items with text labels don't fit a narrow viewport without overflowing. */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-stone-200 bg-white/95 py-1 backdrop-blur-sm md:hidden dark:border-stone-800 dark:bg-stone-900/95">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            aria-label={label}
            title={label}
            className={({ isActive }) =>
              clsx(
                'flex flex-1 items-center justify-center rounded-lg py-2.5',
                isActive ? 'text-rose-600 dark:text-rose-400' : 'text-stone-500 dark:text-stone-400',
              )
            }
          >
            <Icon size={21} />
          </NavLink>
        ))}
      </nav>
    </>
  )
}
