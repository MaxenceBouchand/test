import { Check } from 'lucide-react'
import clsx from 'clsx'
import type { BudgetMethod } from '../../types'

interface StepMethodProps {
  method: BudgetMethod
  onChange: (method: BudgetMethod) => void
}

const METHODS: { value: BudgetMethod; title: string; description: string; detail: string }[] = [
  {
    value: '50-30-20',
    title: 'La règle 50/30/20',
    description: 'Simple et rapide : 50 % besoins, 30 % envies, 20 % épargne.',
    detail:
      "Idéale pour démarrer sans passer des heures à tout planifier. Vos catégories sont réparties en trois groupes et l'app vérifie que chaque groupe reste dans son enveloppe.",
  },
  {
    value: 'zero-based',
    title: 'Le budget base zéro',
    description: 'Chaque euro a un rôle précis, jusqu\'à atteindre zéro non-assigné.',
    detail:
      'Plus précis mais demande un peu plus de temps : vous attribuez vous-même un montant à chaque catégorie jusqu\'à ce que tout votre revenu soit affecté.',
  },
]

export function StepMethod({ method, onChange }: StepMethodProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-50">
          Quelle méthode voulez-vous suivre ?
        </h2>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Les deux méthodes sont expliquées en détail dans la section Apprendre. Vous pourrez en
          changer à tout moment.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {METHODS.map((option) => {
          const selected = method === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={clsx(
                'flex flex-col gap-2 rounded-2xl border p-5 text-left transition-colors',
                selected
                  ? 'border-rose-400 bg-rose-50 dark:border-rose-500 dark:bg-rose-900/20'
                  : 'border-stone-200 bg-white hover:border-stone-300 dark:border-stone-700 dark:bg-stone-900',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 dark:text-stone-50">{option.title}</span>
                {selected && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-rose-500 text-white">
                    <Check size={12} />
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-300">{option.description}</p>
              <p className="text-xs text-stone-400 dark:text-stone-500">{option.detail}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
