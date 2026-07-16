import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Sprig } from '@/components/Botanical'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  style = 'card',
  buttonBackground = 'sage',
  links,
  richText,
}) => {
  if (style === 'band') {
    const buttonClass =
      buttonBackground === 'charcoal'
        ? 'bg-[var(--brand-deep-plum)] text-[var(--brand-blush)] hover:bg-[var(--brand-deep-plum)]/90'
        : 'bg-primary text-[var(--brand-blush)] hover:bg-primary/90'

    return (
      <section className="relative overflow-hidden py-20 md:py-24 text-center bg-secondary">
        <Sprig className="pointer-events-none absolute top-6 left-6 w-10 h-16 text-primary/25 -rotate-12" aria-hidden="true" />
        <Sprig className="pointer-events-none absolute bottom-6 right-6 w-10 h-16 text-primary/25 rotate-[168deg]" aria-hidden="true" />
        <div className="relative container max-w-2xl flex flex-col items-center gap-8">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
          <div className="flex flex-wrap justify-center gap-4">
            {(links || []).map(({ link }, i) => (
              <CMSLink key={i} size="lg" {...link} className={buttonClass} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
