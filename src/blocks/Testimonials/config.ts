import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'What Our Clients Say',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid (cards)', value: 'grid' },
        { label: 'Editorial (large stacked quotes)', value: 'stacked' },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'quote',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role / Company',
        },
        {
          name: 'eventDate',
          type: 'text',
          label: 'Event / Wedding Date',
          admin: {
            description: 'e.g. "Married 14 June 2025" — shown under the name in the editorial layout.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Photo',
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          label: 'Star Rating (1-5)',
        },
      ],
    },
  ],
  labels: {
    plural: 'Testimonials Blocks',
    singular: 'Testimonials',
  },
}
