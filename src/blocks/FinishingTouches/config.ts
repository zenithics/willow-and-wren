import type { Block } from 'payload'

export const FinishingTouches: Block = {
  slug: 'finishingTouches',
  interfaceName: 'FinishingTouchesBlock',
  labels: {
    singular: 'Finishing Touches',
    plural: 'Finishing Touches Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'The Finishing Touches',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "Sage Wax Seal"',
          },
        },
      ],
    },
  ],
}
