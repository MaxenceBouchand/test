export const STORAGE_KEY = 'budget-app-state'

export function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function writeRaw(value: string): void {
  localStorage.setItem(STORAGE_KEY, value)
}

export function clearRaw(): void {
  localStorage.removeItem(STORAGE_KEY)
}
