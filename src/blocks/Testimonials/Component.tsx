'use client'

import React, { useState } from 'react'

import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { LeafDivider } from '@/components/Botanical'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  heading,
  layout = 'grid',
  testimonials,
}) => {
  if (layout === 'stacked') {
    return <StackedTestimonials heading={heading} testimonials={testimonials} />
  }

  return (
    <div className="container py-16 md:py-20">
      {heading && (
        <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials?.map((testimonial, i) => (
          <div
            key={i}
            className="bg-card rounded-lg border border-border p-6 flex flex-col gap-4"
          >
            {testimonial.rating && (
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, idx) => (
                  <span key={idx} className="text-accent">★</span>
                ))}
                {Array.from({ length: 5 - testimonial.rating }).map((_, idx) => (
                  <span key={idx} className="text-muted-foreground">★</span>
                ))}
              </div>
            )}
            {testimonial.quote && (
              <RichText className="mb-0 text-muted-foreground italic" data={testimonial.quote} enableGutter={false} />
            )}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
              {testimonial.image && typeof testimonial.image === 'object' && (
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Media resource={testimonial.image} imgClassName="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <p className="font-semibold text-sm">{testimonial.author}</p>
                {testimonial.role && (
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StackedTestimonials({
  heading,
  testimonials,
}: {
  heading?: string | null
  testimonials: TestimonialsBlockProps['testimonials']
}) {
  const [active, setActive] = useState(0)

  if (!testimonials || testimonials.length === 0) return null
  const current = testimonials[active]

  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="container max-w-2xl text-center">
        {heading && (
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-[0.08em] mb-4 text-white">
              {heading}
            </h2>
            <LeafDivider className="text-white/70" />
          </div>
        )}

        {typeof current.rating === 'number' && current.rating > 0 && (
          <div className="flex justify-center gap-1 mb-6" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span key={idx} className={idx < current.rating! ? 'text-accent' : 'text-white/40'}>
                ★
              </span>
            ))}
          </div>
        )}

        {current.quote && (
          <RichText
            className="mb-0 font-serif italic text-2xl md:text-3xl leading-snug text-white [&_p]:mb-0"
            data={current.quote}
            enableGutter={false}
          />
        )}

        <div className="mt-8 flex flex-col items-center gap-3">
          {current.image && typeof current.image === 'object' && (
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Media resource={current.image} imgClassName="w-full h-full object-cover" />
            </div>
          )}
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/85">
            {current.author}
            {current.eventDate ? ` — ${current.eventDate}` : ''}
          </p>
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === active ? 'bg-white' : 'bg-white/35 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
