import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatPrice } from '@/utilities/formatPrice'

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const primaryImage = Array.isArray(product.images) ? product.images[0] : undefined

  return (
    <Link
      href={`/shop/products/${product.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:border-primary transition-colors"
    >
      <div className="aspect-square bg-muted overflow-hidden">
        {primaryImage && typeof primaryImage === 'object' ? (
          <Media
            resource={primaryImage}
            imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.shortDescription}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
