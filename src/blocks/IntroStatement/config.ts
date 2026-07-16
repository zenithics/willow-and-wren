import type { Block } from 'payload'

export const IntroStatement: Block = {
  slug: 'introStatement',
  interfaceName: 'IntroStatementBlock',
  labels: {
    singular: 'Intro Statement',
    plural: 'Intro Statement Blocks',
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      defaultValue:
        'From save-the-dates to on-the-day details, we create stationery suites that capture the spirit of your celebration — crafted on beautiful textured papers with hand-finished touches.',
    },
    {
      name: 'monogramText',
      type: 'text',
      defaultValue: 'W & W',
      admin: {
        description: 'Short monogram shown in the small circle below the statement. Leave blank to hide it.',
      },
    },
  ],
}
