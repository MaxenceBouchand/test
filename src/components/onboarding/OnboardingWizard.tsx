import { useState } from 'react'
import { PiggyBank } from 'lucide-react'
import clsx from 'clsx'
import { useBudgetStore } from '../../store/useBudgetStore'
import type { BudgetMethod, Category } from '../../types'
import { buildSeedCategories } from '../../lib/seedData'
import { Button, Blob } from '../ui'
import { StepIncome } from './StepIncome'
import { StepMethod } from './StepMethod'
import { StepCategories } from './StepCategories'

const STEP_LABELS = ['Revenu', 'Méthode', 'Catégories']

export function OnboardingWizard() {
  const [step, setStep] = useState(0)
  const [income, setIncome] = useState(0)
  const [method, setMethod] = useState<BudgetMethod>('50-30-20')
  const [categories, setCategories] = useState<Category[]>([])
  const [incomeError, setIncomeError] = useState<string | null>(null)

  const setMonthlyIncome = useBudgetStore((s) => s.setMonthlyIncome)
  const setStoreMethod = useBudgetStore((s) => s.setMethod)
  const seedCategories = useBudgetStore((s) => s.seedCategories)
  const completeOnboarding = useBudgetStore((s) => s.completeOnboarding)

  const handleNext = () => {
    if (step === 0) {
      if (income <= 0) {
        setIncomeError('Indiquez un revenu supérieur à 0 pour continuer.')
        return
      }
      setIncomeError(null)
      setStep(1)
      return
    }
    if (step === 1) {
      setCategories(buildSeedCategories(method, income))
      setStep(2)
      return
    }
    // step === 2: finalize
    setMonthlyIncome(income)
    setStoreMethod(method)
    seedCategories(categories)
    completeOnboarding()
  }

  const handleBack = () => setStep((s) => Math.max(0, s - 1))

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-rose-50 px-4 py-10 dark:bg-[#221019]">
      <Blob variant="blob" size={420} className="absolute -top-20 -left-24" />
      <Blob variant="peachy" size={380} className="absolute -bottom-24 -right-16" />

      <div className="relative w-full max-w-xl rounded-3xl border border-rose-100 bg-white p-8 shadow-[0_12px_40px_-12px_rgba(240,73,138,0.25)] dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-brand-strong text-white shadow-glow-rose">
            <PiggyBank size={20} />
          </div>
          <span className="font-display text-xl font-bold text-rose-700 dark:text-rose-300">Budget rose</span>
        </div>

        <div className="mb-8 flex items-center gap-2">
          {STEP_LABELS.map((label, index) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div
                className={clsx(
                  'flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                  index <= step
                    ? 'bg-gradient-brand text-white shadow-glow-rose'
                    : 'bg-rose-50 text-rose-300 dark:bg-stone-800',
                )}
              >
                {index + 1}
              </div>
              <span
                className={clsx(
                  'text-xs font-medium',
                  index <= step ? 'text-stone-700 dark:text-stone-200' : 'text-stone-400',
                )}
              >
                {label}
              </span>
              {index < STEP_LABELS.length - 1 && (
                <div className="h-px flex-1 bg-rose-100 dark:bg-stone-800" />
              )}
            </div>
          ))}
        </div>

        {step === 0 && (
          <StepIncome
            income={income}
            onChange={(value) => {
              setIncome(value)
              if (value > 0) setIncomeError(null)
            }}
          />
        )}
        {step === 0 && incomeError && <p className="mt-2 text-xs text-red-600 dark:text-red-400">{incomeError}</p>}
        {step === 1 && <StepMethod method={method} onChange={setMethod} />}
        {step === 2 && (
          <StepCategories categories={categories} method={method} income={income} onChange={setCategories} />
        )}

        <div className="mt-8 flex justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={step === 0}>
            Précédent
          </Button>
          <Button onClick={handleNext}>{step === 2 ? 'Terminer' : 'Suivant'}</Button>
        </div>
      </div>
    </div>
  )
}
