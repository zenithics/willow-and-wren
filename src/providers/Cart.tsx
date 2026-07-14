'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

export type CartItem = {
  productId: string
  slug: string
  title: string
  image?: string
  unitPrice: number
  variantName?: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (productId: string, variantName?: string) => void
  updateQuantity: (productId: string, quantity: number, variantName?: string) => void
  clearCart: () => void
  subtotal: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'cart'

function lineKey(productId: string, variantName?: string): string {
  return `${productId}::${variantName ?? ''}`
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // Malformed storage — start with an empty cart
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const key = lineKey(item.productId, item.variantName)
      const existing = prev.find((i) => lineKey(i.productId, i.variantName) === key)
      if (existing) {
        return prev.map((i) =>
          lineKey(i.productId, i.variantName) === key
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }, [])

  const removeItem = useCallback((productId: string, variantName?: string) => {
    const key = lineKey(productId, variantName)
    setItems((prev) => prev.filter((i) => lineKey(i.productId, i.variantName) !== key))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantName?: string) => {
      const key = lineKey(productId, variantName)
      setItems((prev) => {
        if (quantity <= 0) return prev.filter((i) => lineKey(i.productId, i.variantName) !== key)
        return prev.map((i) =>
          lineKey(i.productId, i.variantName) === key ? { ...i, quantity } : i,
        )
      })
    },
    [],
  )

  const clearCart = useCallback(() => setItems([]), [])

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
