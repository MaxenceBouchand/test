import type { ArticleBlock } from './types'

export const blocks: ArticleBlock[] = [
  {
    type: 'paragraph',
    text:
      "Les dépenses fixes — assurances, téléphone, internet, logement, énergie — ont un point commun : une fois mises en place, elles tournent en pilote automatique et personne ne les remet en question pendant des années. C'est précisément ce qui en fait le levier le plus puissant pour améliorer un budget : une négociation qui prend une heure peut générer une économie qui se répète chaque mois, sans aucun effort supplémentaire par la suite.",
  },
  { type: 'heading', text: 'Renégocier les contrats récurrents' },
  {
    type: 'list',
    items: [
      "Assurance auto et habitation : comparez chaque année via un comparateur en ligne, puis appelez votre assureur actuel avec le meilleur devis concurrent en main — la plupart alignent leur tarif pour ne pas perdre un client fidèle.",
      "Forfait mobile et internet : les opérateurs proposent régulièrement des offres à prix cassé pour les nouveaux clients ; après douze à vingt-quatre mois sur le même forfait, vous payez presque toujours plus cher que ce qui existe sur le marché pour un service équivalent.",
      "Abonnements bancaires : vérifiez les frais de tenue de compte et de carte, souvent réductibles ou supprimables via une simple demande ou un changement d'offre.",
    ],
  },
  { type: 'heading', text: "Traquer les abonnements oubliés" },
  {
    type: 'paragraph',
    text:
      "Passez en revue vos prélèvements des trois derniers mois et listez tous les abonnements récurrents : streaming vidéo et musique, salle de sport, presse en ligne, stockage cloud, applications diverses. Il n'est pas rare de retrouver deux ou trois abonnements payés depuis des mois sans usage réel. Un abonnement à 12,99 € par mois oublié représente 156 € par an — l'équivalent d'un mois de courses pour une personne seule.",
  },
  { type: 'heading', text: 'Les leviers côté logement et énergie' },
  {
    type: 'list',
    items: [
      "Renégocier le loyer : à l'échéance du bail ou lors d'un renouvellement, comparer les loyers du quartier donne un argument concret à faire valoir auprès du propriétaire.",
      "Changer de fournisseur d'énergie : les offres de marché sont parfois plus avantageuses que le tarif réglementé, en particulier pour l'électricité ; comparez au moins une fois par an.",
      "Revoir l'isolation et les équipements énergivores : un investissement ponctuel (joints de fenêtre, thermostat programmable) peut réduire durablement une facture de chauffage.",
    ],
  },
  { type: 'heading', text: "L'effet cumulatif d'une économie récurrente" },
  {
    type: 'paragraph',
    text:
      "Une économie ponctuelle de 100 € n'a d'effet qu'une fois. Une économie récurrente de 15 € par mois obtenue en changeant de forfait mobile représente 180 € par an, et se répète chaque année suivante sans action supplémentaire. C'est pourquoi il vaut mieux consacrer une heure à revoir ses contrats fixes qu'à chasser des petites réductions ponctuelles sur les courses : le rendement horaire de la négociation des dépenses fixes est presque toujours supérieur.",
  },
  { type: 'heading', text: 'Par où commencer ce mois-ci' },
  {
    type: 'list',
    items: [
      "Listez tous vos prélèvements récurrents des trois derniers relevés bancaires.",
      "Identifiez les trois contrats les plus anciens (assurance, téléphone, énergie) : ce sont les meilleurs candidats à la renégociation.",
      "Utilisez un comparateur en ligne pour obtenir un devis concurrent avant d'appeler votre fournisseur actuel.",
      "Résiliez sans hésiter les abonnements identifiés comme inutilisés depuis plus de deux mois.",
    ],
  },
  {
    type: 'tip',
    text:
      "Dans l'app, consultez l'historique de vos transactions filtré par catégorie sur plusieurs mois pour repérer facilement les montants identiques qui reviennent chaque mois : c'est le moyen le plus rapide de retrouver les abonnements et contrats à renégocier ou à résilier.",
  },
]
