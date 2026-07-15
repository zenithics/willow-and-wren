export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { ProductCard } from '@/components/ProductCard'

export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'product-categories',
    limit: 100,
    overrideAccess: false,
    select: { slug: true },
  })

  return categories.docs.map((category) => ({ category: category.slug }))
}

type Args = {
  params: Promise<{ category: string }>
}

async function queryCategoryBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise })

  const categoryResult = await payload.find({
    collection: 'product-categories',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: false,
  })

  const category = categoryResult.docs[0]
  if (!category) return null

  const products = await payload.find({
    collection: 'products',
    where: {
      and: [{ category: { equals: category.id } }, { status: { equals: 'active' } }],
    },
    limit: 100,
    overrideAccess: false,
  })

  return { category, products: products.docs }
}

export default async function CategoryPage({ params: paramsPromise }: Args) {
  const { category: slug } = await paramsPromise
  const result = await queryCategoryBySlug(slug)

  if (!result) return notFound()

  const { category, products } = result

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-12">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{category.title}</h1>
          {category.description && <p>{category.description}</p>}
        </div>
      </div>

      <div className="container">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No products in this collection yet.</p>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { category: slug } = await paramsPromise
  const result = await queryCategoryBySlug(slug)

  return {
    title: result?.category.title ?? 'Shop',
  }
}
