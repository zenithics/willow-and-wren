import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { CollectionsShowcaseBlock as CollectionsShowcaseBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ImagePlaceholder, LeafDivider } from '@/components/Botanical'

export const CollectionsShowcaseBlock: React.FC<CollectionsShowcaseBlockProps> = async ({
  heading,
  subheading,
  collections,
}) => {
  const payload = await getPayload({ config: configPromise })

  const selectedIds = (collections ?? [])
    .map((c) => (typeof c === 'object' && c !== null ? c.id : c))
    .filter(Boolean)

  if (selectedIds.length === 0) return null

  const result = await payload.find({
    collection: 'product-categories',
    where: { id: { in: selectedIds } },
    limit: selectedIds.length,
    overrideAccess: false,
  })

  const orderedCategories = selectedIds
    .map((id) => result.docs.find((doc) => doc.id === id))
    .filter((doc): doc is (typeof result.docs)[number] => Boolean(doc))

  if (!orderedCategories.length) return null

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        {(heading || subheading) && (
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-5">{heading}</h2>
            )}
            <LeafDivider />
            {subheading && (
              <p className="font-serif text-muted-foreground text-lg mt-5 leading-relaxed">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-20 md:gap-28">
          {orderedCategories.map((category, index) => {
            const isImageRight = index % 2 === 0

            return (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                <div
                  className={`relative aspect-4/3 lg:aspect-square overflow-hidden rounded-sm ${
                    isImageRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {category.image && typeof category.image === 'object' ? (
                    <Media
                      resource={category.image}
                      imgClassName="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </div>

                <div
                  className={`flex flex-col ${
                    isImageRight ? 'lg:order-1 lg:items-start' : 'lg:order-2 lg:items-start'
                  }`}
                >
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                    {String(index + 1).padStart(2, '0')} Collection
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="font-serif text-muted-foreground leading-relaxed max-w-md mb-6">
                      {category.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground border-b border-foreground/30 pb-1 transition-opacity group-hover:opacity-70">
                    View Collection
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path d="M1 8h14M9 2l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
