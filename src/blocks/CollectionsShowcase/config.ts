import type { Block } from 'payload'

export const CollectionsShowcase: Block = {
  slug: 'collectionsShowcase',
  interfaceName: 'CollectionsShowcaseBlock',
  labels: {
    singular: 'Collections Showcase',
    plural: 'Collections Showcase Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Our Collections',
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
      minRows: 1,
      maxRows: 3,
      required: true,
      admin: {
        description:
          'Choose 2-3 collections to feature as large editorial sections. Each uses the collection image, title and description.',
      },
    },
  ],
}
