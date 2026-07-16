'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'
import Image from 'next/image'
import { CartIndicator } from '@/components/CartIndicator'

interface HeaderClientProps {
  data: Header
  logo?: Media | null
  logoDark?: Media | null
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

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo, logoDark }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // Full-bleed dark heroes (e.g. HighImpactHero, or HomeHero with a
  // background image) call setHeaderTheme('dark') while they're showing —
  // that's our cue to float a transparent, light-text header on top of them.
  // Everywhere else the header keeps its normal solid background.
  const isTransparent = theme === 'dark' && !scrolled && !mobileOpen

  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
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

  return (
    <header className="sticky top-0 z-50 w-full pt-4 px-3 md:px-4 pointer-events-none">
      <div
        className={`pointer-events-auto max-w-[1280px] mx-auto border transition-all duration-200 ${
          mobileOpen ? 'rounded-3xl' : 'rounded-full'
        } ${
          isTransparent
            ? 'bg-black/20 backdrop-blur-md border-white/15'
            : theme === 'dark'
              // Scrolled past a genuinely dark hero (e.g. HighImpactHero) — solidify for legibility.
              ? 'bg-white/95 backdrop-blur-sm shadow-sm border-border'
              // Normal pages (including the homepage) — same solid look from top to bottom, no scroll-based change.
              : 'bg-background border-border shadow-sm'
        }`}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="flex items-center justify-between h-16 px-6">

          {/* Logo — left */}
          <Link href="/" aria-label="Home">
            {isTransparent && logoDark?.url ? (
              <Image
                src={logoDark.url}
                alt={logoDark.alt || 'Logo'}
                width={logoDark.width ?? 160}
                height={logoDark.height ?? 40}
                className="h-8 w-auto object-contain"
                priority
              />
            ) : logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || 'Logo'}
                width={logo.width ?? 160}
                height={logo.height ?? 40}
                className="h-8 w-auto object-contain"
                priority
              />
            ) : (
              <span
                className={`font-sans text-xl font-semibold tracking-tight transition-colors hover:text-accent ${
                  isTransparent ? 'text-white' : 'text-foreground'
                }`}
              >
                Your Brand
              </span>
            )}
          </Link>

          {/* Nav + cart — right */}
          <div className="flex items-center gap-4 md:gap-6">
            <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
              {[...navLeft, ...navRight].map(({ href, label, newTab }) => (
                <Link
                  key={href}
                  href={href}
                  target={newTab ? '_blank' : undefined}
                  rel={newTab ? 'noopener noreferrer' : undefined}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    pathname === href || (href !== '/' && pathname.startsWith(href.split('?')[0]))
                      ? 'text-primary'
                      : isTransparent
                        ? 'text-white/90'
                        : 'text-foreground/80'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <CartIndicator className={isTransparent ? 'text-white/90 hover:text-accent' : undefined} />

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`block h-0.5 w-5 transition-transform duration-200 origin-center ${isTransparent ? 'bg-white' : 'bg-foreground'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-5 transition-opacity duration-200 ${isTransparent ? 'bg-white' : 'bg-foreground'} ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 transition-transform duration-200 origin-center ${isTransparent ? 'bg-white' : 'bg-foreground'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[32rem]' : 'max-h-0'}`}>
          <nav className="bg-white border-t border-border px-6 py-4 flex flex-col gap-1 rounded-b-3xl">
            {[...navLeft, ...navRight].map(({ href, label, newTab }) => (
              <Link
                key={href}
                href={href}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noopener noreferrer' : undefined}
                className="py-3 text-sm font-medium border-b last:border-0 text-foreground hover:text-accent transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
