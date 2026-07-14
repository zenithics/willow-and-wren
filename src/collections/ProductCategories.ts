import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { revalidateDelete, revalidateProductCategory } from './Products/hooks/revalidateProduct'
import { logCollectionChange, logCollectionDelete } from '../hooks/logActivity'
import { slugField } from 'payload'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  access: {
    create: isAdminOrEditor,
    delete: isAdmin,
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Shop',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Shown on the category listing page.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Used for the category tile on the shop homepage.',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateProductCategory, logCollectionChange],
    afterDelete: [revalidateDelete, logCollectionDelete],
  },
}
