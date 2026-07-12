import type { ArticleBlock } from './types'

export const blocks: ArticleBlock[] = [
  {
    type: 'paragraph',
    text:
      "Réduire ses dépenses variables ne veut pas dire se priver. Il s'agit de remplacer certains choix par des alternatives presque aussi pratiques ou agréables, mais moins coûteuses — pas de renoncer purement et simplement au plaisir ou au confort. La différence entre substitution intelligente et privation est essentielle : une stratégie basée sur la culpabilité tient rarement plus de quelques semaines, alors qu'une stratégie basée sur de bonnes alternatives peut devenir une habitude durable.",
  },
  { type: 'heading', text: 'Alimentation : dépenser mieux, pas moins bien manger' },
  {
    type: 'list',
    items: [
      "Le batch cooking (cuisiner plusieurs repas en une seule session) réduit le recours aux plats préparés et aux livraisons, souvent deux à trois fois plus chers au repas.",
      "Privilégier les produits de saison et les marchés en fin de journée permet d'obtenir une qualité comparable à prix réduit, sans changer fondamentalement vos habitudes alimentaires.",
      "Planifier les menus de la semaine avant de faire les courses limite les achats impulsifs et réduit mécaniquement le gaspillage alimentaire, qui représente une part significative du budget courses d'un foyer.",
      "Garder une liste des produits qui finissent régulièrement à la poubelle aide à ajuster les quantités achetées la fois suivante.",
    ],
  },
  { type: 'heading', text: 'Transport : optimiser sans se compliquer la vie' },
  {
    type: 'list',
    items: [
      "Le covoiturage pour les trajets réguliers (travail, activités) partage le coût du carburant et de l'usure du véhicule entre plusieurs personnes.",
      "Un abonnement de transport en commun mensuel ou annuel revient souvent moins cher que des tickets à l'unité dès que les trajets sont fréquents.",
      "Le vélo ou la marche pour les trajets courts ne sont pas seulement une économie : ils suppriment aussi une dépense sans qu'aucun sacrifice de confort ne soit réellement ressenti au quotidien.",
    ],
  },
  { type: 'heading', text: 'Loisirs : des alternatives, pas des renoncements' },
  {
    type: 'list',
    items: [
      "De nombreuses villes proposent des musées gratuits certains jours, des parcs, des événements culturels ou des bibliothèques avec prêt de livres, films et jeux.",
      "Organiser une soirée à la maison avec des amis coûte une fraction d'une soirée au restaurant, pour une convivialité souvent équivalente.",
      "Les activités en extérieur (randonnée, sport en plein air) offrent un loisir de qualité à coût quasi nul, en alternative aux loisirs payants.",
    ],
  },
  { type: 'heading', text: 'Substitution plutôt que privation' },
  {
    type: 'paragraph',
    text:
      "L'objectif n'est jamais de supprimer une catégorie de plaisir, mais de trouver la version qui offre le meilleur rapport entre satisfaction et coût. Remplacer trois dîners au restaurant par mois par un seul, en réinvestissant une partie de l'économie dans un ingrédient de qualité pour un repas fait maison, permet de garder le plaisir tout en réduisant la dépense. Cette approche évite l'écueil classique des budgets trop stricts : la frustration qui pousse, tôt ou tard, à tout abandonner et à revenir aux anciennes habitudes, parfois de façon encore plus coûteuse.",
  },
  {
    type: 'tip',
    text:
      "Dans l'app, comparez le montant réel dépensé chaque mois dans les catégories Alimentation, Transport et Loisirs à votre budget cible : si l'écart se réduit progressivement sans que la catégorie ne tombe à zéro, c'est le signe d'une substitution réussie plutôt que d'une privation, qui se traduirait plutôt par des pics de dépense compensatoires le mois suivant.",
  },
]
