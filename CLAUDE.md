# CLAUDE.md — Artisan Plombier Montpellier

## Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styles**: Tailwind CSS 4 (via `@tailwindcss/postcss`)
- **Fonts**: Staatliches (display) + Albert Sans (body) — Google Fonts

## Build Commands
```bash
npm run dev        # Dev server (port 3000)
npm run build      # Production build
npm run type-check # TypeScript check (no emit)
npm run lint       # ESLint
```

## Project Structure
```
app/
  layout.tsx       # Root layout + SEO metadata + JSON-LD
  page.tsx         # Main page — composes all sections
  globals.css      # Design tokens (@theme), base styles, animations
components/
  Header.tsx           # Sticky header + mobile menu + call CTA
  EmergencyTicker.tsx  # Auto-scrolling availability banner
  HeroSection.tsx      # Above-fold with emergency badge
  ServicesSection.tsx  # Service cards grid
  BeforeAfterGallery.tsx # Drag-to-compare slider
  QuoteForm.tsx        # 3-step quiz form
  Footer.tsx           # CTA band + links + contact
```

## Design Tokens (globals.css `@theme`)
| Token | Value | Usage |
|---|---|---|
| `--color-brass` | `#C8A55A` | Primary accent, CTAs |
| `--color-matte-black` | `#1A1917` | Header, dark sections |
| `--color-emergency` | `#C0392B` | Urgent CTAs, ticker |
| `--color-stone-50..900` | Stone palette | Backgrounds, text |
| `--font-display` | Staatliches | All `h1`–`h4` |
| `--font-body` | Albert Sans | Body text |
| `--radius-sm/md` | `4px` | All rounded corners |
| `--spacing-touch` | `48px` | Min touch target size |

## Style Conventions
- **Border radius**: always `4px` (`rounded-[4px]`) — never `rounded-lg` or higher unless explicitly noted
- **Touch targets**: all interactive elements use `minHeight: "48px"` for mobile WCAG compliance
- **Focus**: `:focus-visible` outline uses `--color-brass` at 2px offset
- **Fonts**: always apply display font via `style={{ fontFamily: "var(--font-display)" }}` on heading elements, never via class
- **Colors**: prefer CSS variable names in Tailwind brackets — e.g. `bg-[#C8A55A]` — for consistency with the design token system
- **Animations**: use named keyframes defined in `globals.css` (ticker-scroll, fade-in, slide-up, pulse-dot)

## Component Guidelines
- All interactive components use `"use client"` directive
- Server components by default for non-interactive sections (better LCP)
- Images: always `next/image` with `fill` + explicit `sizes` prop for responsive images
- Avoid `any` types; prefer narrow union types for form state

## SEO & Performance
- JSON-LD `LocalBusiness` schema injected in `layout.tsx`
- All images served as WebP/AVIF via `next.config.ts` formats
- Hero image uses `priority` prop for LCP optimization
- Fonts loaded via `@import` in CSS with `display=swap`

## Personalization Placeholders
Search for `XX` to find values that need real data:
- `04 XX XX XX XX` — real phone number
- `{{NOM_ARTISAN}}` — artisan's full name
- `/og-image.jpg` — real OG image

## Next Steps
1. Replace placeholder phone number and artisan name throughout
2. Replace Unsplash image URLs with real project photos (add to `public/images/`)
3. Wire up QuoteForm submission to a real endpoint (email service or CRM)
4. Add `sitemap.xml` and `robots.txt` in `/app`
5. Run `/review` before deploying to production

## Code Review & Iteration
- Use `/compact` after large context sessions to summarize progress
- Use `/review` to audit components before shipping
- Lighthouse target: >95 on Performance, Accessibility, SEO
