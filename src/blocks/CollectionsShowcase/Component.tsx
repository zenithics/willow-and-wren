import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { CollectionsShowcaseBlock as CollectionsShowcaseBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ImagePlaceholder, LeafDivider } from '@/components/Botanical'

type Category = {
  id: number
  title: string
  slug?: string | null
  description?: string | null
  image?: unknown
}

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

  const [featured, ...rest] = orderedCategories

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        {(heading || subheading) && (
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-[0.08em] mb-5">
                {heading}
              </h2>
            )}
            <LeafDivider />
            {subheading && (
              <p className="font-serif italic text-muted-foreground text-lg mt-5 leading-relaxed">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-10 md:gap-14">
          <CollectionCard category={featured} large />

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {rest.map((category) => (
                <CollectionCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CollectionCard({ category, large = false }: { category: Category; large?: boolean }) {
  return (
    <Link href={`/shop/${category.slug}`} className="group block">
      <div className="bg-white p-2.5 md:p-3 rounded-sm shadow-md">
        <div
          className={`relative overflow-hidden ${large ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
        >
          {category.image && typeof category.image === 'object' ? (
            <Media
              resource={category.image as any}
              imgClassName="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </div>

      <div className="text-center mt-6">
        <h3
          className={`font-serif uppercase tracking-[0.08em] mb-2 ${large ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}
        >
          {category.title}
        </h3>
        {category.description && (
          <p className="font-serif italic text-muted-foreground text-sm md:text-base leading-relaxed max-w-md mx-auto mb-3">
            {category.description}
          </p>
        )}
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-accent transition-opacity group-hover:opacity-70">
          View Collection
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
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
}
