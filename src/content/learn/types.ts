export type ArticleGroup = 'bases' | 'methodes' | 'reduire' | 'epargne'

export type ArticleBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'tip'; text: string }

export interface Article {
  slug: string
  title: string
  excerpt: string
  group: ArticleGroup
  readTimeMinutes: number
  blocks: ArticleBlock[]
}

export const GROUP_LABELS: Record<ArticleGroup, string> = {
  bases: 'Les bases',
  methodes: 'Méthodes de budget',
  reduire: 'Réduire ses dépenses',
  epargne: 'Épargne',
}

export const GROUP_ORDER: ArticleGroup[] = ['bases', 'methodes', 'reduire', 'epargne']
