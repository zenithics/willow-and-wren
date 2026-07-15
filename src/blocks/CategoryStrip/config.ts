import type { Block } from 'payload'

export const CategoryStrip: Block = {
  slug: 'categoryStrip',
  interfaceName: 'CategoryStripBlock',
  labels: {
    singular: 'Category Navigation Strip',
    plural: 'Category Navigation Strips',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Shop by Category',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      admin: {
        description: 'Leave empty to show all product categories, in order.',
      },
    },
  ],
}
