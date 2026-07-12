import { useState } from 'react'
import { useBudgetStore } from '../../store/useBudgetStore'
import type { BudgetMethod } from '../../types'
import { Card, Input, Select, Button } from '../ui'

const METHOD_OPTIONS: { value: BudgetMethod; label: string }[] = [
  { value: '50-30-20', label: 'Règle 50/30/20' },
  { value: 'zero-based', label: 'Budget base zéro' },
]

export function ProfileSettings() {
  const settings = useBudgetStore((s) => s.settings)
  const setMonthlyIncome = useBudgetStore((s) => s.setMonthlyIncome)
  const setMethod = useBudgetStore((s) => s.setMethod)

  const [income, setIncome] = useState(settings.monthlyIncome)

  const handleSaveIncome = () => {
    if (income > 0) setMonthlyIncome(income)
  }

  const handleMethodChange = (method: BudgetMethod) => {
    if (method === settings.method) return
    const confirmed = window.confirm(
      method === 'zero-based'
        ? "Passer en budget base zéro : vous devrez assigner un montant à chaque catégorie jusqu'à ce que tout votre revenu soit affecté. Continuer ?"
        : "Passer à la règle 50/30/20 : vérifiez que vos catégories ont bien un groupe (Besoins/Envies/Épargne) assigné dans la page Catégories. Continuer ?",
    )
    if (confirmed) setMethod(method)
  }

  return (
    <Card header={<h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200">Profil</h2>}>
      <div className="flex flex-col gap-4">
        <div className="flex items-end gap-2">
          <Input
            label="Revenu mensuel"
            type="number"
            min={0}
            step={10}
            value={income || ''}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="max-w-[180px]"
          />
          <Button size="sm" variant="secondary" onClick={handleSaveIncome}>
            Enregistrer
          </Button>
        </div>
        <Select
          label="Méthode de budget"
          value={settings.method}
          onChange={(e) => handleMethodChange(e.target.value as BudgetMethod)}
          options={METHOD_OPTIONS}
          className="max-w-xs"
        />
      </div>
    </Card>
  )
}
