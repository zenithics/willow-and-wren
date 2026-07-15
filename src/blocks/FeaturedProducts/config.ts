import type { Block } from 'payload'

export const FeaturedProducts: Block = {
  slug: 'featuredProducts',
  interfaceName: 'FeaturedProductsBlock',
  labels: {
    singular: 'Featured Products Row',
    plural: 'Featured Products Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Featured Products',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      maxRows: 4,
      admin: {
        description:
          'Leave empty to automatically show products marked "Featured" in the Products collection (up to 4).',
      },
    },
  ],
}
