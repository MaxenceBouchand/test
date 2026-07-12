# Budget rose

Une web app pour apprendre et gérer son budget personnel, avec un thème rose minimaliste.

100 % côté client : aucun compte, aucun serveur. Toutes les données restent dans le navigateur (`localStorage`), avec export/import JSON pour les sauvegarder ou changer d'appareil.

## Fonctionnalités

- **Onboarding** : revenu mensuel, choix de méthode budgétaire, catégories pré-remplies éditables.
- **Deux méthodes de budget au choix** : la règle 50/30/20 (besoins/envies/épargne) et le budget base zéro (chaque euro assigné jusqu'à zéro non-assigné) — bascule possible à tout moment dans les Paramètres.
- **Tableau de bord** : revenu, dépenses, solde, taux d'épargne, alertes de dépassement, graphiques de répartition (donut) et de comparaison budget vs dépensé.
- **Rapport PDF téléchargeable** : compte rendu détaillé de la répartition du mois, dont les chiffres sont garantis identiques à ceux du tableau de bord (mêmes fonctions de calcul, source unique de vérité).
- **Transactions** : ajout, édition, suppression, filtres par type et catégorie.
- **Catégories** : gestion complète avec suivi visuel du budget par catégorie.
- **Objectifs d'épargne** : création d'objectifs avec montant et date cible, contributions progressives.
- **Historique** : tendance sur 6 mois, comparatif mensuel.
- **Apprendre** : 8 articles pédagogiques en français sur la gestion de budget (règle 50/30/20, budget base zéro, besoins vs envies, réduire ses dépenses, épargne de précaution, objectifs d'épargne...).
- **Thème clair/sombre**, entièrement responsive (navigation mobile dédiée).

## Stack technique

React + TypeScript + Vite, Tailwind CSS v4, React Router, Zustand (persistance localStorage), Recharts, jsPDF.

## Démarrer

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
npm run preview
```
