'use client'

import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { useCart } from '@/providers/Cart'
import { formatPrice } from '@/utilities/formatPrice'

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-12">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Your Cart</h1>
        </div>
      </div>

      <div className="container">
        {items.length === 0 ? (
          <div className="flex flex-col items-start gap-4">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantName ?? ''}`}
                  className="flex gap-4 border-b border-border pb-6"
                >
                  <div className="w-24 h-24 bg-muted rounded-md overflow-hidden shrink-0">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : null}
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    <Link href={`/shop/products/${item.slug}`} className="font-semibold hover:text-primary">
                      {item.title}
                    </Link>
                    {item.variantName && (
                      <p className="text-sm text-muted-foreground">{item.variantName}</p>
                    )}
                    <p className="text-sm font-medium">{formatPrice(item.unitPrice)}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <label className="text-sm" htmlFor={`qty-${item.productId}`}>
                        Qty
                      </label>
                      <input
                        id={`qty-${item.productId}`}
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.productId,
                            Math.max(1, Number(e.target.value) || 1),
                            item.variantName,
                          )
                        }
                        className="w-16 border border-input rounded-md px-2 py-1 bg-background text-sm"
                      />
                      <button
                        onClick={() => removeItem(item.productId, item.variantName)}
                        className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-semibold">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6 h-fit rounded-lg border border-border p-6">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Button size="lg" disabled title="Checkout is coming soon">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
