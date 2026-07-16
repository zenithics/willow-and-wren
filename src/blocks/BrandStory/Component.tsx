import React from 'react'

import type { BrandStoryBlock as BrandStoryBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { ImagePlaceholder } from '@/components/Botanical'

export const BrandStoryBlock: React.FC<BrandStoryBlockProps> = ({
  heading,
  subheading,
  content,
  image,
  imagePosition = 'left',
  links,
}) => {
  const isImageRight = imagePosition === 'right'
  const link = links?.[0]?.link

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className={isImageRight ? 'lg:order-2' : 'lg:order-1'}>
          <div className="bg-white p-2.5 md:p-3 rounded-sm shadow-md">
            <div className="relative aspect-[4/5] overflow-hidden">
              {image && typeof image === 'object' ? (
                <Media resource={image} imgClassName="w-full h-full object-cover" />
              ) : (
                <ImagePlaceholder />
              )}
            </div>
          </div>
        </div>

        <div className={isImageRight ? 'lg:order-1' : 'lg:order-2'}>
          {heading && (
            <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-[0.08em] mb-2">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="font-serif italic text-lg text-primary mb-6">{subheading}</p>
          )}
          {content && (
            <RichText
              className="mb-8 font-serif text-muted-foreground leading-relaxed max-w-lg"
              data={content}
              enableGutter={false}
            />
          )}
          {link && (
            <CMSLink
              {...link}
              appearance="default"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.12em] uppercase bg-accent text-white hover:bg-accent/90 transition-colors shadow-[0_4px_16px_rgba(198,168,106,0.35)]"
            />
          )}
        </div>
      </div>
    </section>
  )
}
