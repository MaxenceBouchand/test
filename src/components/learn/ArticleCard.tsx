import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import type { Article } from '../../content/learn/types'
import { Card } from '../ui'

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={`/apprendre/${article.slug}`}>
      <Card padded className="flex h-full flex-col gap-2 transition-colors hover:border-rose-300 dark:hover:border-rose-700">
        <h3 className="font-semibold text-stone-900 dark:text-stone-50">{article.title}</h3>
        <p className="flex-1 text-sm text-stone-500 dark:text-stone-400">{article.excerpt}</p>
        <span className="flex items-center gap-1.5 text-xs text-stone-400">
          <Clock size={13} /> {article.readTimeMinutes} min de lecture
        </span>
      </Card>
    </Link>
  )
}
