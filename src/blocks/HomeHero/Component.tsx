import React from 'react'
import Link from 'next/link'
import type { HomeHeroBlock as HomeHeroBlockProps } from '@/payload-types'
import { ImagePlaceholder, Sprig } from '@/components/Botanical'

const THEME_CLASSES = {
  dark: {
    wrapper: 'bg-[var(--brand-deep-plum)] text-white',
    badge: 'bg-white/10 text-[var(--accent)] border border-white/20',
    headline: 'text-white',
    sub: 'text-white/65',
    links: 'dark' as const,
  },
  light: {
    wrapper: 'bg-background text-foreground',
    badge: 'bg-(--brand-blush) text-primary border border-primary/20',
    headline: 'text-foreground',
    sub: 'text-muted-foreground',
    links: 'light' as const,
  },
  pink: {
    wrapper: 'bg-gradient-to-br from-(--brand-blush) via-secondary to-muted text-foreground',
    badge: 'bg-white/70 text-primary border border-primary/20',
    headline: 'text-foreground',
    sub: 'text-muted-foreground',
    links: 'light' as const,
  },
}

export const HomeHeroBlock: React.FC<HomeHeroBlockProps & { disableInnerContainer?: boolean }> = ({
  badge,
  headline,
  subheadline,
  links,
  backgroundImage,
  style = 'split',
  theme = 'light',
  botanicalOverlay,
}) => {
  const t = THEME_CLASSES[theme as keyof typeof THEME_CLASSES] || THEME_CLASSES.light
  const hasImage = backgroundImage && typeof backgroundImage === 'object'

  if (style === 'centred') {
    return (
      <section
        className={`relative min-h-[75vh] flex items-center justify-center text-center px-6 py-24 ${t.wrapper}`}
        style={hasImage ? { backgroundImage: `url(${(backgroundImage as any).url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        {hasImage && <div className="absolute inset-0 bg-black/50" />}
        {botanicalOverlay && <BotanicalOverlay />}
        <div className="relative z-10 max-w-3xl mx-auto">
          {badge && (
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 ${
              hasImage ? 'bg-white/20 text-white border border-white/30' : t.badge
            }`}>
              {badge}
            </span>
          )}
          <h1 className={`font-serif text-5xl md:text-7xl leading-tight mb-5 ${hasImage ? 'text-white' : t.headline}`}>
            {headline}
          </h1>
          {subheadline && (
            <p className={`font-serif text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed ${hasImage ? 'text-white/80' : t.sub}`}>
              {subheadline}
            </p>
          )}
          <HeroLinks links={links} variant={hasImage ? 'dark' : t.links} />
        </div>
      </section>
    )
  }

  if (style === 'fullwidth') {
    return (
      <section
        className={`relative min-h-[80vh] flex items-end pb-16 px-6 md:px-12 ${t.wrapper}`}
        style={hasImage ? { backgroundImage: `url(${(backgroundImage as any).url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        {hasImage && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />}
        {botanicalOverlay && <BotanicalOverlay />}
        <div className="relative z-10 max-w-2xl">
          {badge && (
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 ${
              hasImage ? 'bg-white/20 text-white border border-white/30' : t.badge
            }`}>
              {badge}
            </span>
          )}
          <h1 className={`font-serif text-5xl md:text-6xl leading-tight mb-4 ${hasImage ? 'text-white' : t.headline}`}>
            {headline}
          </h1>
          {subheadline && (
            <p className={`font-serif text-base mb-7 leading-relaxed max-w-lg ${hasImage ? 'text-white/75' : t.sub}`}>
              {subheadline}
            </p>
          )}
          <HeroLinks links={links} variant={hasImage ? 'dark' : t.links} />
        </div>
      </section>
    )
  }

  /* Default: split layout */
  return (
    <section className={`relative min-h-[85vh] grid grid-cols-1 lg:grid-cols-2 ${t.wrapper}`}>
      {botanicalOverlay && <BotanicalOverlay />}
      {/* Text side */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-14 py-16 lg:py-24 order-2 lg:order-1">
        {badge && (
          <span className={`inline-flex w-fit px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 ${t.badge}`}>
            {badge}
          </span>
        )}
        <h1 className={`font-serif text-5xl md:text-6xl xl:text-7xl leading-[1.05] mb-5 ${t.headline}`}>
          {headline}
        </h1>
        {subheadline && (
          <p className={`font-serif text-base md:text-lg mb-8 leading-relaxed max-w-md ${t.sub}`}>
            {subheadline}
          </p>
        )}
        <HeroLinks links={links} variant={t.links} />
      </div>

      {/* Image side */}
      <div className="relative min-h-[50vh] lg:min-h-0 order-1 lg:order-2 overflow-hidden bg-muted">
        {hasImage ? (
          <img
            src={(backgroundImage as any).url}
            alt={(backgroundImage as any).alt || headline}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
    </section>
  )
}

function BotanicalOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <Sprig className="absolute top-4 left-4 w-10 h-16 md:w-14 md:h-24 text-current opacity-30 -rotate-12" />
      <Sprig className="absolute bottom-4 right-4 w-10 h-16 md:w-14 md:h-24 text-current opacity-30 rotate-[168deg]" />
    </div>
  )
}

function HeroLinks({
  links,
  variant = 'dark',
}: {
  links: HomeHeroBlockProps['links']
  variant?: 'dark' | 'light'
}) {
  if (!links || links.length === 0) return null
  const secondaryClass =
    variant === 'light'
      ? 'border border-foreground/25 text-foreground hover:bg-foreground/5'
      : 'border border-white/30 text-white hover:bg-white/10'

  return (
    <div className="flex flex-wrap gap-3">
      {links.map(({ link }, i) => {
        const href = link.type === 'reference' && link.reference
          ? `/${(link.reference.value as any)?.slug || ''}`
          : link.url || '/'
        const isPrimary = i === 0 || link.appearance === 'default'
        return (
          <Link
            key={i}
            href={href}
            {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-bold transition-all ${
              isPrimary
                ? 'bg-primary text-(--brand-blush) hover:bg-primary/90 shadow-[0_4px_16px_rgba(166,176,154,0.45)]'
                : secondaryClass
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}
