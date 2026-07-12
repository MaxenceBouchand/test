import type { ArticleBlock } from './types'

export const blocks: ArticleBlock[] = [
  {
    type: 'paragraph',
    text:
      "La règle 50/30/20 est l'une des méthodes de budget les plus populaires, popularisée par la sénatrice américaine Elizabeth Warren dans son livre \"All Your Worth\". Son principe : diviser votre revenu net (après impôts) en trois enveloppes, dans des proportions fixes, sans avoir à détailler chaque dépense au centime près.",
  },
  { type: 'heading', text: 'Les trois enveloppes' },
  {
    type: 'list',
    items: [
      '50 % pour les besoins essentiels : logement, alimentation, transport, assurances, factures, remboursements de dettes obligatoires.',
      '30 % pour les envies : loisirs, restaurants, sorties, abonnements, shopping — tout ce qui améliore votre confort de vie sans être vital.',
      "20 % pour l'épargne et le désendettement accéléré : épargne de précaution, investissement, remboursement anticipé de dettes.",
    ],
  },
  {
    type: 'paragraph',
    text:
      "L'idée n'est pas de suivre ces pourcentages au centime près chaque mois, mais de s'en servir comme repère : si vos besoins essentiels dépassent 50 % de votre revenu, c'est souvent le signe qu'il faut revoir un poste de dépense structurel (loyer, crédit auto) plutôt que de couper dans le superflu.",
  },
  { type: 'heading', text: 'Exemple chiffré' },
  {
    type: 'paragraph',
    text:
      'Pour un revenu net de 2 400 € par mois : 1 200 € vont aux besoins (loyer, courses, transport, assurances), 720 € aux envies (sorties, abonnements, shopping) et 480 € à l\'épargne. Si le loyer et les charges fixes consomment déjà 1 400 €, cela signale un déséquilibre à corriger avant de s\'attaquer aux petites dépenses du quotidien.',
  },
  { type: 'heading', text: 'Avantages et limites' },
  {
    type: 'list',
    items: [
      "Avantage : très simple à mettre en place, pas besoin de catégoriser chaque euro.",
      "Avantage : donne une vision claire de l'équilibre global entre nécessaire, confort et avenir.",
      "Limite : les proportions ne conviennent pas à toutes les situations (loyer très élevé dans une grande ville, revenu faible où les besoins dépassent naturellement 50 %).",
      "Limite : moins précis que le budget base zéro pour traquer des postes de dépense spécifiques.",
    ],
  },
  {
    type: 'tip',
    text:
      "Dans l'app, chaque catégorie que vous créez est rattachée à un groupe (Besoins, Envies ou Épargne). Le tableau de bord compare automatiquement vos dépenses réelles à ces trois cibles, mois après mois.",
  },
  {
    type: 'paragraph',
    text:
      'Cette méthode convient bien si vous débutez dans la gestion de budget ou si vous voulez un système qui demande peu de maintenance au quotidien. Si vous préférez un contrôle plus fin, la règle base zéro (voir l\'article dédié) va plus loin.',
  },
]
