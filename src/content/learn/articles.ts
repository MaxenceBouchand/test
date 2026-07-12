import type { Article } from './types'
import { blocks as pourquoiBudget } from './pourquoi-budget'
import { blocks as besoinsVsEnvies } from './besoins-vs-envies'
import { blocks as regle50302 } from './50-30-20'
import { blocks as zeroBased } from './zero-based'
import { blocks as reduireFixes } from './reduire-depenses-fixes'
import { blocks as reduireVariables } from './reduire-depenses-variables'
import { blocks as epargnePrecaution } from './epargne-precaution'
import { blocks as objectifsEpargne } from './objectifs-epargne'

export const ARTICLES: Article[] = [
  {
    slug: 'pourquoi-un-budget',
    title: 'Le budget, pourquoi et comment ?',
    excerpt: "Comprendre la boucle revenus → dépenses → épargne, et pourquoi un budget n'est pas une punition.",
    group: 'bases',
    readTimeMinutes: 5,
    blocks: pourquoiBudget,
  },
  {
    slug: 'besoins-vs-envies',
    title: 'Besoins vs envies : comment faire la différence',
    excerpt: 'Un cadre concret pour classer vos dépenses sans se mentir à soi-même.',
    group: 'bases',
    readTimeMinutes: 5,
    blocks: besoinsVsEnvies,
  },
  {
    slug: '50-30-20',
    title: 'La règle 50/30/20 expliquée',
    excerpt: 'Trois enveloppes simples : besoins, envies, épargne — avec un exemple chiffré.',
    group: 'methodes',
    readTimeMinutes: 6,
    blocks: regle50302,
  },
  {
    slug: 'budget-base-zero',
    title: 'Le budget base zéro (zero-based budgeting)',
    excerpt: "Chaque euro a un rôle, jusqu'à atteindre zéro non assigné.",
    group: 'methodes',
    readTimeMinutes: 6,
    blocks: zeroBased,
  },
  {
    slug: 'reduire-depenses-fixes',
    title: 'Réduire ses dépenses fixes',
    excerpt: 'Assurances, forfaits, abonnements : les leviers qui économisent chaque mois sans effort répété.',
    group: 'reduire',
    readTimeMinutes: 5,
    blocks: reduireFixes,
  },
  {
    slug: 'reduire-depenses-variables',
    title: 'Réduire ses dépenses variables sans se priver',
    excerpt: 'Des substitutions malignes plutôt que de la privation, sur les courses, le transport et les loisirs.',
    group: 'reduire',
    readTimeMinutes: 5,
    blocks: reduireVariables,
  },
  {
    slug: 'epargne-de-precaution',
    title: "Constituer une épargne de précaution",
    excerpt: "Pourquoi viser 3 à 6 mois de dépenses, et comment l'atteindre progressivement.",
    group: 'epargne',
    readTimeMinutes: 5,
    blocks: epargnePrecaution,
  },
  {
    slug: 'objectifs-epargne',
    title: "Se fixer et atteindre des objectifs d'épargne",
    excerpt: "La méthode SMART appliquée à l'épargne, et comment éviter les pièges les plus courants.",
    group: 'epargne',
    readTimeMinutes: 5,
    blocks: objectifsEpargne,
  },
]
