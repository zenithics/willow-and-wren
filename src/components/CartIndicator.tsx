'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { useCart } from '@/providers/Cart'

export const CartIndicator: React.FC = () => {
  const { itemCount } = useCart()

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
      className="relative inline-flex items-center justify-center p-2 -mr-2 text-foreground/80 hover:text-primary transition-colors"
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium leading-none text-primary-foreground">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
