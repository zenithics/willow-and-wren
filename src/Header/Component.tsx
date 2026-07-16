import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Header as HeaderType } from '@/payload-types'

export async function Header() {
  let headerData: HeaderType | undefined
  try {
    headerData = (await getCachedGlobal('header', 1)()) as HeaderType
  } catch {
    // DB unavailable during build — render with defaults
  }

  if (!headerData) return null

  return <HeaderClient data={headerData} />
}
