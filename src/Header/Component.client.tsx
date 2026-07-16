'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'
import Image from 'next/image'
import { CartIndicator } from '@/components/CartIndicator'

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
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

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
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo — left */}
          <Link href="/" aria-label="Home" className="flex flex-col items-start gap-0.5">
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
                <span className="font-serif text-lg tracking-[0.2em] uppercase text-foreground">
                  Willow &amp; Wren
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                  Bespoke Wedding Stationery
                </span>
              </>
            )}
          </Link>

          {/* Nav + cart — right */}
          <div className="flex items-center gap-6 md:gap-8">
            <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
              {navItems.map(({ href, label, newTab }) => {
                const isActive =
                  pathname === href || (href !== '/' && pathname.startsWith(href.split('?')[0]))
                return (
                  <Link
                    key={href}
                    href={href}
                    target={newTab ? '_blank' : undefined}
                    rel={newTab ? 'noopener noreferrer' : undefined}
                    className={`group relative text-xs font-medium tracking-[0.15em] uppercase transition-colors hover:text-accent ${
                      isActive ? 'text-accent' : 'text-foreground/70'
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute left-0 -bottom-1 h-px bg-accent transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>

            <CartIndicator />

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
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[32rem]' : 'max-h-0'}`}>
        <nav className="bg-background border-t border-border px-6 py-4 flex flex-col gap-1">
          {navItems.map(({ href, label, newTab }) => (
            <Link
              key={href}
              href={href}
              target={newTab ? '_blank' : undefined}
              rel={newTab ? 'noopener noreferrer' : undefined}
              className="py-3 text-xs font-medium tracking-[0.15em] uppercase border-b border-border last:border-0 text-foreground/80 hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
