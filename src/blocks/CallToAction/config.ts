import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'card',
      options: [
        { label: 'Card (default)', value: 'card' },
        { label: 'Full-width Band', value: 'band' },
      ],
    },
    {
      name: 'buttonBackground',
      type: 'select',
      defaultValue: 'gold',
      label: 'Button Background',
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'band',
        description: 'Background colour of the CTA button in the full-width band style. Text is always Ivory.',
      },
      options: [
        { label: 'Antique Gold', value: 'gold' },
        { label: 'Sage', value: 'sage' },
        { label: 'Charcoal', value: 'charcoal' },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Call to Action Blocks',
    singular: 'Call to Action',
  },
}
