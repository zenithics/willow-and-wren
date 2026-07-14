import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { FeaturedCollectionsBlock as FeaturedCollectionsBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const FeaturedCollectionsBlock: React.FC<FeaturedCollectionsBlockProps> = async ({
  heading,
  subheading,
  collections,
}) => {
  const payload = await getPayload({ config: configPromise })

  const selectedIds = (collections ?? [])
    .map((c) => (typeof c === 'object' && c !== null ? c.id : c))
    .filter(Boolean)

  const result =
    selectedIds.length > 0
      ? await payload.find({
          collection: 'product-categories',
          where: { id: { in: selectedIds } },
          limit: selectedIds.length,
          overrideAccess: false,
        })
      : await payload.find({
          collection: 'product-categories',
          limit: 12,
          overrideAccess: false,
        })

  const categories = result.docs

  if (!categories.length) return null

  return (
    <div className="container">
      {(heading || subheading) && (
        <div className="text-center mb-12 max-w-2xl mx-auto">
          {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
          {subheading && <p className="text-muted-foreground">{subheading}</p>}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop/${category.slug}`}
            className="group flex flex-col gap-3 rounded-lg border border-border bg-card overflow-hidden hover:border-primary transition-colors"
          >
            <div className="aspect-square bg-muted overflow-hidden">
              {category.image && typeof category.image === 'object' ? (
                <Media
                  resource={category.image}
                  imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : null}
            </div>
            <h3 className="px-4 pb-4 text-lg font-semibold">{category.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
