import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react'
import type { Article, ArticleBlock } from '../../content/learn/types'
import { Card } from '../ui'

interface ArticleLayoutProps {
  article: Article
  next?: Article
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="mt-2 text-lg font-semibold text-stone-900 dark:text-stone-50">{block.text}</h2>
    case 'paragraph':
      return <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">{block.text}</p>
    case 'list':
      return (
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'tip':
      return (
        <div className="flex items-start gap-3 rounded-xl bg-rose-50 p-4 text-sm text-rose-800 dark:bg-rose-900/20 dark:text-rose-200">
          <Lightbulb size={18} className="mt-0.5 shrink-0" />
          <p>{block.text}</p>
        </div>
      )
  }
}

export function ArticleLayout({ article, next }: ArticleLayoutProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        to="/apprendre"
        className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-400"
      >
        <ArrowLeft size={15} /> Retour à Apprendre
      </Link>

      <div>
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">{article.title}</h1>
        <p className="mt-1 text-sm text-stone-400">{article.readTimeMinutes} min de lecture</p>
      </div>

      <div className="flex flex-col gap-4">
        {article.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>

      {next && (
        <Card padded>
          <Link to={`/apprendre/${next.slug}`} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">Article suivant</p>
              <p className="font-medium text-stone-800 dark:text-stone-100">{next.title}</p>
            </div>
            <ArrowRight size={18} className="text-rose-500" />
          </Link>
        </Card>
      )}
    </div>
  )
}
