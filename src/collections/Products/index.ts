import type { CollectionConfig } from 'payload'

import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugField } from 'payload'

import { isAdmin } from '../../access/isAdmin'
import { isAdminOrEditor } from '../../access/isAdminOrEditor'
import { logCollectionChange, logCollectionDelete } from '../../hooks/logActivity'
import { revalidateDelete, revalidateProduct } from './hooks/revalidateProduct'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: isAdminOrEditor,
    delete: isAdmin,
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Shop',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'status', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Shown on product cards and listing pages.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      admin: {
        description: 'Full product detail page content.',
      },
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'First image is used as the primary product image.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          required: true,
          admin: {
            description: 'Price in pence (e.g. 1299 = £12.99).',
            width: '50%',
          },
        },
        {
          name: 'compareAtPrice',
          type: 'number',
          admin: {
            description: 'Optional — shown struck through for a sale price.',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in the homepage featured collections block.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'stock',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Units in stock.',
      },
    },
    {
      name: 'hasVariants',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable if this product comes in multiple options (e.g. paper type, pack size).',
      },
    },
    {
      name: 'variants',
      type: 'array',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasVariants),
        description: 'Each variant can optionally override the base price.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'priceOverride',
              type: 'number',
              admin: {
                width: '25%',
                description: 'Pence. Leave blank to use base price.',
              },
            },
            {
              name: 'sku',
              type: 'text',
              admin: { width: '25%' },
            },
          ],
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateProduct, logCollectionChange],
    afterDelete: [revalidateDelete, logCollectionDelete],
  },
}
