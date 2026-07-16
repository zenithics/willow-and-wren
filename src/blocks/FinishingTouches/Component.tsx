import React from 'react'

import type { FinishingTouchesBlock as FinishingTouchesBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ImagePlaceholder, LeafDivider } from '@/components/Botanical'

export const FinishingTouchesBlock: React.FC<FinishingTouchesBlockProps> = ({ heading, items }) => {
  if (!items || items.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        {heading && (
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-[0.08em] mb-4">
              {heading}
            </h2>
            <LeafDivider />
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-8">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 w-20 md:w-24 text-center">
              <div className="relative w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden border border-foreground/15">
                {item.image && typeof item.image === 'object' ? (
                  <Media resource={item.image} imgClassName="w-full h-full object-cover" />
                ) : (
                  <ImagePlaceholder rounded />
                )}
              </div>
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-foreground/70">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
