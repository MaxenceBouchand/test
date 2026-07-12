import type { ArticleBlock } from './types'

export const blocks: ArticleBlock[] = [
  {
    type: 'paragraph',
    text:
      "Le budget base zéro repose sur un principe simple à énoncer et exigeant à appliquer : chaque euro a un rôle. Contrairement à la règle 50/30/20, qui répartit le revenu en trois grandes masses, le budget base zéro vous demande d'assigner explicitement chaque euro de revenu à une catégorie précise — logement, courses, loisirs, épargne, imprévus — jusqu'à ce qu'il ne reste plus rien de non affecté. Le mois est \"équilibré\" non pas quand vous dépensez moins que vous ne gagnez, mais quand la somme de vos catégories est exactement égale à votre revenu.",
  },
  { type: 'heading', text: 'Construire un budget base zéro, étape par étape' },
  {
    type: 'list',
    items: [
      "Listez tous vos revenus nets prévus pour le mois à venir (salaire, revenus complémentaires, remboursements attendus).",
      "Listez toutes vos catégories de dépenses, y compris celles qui ne tombent pas chaque mois (assurance annuelle, cadeaux, entretien voiture) en les lissant sur douze mois.",
      "Attribuez un montant à chaque catégorie, en commençant par les dépenses fixes obligatoires, puis les dépenses variables, puis l'épargne.",
      "Continuez à ajuster les montants jusqu'à ce que le total assigné soit égal à votre revenu total : le \"reste à assigner\" doit atteindre zéro.",
      "En cours de mois, si une catégorie dépasse son budget, compensez en réduisant une autre catégorie plutôt que de laisser le déséquilibre filer jusqu'à la fin du mois.",
    ],
  },
  { type: 'heading', text: 'Exemple chiffré' },
  {
    type: 'paragraph',
    text:
      "Pour un revenu net de 2 200 € : loyer et charges 750 €, alimentation 350 €, transport 120 €, assurances 90 €, abonnements 40 €, loisirs et sorties 180 €, vêtements 50 €, épargne de précaution 300 €, épargne projet vacances 150 €, imprévus 170 €. Le total de ces dix catégories fait exactement 2 200 € : le reste à assigner est à zéro, chaque euro a une destination définie avant même d'être dépensé.",
  },
  { type: 'heading', text: 'Comparé à la règle 50/30/20' },
  {
    type: 'paragraph',
    text:
      "La règle 50/30/20, décrite dans l'article qui lui est consacré, vous donne trois cibles larges et vous laisse gérer le détail à l'intérieur de chacune. Le budget base zéro va plus loin : il force une décision explicite pour chaque poste de dépense, ce qui le rend plus précis mais aussi plus exigeant en temps de mise en place. Le 50/30/20 convient si vous voulez un repère simple à tenir sur la durée ; le budget base zéro convient si vous traversez une période où chaque euro compte réellement, ou si vous aimez avoir un contrôle fin sur votre argent.",
  },
  { type: 'heading', text: 'Avantages et limites' },
  {
    type: 'list',
    items: [
      "Avantage : élimine les fuites invisibles, puisque toute dépense doit rentrer dans une catégorie prévue à l'avance.",
      "Avantage : particulièrement efficace pour redresser une situation tendue ou atteindre un objectif d'épargne ambitieux.",
      "Limite : demande un effort de mise à jour plus régulier que la règle 50/30/20.",
      "Limite : les mois aux dépenses irrégulières (imprévus, factures annuelles) demandent des ajustements fréquents du budget.",
    ],
  },
  {
    type: 'tip',
    text:
      "Dans l'app, lorsque la méthode base zéro est activée, un indicateur \"reste à assigner\" affiche en temps réel l'écart entre votre revenu du mois et le total déjà attribué à vos catégories. L'objectif est de le ramener à 0 € avant le début du mois, puis de surveiller qu'il ne reparte pas dans le rouge si une catégorie dépasse son budget.",
  },
]
