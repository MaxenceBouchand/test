import { Input } from '../ui'

interface StepIncomeProps {
  income: number
  onChange: (income: number) => void
}

export function StepIncome({ income, onChange }: StepIncomeProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-50">
          Quel est votre revenu mensuel ?
        </h2>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          C'est le point de départ de votre budget : tout ce que vous prévoyez de recevoir ce
          mois-ci (salaire, aides, revenus complémentaires). Vous pourrez l'ajuster à tout moment
          dans les Paramètres.
        </p>
      </div>
      <Input
        label="Revenu mensuel net"
        type="number"
        min={0}
        step={10}
        inputMode="decimal"
        value={income || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder="Ex : 2500"
        hint="Montant en euros, après impôts et cotisations."
      />
    </div>
  )
}
