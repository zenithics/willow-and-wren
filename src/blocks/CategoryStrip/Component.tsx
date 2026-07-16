import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { CategoryStripBlock as CategoryStripBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ImagePlaceholder, LeafDivider } from '@/components/Botanical'

export const CategoryStripBlock: React.FC<CategoryStripBlockProps> = async ({
  heading,
  categories,
}) => {
  const payload = await getPayload({ config: configPromise })

  const selectedIds = (categories ?? [])
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
          limit: 7,
          overrideAccess: false,
        })

  const orderedCategories =
    selectedIds.length > 0
      ? selectedIds
          .map((id) => result.docs.find((doc) => doc.id === id))
          .filter((doc): doc is (typeof result.docs)[number] => Boolean(doc))
      : result.docs

  if (!orderedCategories.length) return null

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        {heading && (
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif tracking-tight mb-4">{heading}</h2>
            <LeafDivider />
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 md:gap-x-12">
          {orderedCategories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="group flex flex-col items-center gap-3 w-24 md:w-28 text-center"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-border transition-colors group-hover:border-primary">
                {category.image && typeof category.image === 'object' ? (
                  <Media
                    resource={category.image}
                    imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <ImagePlaceholder rounded />
                )}
              </div>
              <span className="text-sm font-medium tracking-wide font-serif transition-colors group-hover:text-primary">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
