'use client'

import React, { useState } from 'react'

import type { Product } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { useCart } from '@/providers/Cart'
import { formatPrice } from '@/utilities/formatPrice'

export const AddToCartForm: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCart()
  const [variantName, setVariantName] = useState<string | undefined>(
    product.hasVariants ? product.variants?.[0]?.name : undefined,
  )
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const selectedVariant = product.variants?.find((v) => v.name === variantName)
  const unitPrice = selectedVariant?.priceOverride ?? product.price
  const outOfStock = typeof product.stock === 'number' && product.stock <= 0

  const primaryImage = Array.isArray(product.images) ? product.images[0] : undefined
  const imageUrl =
    primaryImage && typeof primaryImage === 'object' ? (primaryImage.url ?? undefined) : undefined

  const handleAdd = () => {
    addItem(
      {
        productId: String(product.id),
        slug: product.slug ?? '',
        title: product.title,
        image: imageUrl,
        unitPrice,
        variantName,
      },
      quantity,
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold">{formatPrice(unitPrice)}</span>
        {product.compareAtPrice && product.compareAtPrice > unitPrice && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      {product.hasVariants && product.variants && product.variants.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="variant">
            Options
          </label>
          <select
            id="variant"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
            className="border border-input rounded-md px-3 py-2 bg-background"
          >
            {product.variants.map((v) => (
              <option key={v.id ?? v.name} value={v.name ?? ''}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium" htmlFor="quantity">
          Qty
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          className="w-20 border border-input rounded-md px-3 py-2 bg-background"
        />
      </div>

      <Button onClick={handleAdd} disabled={outOfStock} size="lg">
        {outOfStock ? 'Out of Stock' : added ? 'Added to Cart' : 'Add to Cart'}
      </Button>
    </div>
  )
}
