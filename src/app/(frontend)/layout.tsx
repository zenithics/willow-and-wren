import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { Cormorant_Garamond, DM_Sans, EB_Garamond, Parisienne } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { organizationSchema, websiteSchema } from '@/utilities/generateJsonLd'
import { Analytics } from '@/components/Analytics'
import { AdPixelsLoader } from '@/components/AdPixels/AdPixelsLoader'
import { CookieConsentLoader } from '@/components/CookieConsent/CookieConsentLoader'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AccessibilityWidget } from '@/components/AccessibilityWidget'
import { ContactWidgetLoader } from '@/components/ContactWidget/ContactWidgetLoader'
import {
  CustomHeadScripts,
  CustomBodyScripts,
  CustomBodyStartScripts,
} from '@/components/CustomScripts'
import { NewsletterPopupLoader } from '@/components/NewsletterPopup/NewsletterPopupLoader'
import { AnnouncementBarLoader } from '@/components/AnnouncementBar/AnnouncementBarLoader'
import { PopupLoader } from '@/components/PopupRenderer/PopupLoader'
import { getLocaleSettings } from '@/utilities/siteSettings'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-parisienne',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-eb-garamond',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const { getPayload } = await import('payload')
  const payloadConfig = (await import('@payload-config')).default
  const payload = await getPayload({ config: payloadConfig })
  const seoSettings = (await payload.findGlobal({ slug: 'seo-settings' }).catch(() => null)) as any
  const siteAppearance = (await payload
    .findGlobal({ slug: 'site-appearance', depth: 1 })
    .catch(() => null)) as any

  const [orgSchema, webSchema, locale] = await Promise.all([
    seoSettings?.schemaOrganization !== false ? organizationSchema() : null,
    seoSettings?.schemaWebsite !== false ? websiteSchema() : null,
    getLocaleSettings(),
  ])

  const favicon =
    siteAppearance?.favicon && typeof siteAppearance.favicon === 'object'
      ? siteAppearance.favicon
      : null
  // Analytics is rendered inside <head> via the component

  return (
    <html
      className={`${dmSans.variable} ${cormorant.variable} ${parisienne.variable} ${ebGaramond.variable} ${GeistMono.variable}`}
      lang={locale.language}
      suppressHydrationWarning
    >
      <head>
        <ThemeProvider />
        <InitTheme />
        <Analytics />
        {favicon?.url ? (
          <link
            href={favicon.url}
            rel="icon"
            type={favicon.mimeType || undefined}
          />
        ) : (
          <>
            <link href="/favicon.ico" rel="icon" sizes="32x32" />
            <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
          </>
        )}
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLM-friendly site summary"
        />
        <link rel="alternate" type="application/rss+xml" title="Blog RSS Feed" href="/feed.xml" />
        <link
          rel="alternate"
          type="application/feed+json"
          title="Blog JSON Feed"
          href="/feed.json"
        />
        <CustomHeadScripts />
        {orgSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
          />
        )}
        {webSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }}
          />
        )}
      </head>
      <body>
        <CustomBodyStartScripts />
        {/* Skip to main content — first focusable element, WCAG 2.2 AA */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <AdPixelsLoader />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <AnnouncementBarLoader />
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CookieConsentLoader />
          <AccessibilityWidget />
          <ContactWidgetLoader />
          <NewsletterPopupLoader />
          <PopupLoader />
          <CustomBodyScripts />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
