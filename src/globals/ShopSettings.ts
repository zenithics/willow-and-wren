import type { GlobalConfig } from 'payload'
import { logGlobalChange } from '@/hooks/logActivity'

export const ShopSettings: GlobalConfig = {
  slug: 'shop-settings',
  label: 'Shop Settings',
  admin: {
    group: 'Shop',
    description: 'Store-wide settings for the shop.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'gbp',
      options: [
        { label: 'GBP (£)', value: 'gbp' },
        { label: 'USD ($)', value: 'usd' },
        { label: 'EUR (€)', value: 'eur' },
      ],
    },
  ],
  hooks: {
    afterChange: [logGlobalChange],
  },
}
