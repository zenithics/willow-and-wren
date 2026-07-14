import type { Block } from 'payload'

export const FeaturedCollections: Block = {
  slug: 'featuredCollections',
  interfaceName: 'FeaturedCollectionsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Shop by Collection',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'collections',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      admin: {
        description: 'Leave empty to show all product categories.',
      },
    },
  ],
  labels: {
    plural: 'Featured Collections Blocks',
    singular: 'Featured Collections',
  },
}
