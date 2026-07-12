import { useState } from 'react'
import { FileDown } from 'lucide-react'
import { useBudgetStore } from '../../store/useBudgetStore'
import { hasReportableData } from '../../lib/budgetMath'
import { Button } from '../ui'

interface ReportDownloadButtonProps {
  monthKey: string
}

export function ReportDownloadButton({ monthKey }: ReportDownloadButtonProps) {
  const state = useBudgetStore()
  const canGenerate = hasReportableData(state, monthKey)
  const [generating, setGenerating] = useState(false)

  const handleClick = async () => {
    setGenerating(true)
    try {
      // jsPDF/autotable are only needed here, so they're kept out of the main bundle.
      const { generateBudgetReport } = await import('../../lib/reportGenerator')
      generateBudgetReport(state, monthKey)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        variant="secondary"
        size="sm"
        icon={<FileDown size={16} />}
        disabled={!canGenerate || generating}
        onClick={handleClick}
      >
        {generating ? 'Génération…' : 'Télécharger le rapport'}
      </Button>
      {!canGenerate && (
        <p className="text-xs text-stone-400">Ajoutez un revenu ou un budget pour générer un rapport.</p>
      )}
    </div>
  )
}
