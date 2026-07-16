import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { FeaturedProductsBlock as FeaturedProductsBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatPrice } from '@/utilities/formatPrice'
import { ImagePlaceholder, LeafDivider } from '@/components/Botanical'

export const FeaturedProductsBlock: React.FC<FeaturedProductsBlockProps> = async ({
  heading,
  subheading,
  products,
}) => {
  const payload = await getPayload({ config: configPromise })

  const selectedIds = (products ?? [])
    .map((p) => (typeof p === 'object' && p !== null ? p.id : p))
    .filter(Boolean)

  const result =
    selectedIds.length > 0
      ? await payload.find({
          collection: 'products',
          where: { id: { in: selectedIds } },
          limit: selectedIds.length,
          overrideAccess: false,
        })
      : await payload.find({
          collection: 'products',
          where: { featured: { equals: true }, status: { equals: 'active' } },
          limit: 4,
          overrideAccess: false,
        })

  const orderedProducts =
    selectedIds.length > 0
      ? selectedIds
          .map((id) => result.docs.find((doc) => doc.id === id))
          .filter((doc): doc is (typeof result.docs)[number] => Boolean(doc))
      : result.docs

  if (!orderedProducts.length) return null

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        {(heading || subheading) && (
          <div className="text-center max-w-2xl mx-auto mb-14">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">{heading}</h2>
            )}
            <LeafDivider className="mb-4" />
            {subheading && <p className="font-serif text-muted-foreground text-lg">{subheading}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {orderedProducts.map((product) => {
            const image = Array.isArray(product.images) ? product.images[0] : undefined

            return (
              <Link
                key={product.id}
                href={`/shop/products/${product.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden rounded-sm mb-4 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                  {image && typeof image === 'object' ? (
                    <Media
                      resource={image}
                      imgClassName="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </div>
                <h3 className="text-lg font-serif tracking-tight mb-1">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  From {formatPrice(product.price)}
                </p>
                <span className="text-xs font-semibold tracking-wide uppercase text-primary transition-opacity group-hover:opacity-70">
                  View
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
