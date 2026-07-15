export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { AddToCartForm } from '@/components/AddToCartForm'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { productSchema } from '@/utilities/generateJsonLd'

export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    limit: 200,
    overrideAccess: false,
    select: { slug: true },
  })

  return products.docs.map((product) => ({ product: product.slug }))
}

type Args = {
  params: Promise<{ product: string }>
}

async function queryProductBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: false,
  })

  return result.docs[0] || null
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { product: slug } = await paramsPromise
  const product = await queryProductBySlug(slug)

  if (!product) return notFound()

  const images = Array.isArray(product.images) ? product.images : []
  const categories = Array.isArray(product.category) ? product.category : []
  const jsonLd = await productSchema(product)

  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        {categories.length > 0 && (
          <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
            {categories.map((category, i) => {
              if (typeof category !== 'object') return null
              return (
                <span key={category.id}>
                  <Link href={`/shop/${category.slug}`} className="hover:text-primary">
                    {category.title}
                  </Link>
                  {i < categories.length - 1 && ', '}
                </span>
              )
            })}
          </nav>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              {images[0] && typeof images[0] === 'object' ? (
                <Media resource={images[0]} imgClassName="w-full h-full object-cover" />
              ) : null}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1).map((image) =>
                  typeof image === 'object' ? (
                    <div
                      key={image.id}
                      className="aspect-square bg-muted rounded-md overflow-hidden"
                    >
                      <Media resource={image} imgClassName="w-full h-full object-cover" />
                    </div>
                  ) : null,
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-muted-foreground">{product.shortDescription}</p>
            </div>

            <AddToCartForm product={product} />

            {product.description && (
              <div className="border-t border-border pt-6">
                <RichText data={product.description} enableGutter={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { product: slug } = await paramsPromise
  const product = await queryProductBySlug(slug)

  return {
    title: product?.title ?? 'Product',
    description: product?.shortDescription,
  }
}
