import type { Block } from 'payload'

export const InstagramFeed: Block = {
  slug: 'instagramFeed',
  interfaceName: 'InstagramFeedBlock',
  labels: {
    singular: 'Instagram Feed',
    plural: 'Instagram Feed Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Follow Our Journey',
    },
    {
      name: 'handle',
      type: 'text',
      defaultValue: '@willowandwren',
      admin: {
        description: 'Shown under the heading, e.g. "@willowandwren".',
      },
    },
    {
      name: 'profileUrl',
      type: 'text',
      admin: {
        description: 'Optional — where the handle links to.',
        placeholder: 'https://instagram.com/willowandwren',
      },
    },
    {
      name: 'images',
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
          name: 'url',
          type: 'text',
          admin: {
            description: 'Optional — link to the individual post.',
          },
        },
      ],
    },
  ],
}
