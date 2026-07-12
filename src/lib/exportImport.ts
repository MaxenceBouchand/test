import type { AppState } from '../types'
import { APP_STATE_VERSION } from '../types'

export class ImportValidationError extends Error {}

export function exportState(state: AppState): void {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const date = new Date().toISOString().slice(0, 10)
  link.href = url
  link.download = `budget-app-export-${date}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Validates the shape of an imported JSON payload before it ever touches the store. */
export function parseImportedState(raw: string): AppState {
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    throw new ImportValidationError("Le fichier n'est pas un JSON valide.")
  }

  if (!isPlainObject(data)) {
    throw new ImportValidationError('Le fichier ne contient pas les données attendues.')
  }

  const requiredArrayFields = ['categories', 'transactions', 'monthlyBudgets', 'goals'] as const
  for (const field of requiredArrayFields) {
    if (!Array.isArray(data[field])) {
      throw new ImportValidationError(`Le champ "${field}" est manquant ou invalide.`)
    }
  }

  if (!isPlainObject(data.settings)) {
    throw new ImportValidationError('Les paramètres utilisateur sont manquants ou invalides.')
  }

  const settings = data.settings
  if (settings.method !== '50-30-20' && settings.method !== 'zero-based') {
    throw new ImportValidationError('La méthode de budget est invalide.')
  }
  if (typeof settings.monthlyIncome !== 'number') {
    throw new ImportValidationError('Le revenu mensuel est invalide.')
  }

  return {
    version: typeof data.version === 'number' ? data.version : APP_STATE_VERSION,
    settings: settings as unknown as AppState['settings'],
    categories: data.categories as AppState['categories'],
    transactions: data.transactions as AppState['transactions'],
    monthlyBudgets: data.monthlyBudgets as AppState['monthlyBudgets'],
    goals: data.goals as AppState['goals'],
  }
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}
