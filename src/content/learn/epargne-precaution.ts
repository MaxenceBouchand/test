import type { ArticleBlock } from './types'

export const blocks: ArticleBlock[] = [
  {
    type: 'paragraph',
    text:
      "L'épargne de précaution, aussi appelée fonds d'urgence, est la somme d'argent mise de côté pour absorber un imprévu — perte d'emploi, panne de voiture, réparation urgente, frais médicaux non couverts — sans avoir à recourir au crédit ni à puiser dans une épargne destinée à un autre projet. C'est la première brique à construire avant tout objectif d'épargne plus ambitieux (achat immobilier, investissement), car elle protège les autres projets d'un imprévu qui viendrait sinon tout déstabiliser.",
  },
  { type: 'heading', text: 'Quel montant viser ?' },
  {
    type: 'paragraph',
    text:
      "La référence généralement admise est de trois à six mois de dépenses essentielles — logement, alimentation, transport, assurances, factures — et non trois à six mois de revenu. Pour quelqu'un dont les dépenses essentielles s'élèvent à 1 100 € par mois, la cible se situe donc entre 3 300 € et 6 600 €. Trois mois suffisent si votre emploi est stable et vos revenus prévisibles ; six mois sont plus prudents en cas de revenus irréguliers, de statut indépendant, ou de charge de famille importante.",
  },
  { type: 'heading', text: 'Où placer cette épargne' },
  {
    type: 'paragraph',
    text:
      "Une épargne de précaution doit rester disponible immédiatement et ne jamais perdre de valeur nominale, ce qui exclut les placements risqués ou bloqués. En France, le Livret A reste la référence naturelle pour ce rôle : il est garanti par l'État, totalement liquide (retrait possible à tout moment sans pénalité) et exonéré d'impôt sur les intérêts. Ce n'est pas le placement le plus rentable sur le long terme, mais ce n'est pas sa fonction : le fonds d'urgence privilégie la disponibilité et la sécurité sur la performance.",
  },
  { type: 'heading', text: 'Comment la constituer progressivement' },
  {
    type: 'list',
    items: [
      "Automatiser un virement fixe le jour de la paie vers le livret dédié, même modeste, pour que l'épargne se constitue sans dépendre d'une décision consciente chaque mois.",
      "Démarrer petit : 50 € par mois représentent 600 € au bout d'un an, un premier filet de sécurité déjà utile pour absorber un imprévu courant.",
      "Affecter les rentrées d'argent exceptionnelles (prime, remboursement, cadeau) en priorité à ce fonds tant que la cible n'est pas atteinte.",
      "Considérer ce fonds comme intouchable pour tout ce qui n'est pas une urgence réelle — pas un projet de vacances, pas une bonne affaire soudaine.",
    ],
  },
  {
    type: 'paragraph',
    text:
      "Une fois la cible atteinte, il n'est en général plus nécessaire d'y ajouter d'argent, sauf si vos dépenses essentielles augmentent (déménagement, naissance) : l'excédent d'épargne peut alors être redirigé vers d'autres objectifs, comme un projet à moyen terme ou un investissement.",
  },
  {
    type: 'tip',
    text:
      "Dans l'app, créez un objectif dans la section Objectifs avec le montant cible de votre fonds d'urgence (par exemple trois mois de dépenses essentielles) et alimentez-le par des contributions régulières. La progression visuelle vers la cible aide à garder la motivation, surtout dans les premiers mois où l'effort semble abstrait.",
  },
]
