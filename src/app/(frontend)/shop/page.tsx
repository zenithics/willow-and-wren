import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { ProductCard } from '@/components/ProductCard'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ShopPage() {
  const payload = await getPayload({ config: configPromise })

  const [categories, featured, allProducts] = await Promise.all([
    payload.find({
      collection: 'product-categories',
      limit: 20,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'products',
      where: { and: [{ featured: { equals: true } }, { status: { equals: 'active' } }] },
      limit: 8,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'products',
      where: { status: { equals: 'active' } },
      limit: 100,
      overrideAccess: false,
    }),
  ])

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-12">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Shop</h1>
        </div>
      </div>

      {categories.docs.length > 0 && (
        <div className="container mb-16">
          <nav className="flex flex-wrap gap-3" aria-label="Shop categories">
            {categories.docs.map((category) => (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {featured.docs.length > 0 && (
        <div className="container mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.docs.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      <div className="container">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        {allProducts.docs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts.docs.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No products yet — check back soon.</p>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Shop',
  }
}
