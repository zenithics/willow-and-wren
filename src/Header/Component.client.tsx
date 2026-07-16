'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'
import Image from 'next/image'
import { useCart } from '@/providers/Cart'

interface HeaderClientProps {
  data: Header
  logo?: Media | null
}

function resolveLinkHref(link: any): string {
  if (link?.type === 'custom' && link?.url) return link.url
  if (link?.reference?.value) {
    const doc = link.reference.value
    const col = link.reference.relationTo
    if (col === 'pages') return `/${doc.slug ?? ''}`
    if (col === 'posts') return `/posts/${doc.slug ?? ''}`
  }
  return '#'
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLeft = (data?.navItemsLeft ?? []).map((item: any) => ({
    href: resolveLinkHref(item.link),
    label: item.link?.label ?? '',
    newTab: item.link?.newTab ?? false,
  }))

  const navRight = (data?.navItemsRight ?? []).map((item: any) => ({
    href: resolveLinkHref(item.link),
    label: item.link?.label ?? '',
    newTab: item.link?.newTab ?? false,
  }))

  const navItems = [...navLeft, ...navRight]

  return (
    <header className="sticky top-0 z-50 w-full bg-background/96 backdrop-blur-[6px] border-b border-border transition-[padding] duration-300">
      <div
        className={`max-w-[1360px] mx-auto grid grid-cols-[auto_1fr_auto] items-center px-6 md:px-12 transition-[padding] duration-300 ${
          scrolled ? 'py-3' : 'py-[22px]'
        }`}
      >
        {/* Logo — left */}
        <Link href="/" aria-label="Home" className="flex flex-col gap-0.5 justify-self-start">
          {logo?.url ? (
            <Image
              src={logo.url}
              alt={logo.alt || 'Logo'}
              width={logo.width ?? 160}
              height={logo.height ?? 40}
              className="h-9 w-auto object-contain"
              priority
            />
          ) : (
            <>
              <span className="font-serif font-medium text-[21px] tracking-[0.28em] text-foreground whitespace-nowrap">
                WILLOW{' '}
                <span className="font-script tracking-normal text-[0.85em] text-primary">&amp;</span>
                {' '}WREN
              </span>
              <span className="font-serif text-[9px] tracking-[0.42em] text-muted-foreground">
                BESPOKE WEDDING STATIONERY
              </span>
            </>
          )}
        </Link>

        {/* Nav — centred */}
        <nav className="hidden md:flex gap-11 justify-self-center" aria-label="Primary navigation">
          {navItems.map(({ href, label, newTab }) => (
            <Link
              key={href}
              href={href}
              target={newTab ? '_blank' : undefined}
              rel={newTab ? 'noopener noreferrer' : undefined}
              className="font-serif text-[15px] tracking-[0.22em] uppercase text-foreground/85 pb-[3px] border-b border-transparent hover:text-accent hover:border-accent transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions — right */}
        <div className="flex items-center gap-6 justify-self-end">
          <Link
            href="/search"
            aria-label="Search"
            className="font-serif text-[17px] text-foreground/85 hover:text-accent transition-colors duration-300"
          >
            ⌕
          </Link>
          <Link
            href="/cart"
            aria-label={`Shopping bag, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
            className="relative font-serif text-[15px] tracking-[0.18em] uppercase text-foreground/85 hover:text-accent transition-colors duration-300"
          >
            Bag
            {itemCount > 0 && (
              <span className="absolute -top-[9px] -right-4 flex items-center justify-center w-4 h-4 rounded-full bg-accent text-background text-[10px] font-eb-garamond">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block h-0.5 w-5 bg-foreground transition-transform duration-200 origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition-transform duration-200 origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Bottom sage gradient accent line */}
      <div
        className="h-0.5"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--primary) 30%, var(--primary) 70%, transparent)',
        }}
      />

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[32rem]' : 'max-h-0'}`}>
        <nav className="bg-background border-t border-border px-6 py-4 flex flex-col gap-1">
          {navItems.map(({ href, label, newTab }) => (
            <Link
              key={href}
              href={href}
              target={newTab ? '_blank' : undefined}
              rel={newTab ? 'noopener noreferrer' : undefined}
              className="py-3 font-serif text-[15px] tracking-[0.22em] uppercase border-b border-border last:border-0 text-foreground/85 hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
