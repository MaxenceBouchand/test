import type { ArticleBlock } from './types'

export const blocks: ArticleBlock[] = [
  {
    type: 'paragraph',
    text:
      "La distinction entre besoins et envies est au cœur de la plupart des méthodes de budget, et pourtant c'est souvent le point le plus mal défini. Un besoin, c'est une dépense sans laquelle votre vie quotidienne ou votre stabilité seraient concrètement compromises. Une envie, c'est une dépense qui améliore votre confort ou votre plaisir, mais dont l'absence ne changerait rien de grave à votre situation. La difficulté ne vient pas de la définition, mais de son application à des cas réels, où l'on a souvent intérêt à se convaincre du contraire.",
  },
  { type: 'heading', text: 'Les grandes catégories, sans ambiguïté' },
  {
    type: 'list',
    items: [
      "Besoins : loyer ou crédit immobilier, charges de logement, alimentation de base, transport pour aller travailler, assurances obligatoires (habitation, auto), factures d'énergie, remboursements de dettes.",
      "Envies : abonnements de streaming, restaurants et livraisons, sorties, shopping vêtements au-delà du nécessaire, voyages, gadgets, forfaits mobiles haut de gamme au-delà de ce qu'exige un usage normal.",
      "Épargne : virement automatique vers un livret, versement sur un plan d'épargne, remboursement anticipé volontaire d'un crédit.",
    ],
  },
  { type: 'heading', text: 'Les pièges de l\'auto-justification' },
  {
    type: 'paragraph',
    text:
      "Le problème n'est presque jamais de savoir si un restaurant est un besoin ou une envie — c'est une envie, et tout le monde le sait. Le problème vient des zones grises que l'on requalifie en besoin par confort intellectuel. \"J'ai besoin de ce forfait premium pour le travail\" alors qu'un forfait deux fois moins cher suffirait largement. \"J'ai besoin de cette voiture plus grande\" alors qu'une version d'occasion moins chère remplirait la même fonction. \"J'ai besoin de faire les courses dans ce magasin\" alors qu'un supermarché à prix plus bas est à la même distance. Ces reformulations ne sont pas malhonnêtes en soi, mais elles brouillent le budget : elles gonflent artificiellement la part des besoins et laissent croire qu'il n'y a plus de marge de manœuvre.",
  },
  { type: 'heading', text: 'Un test simple pour trancher' },
  {
    type: 'list',
    items: [
      "Si cette dépense disparaissait ce mois-ci, est-ce que ma sécurité, ma santé ou mon emploi seraient concrètement affectés ? Si non, c'est probablement une envie.",
      "Existe-t-il une version nettement moins chère qui remplirait la même fonction essentielle ? Si oui, la partie \"nécessaire\" est le prix de cette version basse, le reste est une envie que vous choisissez de financer.",
      "Est-ce que je paierais cette dépense si mon revenu baissait de 30 % le mois prochain ? Si la réponse est non, elle appartient à la catégorie envies, même si elle vous semble routinière aujourd'hui.",
    ],
  },
  {
    type: 'tip',
    text:
      "Dans l'app, chaque catégorie que vous créez peut être rattachée à un groupe : Besoins, Envies ou Épargne. Utilisez le test ci-dessus au moment de créer une catégorie plutôt que dans le feu de l'action : décider à froid que \"Restaurants\" est une envie évite d'avoir à se justifier chaque fois qu'une transaction y est enregistrée.",
  },
  {
    type: 'paragraph',
    text:
      "Cette classification n'a pas besoin d'être parfaite dès le premier mois. Certaines catégories, comme le transport ou l'habillement, contiennent en réalité un mélange de besoin (l'abonnement de train pour aller travailler) et d'envie (le taxi du samedi soir) — dans ce cas, il est souvent plus utile de scinder la catégorie en deux plutôt que de trancher arbitrairement pour l'ensemble.",
  },
]
