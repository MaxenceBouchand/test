import { ARTICLES } from '../content/learn/articles'
import { GROUP_LABELS, GROUP_ORDER } from '../content/learn/types'
import { ArticleCard } from '../components/learn/ArticleCard'

export function LearnIndexPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">Apprendre</h1>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Des guides courts et concrets pour mieux comprendre et gérer votre budget.
        </p>
      </div>

      {GROUP_ORDER.map((group) => {
        const groupArticles = ARTICLES.filter((a) => a.group === group)
        if (groupArticles.length === 0) return null
        return (
          <div key={group}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-400">
              {GROUP_LABELS[group]}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {groupArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
