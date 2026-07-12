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
      <aside className="hidden w-60 shrink-0 border-r border-rose-100 bg-white md:flex md:flex-col dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="flex size-9 items-center justify-center rounded-2xl bg-gradient-brand-strong text-white shadow-glow-rose">
            <PiggyBank size={19} />
          </div>
          <span className="font-display text-lg font-bold text-rose-700 dark:text-rose-300">Budget rose</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-full px-3.5 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-gradient-brand text-white shadow-glow-rose'
                    : 'text-stone-600 hover:bg-rose-50 dark:text-stone-300 dark:hover:bg-stone-800',
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
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-rose-100 bg-white/95 py-1.5 backdrop-blur-sm md:hidden dark:border-stone-800 dark:bg-stone-900/95">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            aria-label={label}
            title={label}
            className={({ isActive }) =>
              clsx(
                'mx-0.5 flex flex-1 items-center justify-center rounded-full py-2.5 transition-colors',
                isActive
                  ? 'bg-gradient-brand text-white shadow-glow-rose'
                  : 'text-stone-500 dark:text-stone-400',
              )
            }
          >
            <Icon size={20} />
          </NavLink>
        ))}
      </nav>
    </>
  )
}
