import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const HomeHero: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
  labels: { singular: 'Home Hero Banner', plural: 'Home Hero Blocks' },
  fields: [
    { name: 'badge', type: 'text', admin: { description: 'Small pill badge above headline e.g. "Now Booking 2027 Weddings"' } },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Bespoke Wedding Stationery, Crafted with Love',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      defaultValue:
        'Hand-finished invitations and on-the-day paper goods, designed around your story and printed on the finest papers.',
    },
    linkGroup({ overrides: { maxRows: 2 } }),
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', admin: { description: 'Full-width background image' } },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'split',
      options: [
        { label: 'Split (text left, image right)', value: 'split' },
        { label: 'Full-width overlay', value: 'fullwidth' },
        { label: 'Centred', value: 'centred' },
      ],
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light (dark text)', value: 'light' },
        { label: 'Dark charcoal (light text)', value: 'dark' },
        { label: 'Soft gradient (dark text)', value: 'pink' },
      ],
    },
    {
      name: 'botanicalOverlay',
      type: 'checkbox',
      defaultValue: false,
      label: 'Botanical Overlay',
      admin: {
        description: 'Adds decorative botanical line-art motifs to the corners of the hero.',
      },
    },
  ],
}
