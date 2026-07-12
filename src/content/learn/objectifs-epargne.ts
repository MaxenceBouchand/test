import type { ArticleBlock } from './types'

export const blocks: ArticleBlock[] = [
  {
    type: 'paragraph',
    text:
      "\"Je veux épargner plus\" n'est pas un objectif, c'est une intention. Sans montant précis, sans échéance et sans suivi, ce type de résolution s'évapore généralement au bout de quelques semaines. La méthode SMART, appliquée à l'épargne, transforme cette intention vague en objectif que vous pouvez réellement atteindre, parce qu'il devient possible de mesurer l'écart entre où vous en êtes et où vous voulez aller.",
  },
  { type: 'heading', text: "La méthode SMART appliquée à l'épargne" },
  {
    type: 'list',
    items: [
      "Spécifique : \"épargner pour un apport immobilier\" plutôt que \"épargner plus\" — un objectif nommé et daté est plus motivant qu'un objectif abstrait.",
      "Mesurable : fixer un montant chiffré, par exemple 8 000 €, pour pouvoir suivre une progression concrète plutôt qu'une impression.",
      "Atteignable : vérifier que le montant visé, rapporté au nombre de mois disponibles, correspond à une capacité d'épargne réaliste compte tenu de vos revenus et charges actuelles.",
      "Réaliste (relevant) : l'objectif doit avoir un sens dans votre situation actuelle — inutile de viser un fonds d'urgence de six mois si vous avez une dette à taux élevé à rembourser en priorité.",
      "Temporellement défini : associer une date cible, même approximative, pour transformer l'objectif en projet avec un rythme d'épargne mensuel calculable.",
    ],
  },
  { type: 'heading', text: 'Exemple chiffré' },
  {
    type: 'paragraph',
    text:
      "Pour un objectif de 3 000 € en dix-huit mois, il faut épargner 167 € par mois. Si votre capacité d'épargne réelle, une fois les dépenses essentielles couvertes, est de 250 € par mois toutes économies confondues, cet objectif est atteignable en laissant de la marge pour d'autres priorités. S'il fallait épargner 400 € par mois pour tenir le délai, l'objectif serait à revoir : soit en allongeant l'échéance, soit en réduisant le montant visé, plutôt que de se fixer un objectif voué à l'échec dès le départ.",
  },
  { type: 'heading', text: "Les pièges les plus courants" },
  {
    type: 'list',
    items: [
      "Viser un montant trop ambitieux dès le premier mois, ce qui mène à l'abandon dès qu'un imprévu vient perturber le rythme prévu.",
      "Ne suivre aucune progression, ce qui empêche de savoir si l'objectif est en bonne voie ou s'il faut ajuster l'effort mensuel.",
      "Se fixer un seul grand objectif au lieu de plusieurs objectifs plus petits, ce qui rend la progression difficile à ressentir sur le long terme.",
      "Oublier de prioriser entre objectifs concurrents (fonds d'urgence, projet, retraite) et disperser l'effort d'épargne sans réelle cohérence.",
    ],
  },
  { type: 'heading', text: 'Découper un grand objectif en étapes' },
  {
    type: 'paragraph',
    text:
      "Un objectif de 6 000 € sur deux ans paraît lointain et peu motivant vu du premier mois. Le découper en jalons intermédiaires — 1 000 € au bout de quatre mois, 3 000 € à un an, 6 000 € à deux ans — donne des points de satisfaction réguliers qui entretiennent la motivation. Ce découpage fonctionne aussi bien pour un objectif unique que pour plusieurs objectifs menés en parallèle, à condition de garder une vision claire de la part de votre capacité d'épargne allouée à chacun.",
  },
  {
    type: 'tip',
    text:
      "Dans l'app, la section Objectifs permet de créer un objectif avec un montant cible et une date cible optionnelle, puis d'y ajouter des contributions au fil des mois. La progression visuelle vers chaque objectif permet de repérer rapidement si le rythme actuel suffit à tenir l'échéance, ou s'il faut ajuster le montant mensuel épargné.",
  },
]
