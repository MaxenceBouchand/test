import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { AppState } from '../types'
import {
  getCategoryTotals,
  getGroupTotals,
  getMonthSummary,
  getOverspentCategories,
  getUnassignedAmount,
} from './budgetMath'
import { formatCurrency, formatMonthLabel } from './dateUtils'

/**
 * jsPDF's default font (Helvetica/WinAnsi) has no glyph for the narrow
 * no-break space Intl.NumberFormat('fr-FR') uses as a thousands separator —
 * without this it renders as a stray "/". Swap it for a plain space; the
 * underlying number is untouched, only the separator glyph changes.
 */
const PDF_UNSAFE_SPACES = /[\u00A0\u202F]/g

function pdfCurrency(amount: number): string {
  return formatCurrency(amount).replace(PDF_UNSAFE_SPACES, ' ')
}

const GROUP_LABELS: Record<string, string> = {
  needs: 'Besoins',
  wants: 'Envies',
  savings: 'Épargne',
}

const METHOD_LABELS: Record<AppState['settings']['method'], string> = {
  '50-30-20': 'Règle 50/30/20',
  'zero-based': 'Budget base zéro',
}

/**
 * Builds and downloads a PDF report for the given month. Every figure comes
 * from the exact same budgetMath functions the Dashboard uses (single source
 * of truth) so the PDF can never diverge from what's shown on screen.
 */
export function generateBudgetReport(state: AppState, monthKey: string): void {
  const summary = getMonthSummary(state, monthKey)
  const categoryTotals = getCategoryTotals(state, monthKey)
  const groupTotals = state.settings.method === '50-30-20' ? getGroupTotals(state, monthKey) : []
  const unassigned = state.settings.method === 'zero-based' ? getUnassignedAmount(state, monthKey) : 0
  const overspent = getOverspentCategories(state, monthKey)

  const doc = new jsPDF()
  const marginX = 14
  let cursorY = 18

  doc.setFontSize(18)
  doc.setTextColor(180, 45, 100)
  doc.text('Compte rendu de budget', marginX, cursorY)

  cursorY += 8
  doc.setFontSize(11)
  doc.setTextColor(90, 90, 90)
  doc.text(`${formatMonthLabel(monthKey)} — ${METHOD_LABELS[state.settings.method]}`, marginX, cursorY)

  cursorY += 6
  doc.setFontSize(9)
  doc.setTextColor(140, 140, 140)
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} — devise : EUR`, marginX, cursorY)

  cursorY += 10
  autoTable(doc, {
    startY: cursorY,
    head: [['Résumé', 'Montant']],
    body: [
      ['Revenu du mois', pdfCurrency(summary.income)],
      ['Total dépensé', pdfCurrency(summary.totalSpent)],
      ['Total budgété', pdfCurrency(summary.totalBudget)],
      ['Solde restant', pdfCurrency(summary.remaining)],
      ["Taux d'épargne", `${Math.round(summary.savingsRate * 100)} %`],
    ],
    theme: 'grid',
    headStyles: { fillColor: [211, 91, 129] },
    margin: { left: marginX, right: marginX },
  })

  cursorY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8

  if (state.settings.method === '50-30-20') {
    autoTable(doc, {
      startY: cursorY,
      head: [['Groupe', 'Cible', 'Alloué', 'Dépensé', 'Restant vs cible']],
      body: groupTotals.map((g) => [
        GROUP_LABELS[g.group],
        `${Math.round(g.targetShare * 100)} % (${pdfCurrency(g.targetAmount)})`,
        pdfCurrency(g.allocated),
        pdfCurrency(g.spent),
        pdfCurrency(g.remaining),
      ]),
      theme: 'grid',
      headStyles: { fillColor: [211, 91, 129] },
      margin: { left: marginX, right: marginX },
    })
    cursorY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8
  } else {
    doc.setFontSize(10)
    doc.setTextColor(unassigned < -0.5 ? 200 : unassigned > 0.5 ? 180 : 20, unassigned < -0.5 ? 40 : 120, 40)
    doc.text(`Montant non assigné : ${pdfCurrency(unassigned)}`, marginX, cursorY)
    cursorY += 8
  }

  autoTable(doc, {
    startY: cursorY,
    head: [['Catégorie', 'Budget', 'Dépensé', 'Restant', '% utilisé']],
    body: categoryTotals.map((t) => [
      t.category.name,
      pdfCurrency(t.budget),
      pdfCurrency(t.spent),
      pdfCurrency(t.remaining),
      t.budget > 0 ? `${Math.round(t.percentUsed * 100)} %` : t.spent > 0 ? '—' : '0 %',
    ]),
    theme: 'striped',
    headStyles: { fillColor: [90, 90, 90] },
    margin: { left: marginX, right: marginX },
  })

  cursorY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8

  if (overspent.length > 0) {
    doc.setFontSize(11)
    doc.setTextColor(200, 40, 40)
    doc.text('Dépassements de budget', marginX, cursorY)
    cursorY += 6
    autoTable(doc, {
      startY: cursorY,
      head: [['Catégorie', 'Dépassement']],
      body: overspent.map((t) => [t.category.name, pdfCurrency(-t.remaining)]),
      theme: 'grid',
      headStyles: { fillColor: [208, 59, 59] },
      margin: { left: marginX, right: marginX },
    })
  }

  const fileMonth = monthKey
  doc.save(`rapport-budget-${fileMonth}.pdf`)
}
