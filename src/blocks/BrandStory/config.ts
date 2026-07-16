import type { Block } from 'payload'

import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const BrandStory: Block = {
  slug: 'brandStory',
  interfaceName: 'BrandStoryBlock',
  labels: {
    singular: 'Brand Story',
    plural: 'Brand Story Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Bespoke Stationery',
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Designed around your story',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Image Left', value: 'left' },
        { label: 'Image Right', value: 'right' },
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 1,
        label: 'Learn More Link',
      },
    }),
  ],
}
