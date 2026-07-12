import { useRef, useState } from 'react'
import { Download, Upload, Trash2 } from 'lucide-react'
import { useBudgetStore } from '../../store/useBudgetStore'
import { exportState, parseImportedState, readFileAsText, ImportValidationError } from '../../lib/exportImport'
import { Card, Button } from '../ui'

export function DataManagement() {
  const state = useBudgetStore()
  const importState = useBudgetStore((s) => s.importState)
  const resetState = useBudgetStore((s) => s.resetState)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleExport = () => {
    exportState(state)
  }

  const handleImportClick = () => {
    setError(null)
    setSuccess(null)
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      const text = await readFileAsText(file)
      const imported = parseImportedState(text)
      const confirmed = window.confirm(
        'Importer ce fichier remplacera toutes vos données actuelles (transactions, catégories, objectifs). Continuer ?',
      )
      if (!confirmed) return
      importState(imported)
      setSuccess('Données importées avec succès.')
    } catch (err) {
      setError(err instanceof ImportValidationError ? err.message : "Impossible de lire ce fichier.")
    }
  }

  const handleReset = () => {
    const confirmed = window.confirm(
      'Cette action supprime définitivement toutes vos données locales. Pensez à exporter une sauvegarde avant. Continuer ?',
    )
    if (confirmed) resetState()
  }

  return (
    <Card header={<h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200">Vos données</h2>}>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Toutes vos données restent dans votre navigateur (localStorage). Exportez-les régulièrement pour ne rien
          perdre en cas de changement d'appareil ou de navigateur.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" icon={<Download size={15} />} onClick={handleExport}>
            Exporter (JSON)
          </Button>
          <Button variant="secondary" size="sm" icon={<Upload size={15} />} onClick={handleImportClick}>
            Importer (JSON)
          </Button>
          <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleFileChange} />
          <Button variant="destructive" size="sm" icon={<Trash2 size={15} />} onClick={handleReset}>
            Réinitialiser
          </Button>
        </div>
        {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        {success && <p className="text-xs text-emerald-600 dark:text-emerald-400">{success}</p>}
      </div>
    </Card>
  )
}
