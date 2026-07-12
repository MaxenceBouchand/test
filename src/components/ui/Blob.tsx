import { useId } from 'react'
import clsx from 'clsx'

type BlobVariant = 'brand' | 'blob' | 'peachy'

interface BlobProps {
  /** Positioning is the caller's responsibility, e.g. "absolute -top-16 -right-16 -z-10". */
  className?: string
  variant?: BlobVariant
  size?: number
}

// SVG presentation attributes (unlike `style`) don't resolve CSS custom properties,
// so `stop-color="var(--color-rose-400)"` silently renders as invalid/black — hex
// literals matching the tokens in index.css are required here.
const GRADIENT_STOPS: Record<BlobVariant, [string, string]> = {
  brand: ['#f0498a', '#ff9dc0'],
  blob: ['#ff6fa3', '#ab7ff2'],
  peachy: ['#ff9660', '#ff6fa3'],
}

/**
 * Soft organic background shape used as a decorative flourish (onboarding hero,
 * dashboard header, empty states). Purely visual: not interactive, not perceivable
 * data, so no alt text/aria role is needed. Opacity is baked in here (rather than
 * left to callers) so it stays visible against the pale rose page background
 * instead of washing out under blur.
 */
export function Blob({ className, variant = 'blob', size = 320 }: BlobProps) {
  const gradientId = `blob-gradient-${useId()}`
  const [from, to] = GRADIENT_STOPS[variant]

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      className={clsx('pointer-events-none blur-xl', className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        opacity={0.65}
        d="M168.75,132.475 Q137.5,164.95 93.75,175.775 Q50,186.6 37.5,143.3 Q25,100 37.5,56.7 Q50,13.4 93.75,24.225 Q137.5,35.05 168.75,67.525 Q200,100 168.75,132.475 Z"
      />
    </svg>
  )
}
