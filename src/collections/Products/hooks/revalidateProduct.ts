import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateProduct: CollectionAfterChangeHook = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/shop/products/${doc.slug}`)
    revalidatePath('/shop', 'layout')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/shop/products/${doc?.slug}`)
    revalidatePath('/shop', 'layout')
  }
  return doc
}

export const revalidateProductCategory: CollectionAfterChangeHook = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/shop/${doc.slug}`)
    revalidatePath('/shop', 'layout')
  }
  return doc
}
