import React from 'react'

import type { BrandStoryBlock as BrandStoryBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { ImagePlaceholder } from '@/components/Botanical'

export const BrandStoryBlock: React.FC<BrandStoryBlockProps> = ({
  heading,
  content,
  image,
  imagePosition = 'left',
  links,
}) => {
  const isImageRight = imagePosition === 'right'
  const link = links?.[0]?.link

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
        <div
          className={`relative min-h-[320px] lg:min-h-0 overflow-hidden rounded-sm ${
            isImageRight ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          {image && typeof image === 'object' ? (
            <Media resource={image} imgClassName="w-full h-full object-cover" />
          ) : (
            <ImagePlaceholder />
          )}
        </div>

        <div className={`flex flex-col justify-center ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
          {heading && (
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-6">{heading}</h2>
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
              appearance="inline"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground border-b border-foreground/30 pb-1 hover:opacity-70 transition-opacity"
            />
          )}
        </div>
      </div>
    </section>
  )
}
