import { Navigate, useParams } from 'react-router-dom'
import { ARTICLES } from '../content/learn/articles'
import { ArticleLayout } from '../components/learn/ArticleLayout'

export function LearnArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const index = ARTICLES.findIndex((a) => a.slug === slug)

  if (index === -1) return <Navigate to="/apprendre" replace />

  const article = ARTICLES[index]
  const next = ARTICLES[index + 1]

  return <ArticleLayout article={article} next={next} />
}
