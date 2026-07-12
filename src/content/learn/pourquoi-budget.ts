import type { ArticleBlock } from './types'

export const blocks: ArticleBlock[] = [
  {
    type: 'paragraph',
    text:
      "Faire un budget, ce n'est pas se punir ni renoncer à tout ce qui fait plaisir. C'est simplement savoir, à tout moment, d'où vient votre argent et où il part. Beaucoup de gens gagnent correctement leur vie et finissent pourtant le mois à découvert, non pas parce qu'ils dépensent trop dans l'absolu, mais parce qu'ils n'ont aucune vision claire de la répartition de leurs dépenses. Le budget comble ce manque d'information.",
  },
  { type: 'heading', text: 'La boucle de base : revenus, dépenses, épargne' },
  {
    type: 'paragraph',
    text:
      "Tout budget repose sur le même mécanisme à trois temps. D'abord, vous identifiez vos revenus nets réguliers (salaire, primes récurrentes, revenus complémentaires). Ensuite, vous suivez vos dépenses au fil du mois, idéalement classées par catégorie plutôt que listées en vrac. Enfin, ce qui reste — l'écart entre revenus et dépenses — devient de l'épargne, qu'elle soit mise de côté volontairement ou qu'elle s'accumule par défaut sur votre compte courant. Un budget qui fonctionne rend cette troisième étape intentionnelle plutôt qu'accidentelle.",
  },
  { type: 'heading', text: 'Les idées reçues qui bloquent' },
  {
    type: 'list',
    items: [
      "\"Le budget, c'est pour ceux qui ont des problèmes d'argent\" — en réalité, plus vos revenus augmentent, plus il devient facile de perdre le fil sans un minimum de suivi.",
      "\"Faire un budget veut dire tout s'interdire\" — un budget bien construit prévoit une enveloppe loisirs et plaisirs assumée, pas juste des restrictions.",
      "\"C'est trop long à tenir à jour\" — catégoriser une dépense prend quelques secondes une fois l'habitude prise, surtout avec un outil qui centralise vos transactions.",
      "\"Une fois que j'ai fait mon budget, c'est réglé\" — un budget se révise chaque mois, car vos revenus et vos priorités évoluent.",
    ],
  },
  { type: 'heading', text: "Ce que le suivi des transactions change concrètement" },
  {
    type: 'paragraph',
    text:
      "La plupart des dérapages budgétaires viennent de dépenses qui, prises isolément, semblent négligeables : un café à 3 €, une commande de repas à 18 €, un abonnement oublié à 9,99 € par mois. Additionnées sur trente jours, elles peuvent représenter plusieurs centaines d'euros. Enregistrer chaque transaction et la rattacher à une catégorie transforme cette dépense diffuse en chiffre visible : vous ne dites plus \"je dépense trop en sorties\", vous savez que vous avez dépensé 340 € en restaurants ce mois-ci, sur un objectif de 200 €. Cette précision est ce qui permet d'agir, alors qu'une impression vague ne permet que de culpabiliser sans rien changer.",
  },
  {
    type: 'paragraph',
    text:
      "Deux grandes méthodes permettent de structurer ce suivi : la règle 50/30/20, qui répartit le revenu en trois grandes enveloppes (besoins, envies, épargne), et le budget base zéro, qui attribue un rôle précis à chaque euro dès le début du mois. Les deux sont expliquées en détail dans leurs articles dédiés — l'important est de choisir celle qui correspond à votre niveau de rigueur souhaité, sachant que vous pouvez changer de méthode à tout moment.",
  },
  {
    type: 'tip',
    text:
      "Dans l'app, chaque transaction que vous ajoutez est rattachée à une catégorie, et le tableau de bord agrège automatiquement ces catégories par mois. Vous pouvez basculer entre la méthode 50/30/20 et le budget base zéro dans les paramètres, sans perdre votre historique de transactions.",
  },
]
