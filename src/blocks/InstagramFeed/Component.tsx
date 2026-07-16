import React from 'react'

import type { InstagramFeedBlock as InstagramFeedBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ImagePlaceholder, LeafDivider } from '@/components/Botanical'

export const InstagramFeedBlock: React.FC<InstagramFeedBlockProps> = ({
  heading,
  handle,
  profileUrl,
  images,
}) => {
  if (!images || images.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        {(heading || handle) && (
          <div className="text-center mb-10">
            {heading && (
              <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-[0.08em] mb-3">
                {heading}
              </h2>
            )}
            <LeafDivider className="mb-3" />
            {handle && (
              <p className="font-serif italic text-muted-foreground">
                {profileUrl ? (
                  <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    {handle}
                  </a>
                ) : (
                  handle
                )}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {images.map((item, i) => {
            const image = item.image
            const content = (
              <div className="relative aspect-square overflow-hidden group">
                {image && typeof image === 'object' ? (
                  <Media
                    resource={image}
                    imgClassName="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </div>
            )

            return item.url ? (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={i}>{content}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
