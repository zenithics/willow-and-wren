import React from 'react'

import type { IntroStatementBlock as IntroStatementBlockProps } from '@/payload-types'

export const IntroStatementBlock: React.FC<IntroStatementBlockProps> = ({ text, monogramText }) => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container max-w-2xl text-center">
        {text && (
          <p className="font-serif italic text-lg md:text-xl leading-relaxed text-foreground/80">
            {text}
          </p>
        )}
        {monogramText && (
          <div className="mt-8 inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary/40 mx-auto">
            <span className="font-serif text-xs tracking-[0.15em] text-primary">{monogramText}</span>
          </div>
        )}
      </div>
    </section>
  )
}
