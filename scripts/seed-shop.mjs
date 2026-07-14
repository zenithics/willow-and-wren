/**
 * Seeds Willow & Wren with product categories, demo products, a Contact page,
 * and Header/Footer navigation links.
 *
 * Prerequisite: an admin user must already exist (sign up at /admin first).
 * Run: PAYLOAD_SEED_EMAIL=you@example.com PAYLOAD_SEED_PASSWORD=yourpassword node scripts/seed-shop.mjs
 *
 * Uses Payload's REST API. Requires the dev server running at $NEXT_PUBLIC_SERVER_URL
 * (defaults to http://localhost:3000).
 */

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const EMAIL = process.env.PAYLOAD_SEED_EMAIL
const PASSWORD = process.env.PAYLOAD_SEED_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('❌  Set PAYLOAD_SEED_EMAIL and PAYLOAD_SEED_PASSWORD env vars to an existing admin login.')
  process.exit(1)
}

async function api(path, options = {}, headers = {}) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...headers },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(`API ${path} → ${res.status}: ${JSON.stringify(data).slice(0, 300)}`)
  }
  return data
}

async function login() {
  const data = await api('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!data.token) throw new Error('Login failed — check PAYLOAD_SEED_EMAIL / PAYLOAD_SEED_PASSWORD')
  console.log('✓ Logged in as', EMAIL)
  return data.token
}

const CATEGORIES = [
  { title: 'Invitations', slug: 'invitations' },
  { title: 'Save the Dates', slug: 'save-the-dates' },
  { title: 'On the Day', slug: 'on-the-day' },
  { title: 'Signage', slug: 'signage' },
  { title: 'Place Cards', slug: 'place-cards' },
  { title: 'Menus', slug: 'menus' },
  { title: 'Vow Books', slug: 'vow-books' },
]

async function seedCategories(headers) {
  const ids = {}
  for (const cat of CATEGORIES) {
    try {
      const data = await api('/product-categories', { method: 'POST', body: JSON.stringify(cat) }, headers)
      ids[cat.slug] = data.doc?.id
      console.log(`  ✓ Category: ${cat.title}`)
    } catch {
      const list = await api(`/product-categories?where[slug][equals]=${cat.slug}`, {}, headers)
      if (list.docs?.[0]) {
        ids[cat.slug] = list.docs[0].id
        console.log(`  ↩ Category exists: ${cat.title}`)
      } else {
        console.warn(`  ✗ Category failed: ${cat.title}`)
      }
    }
  }
  return ids
}

function makeProducts(catIds) {
  return [
    {
      title: 'Classic Botanical Invitation Suite',
      slug: 'classic-botanical-invitation-suite',
      shortDescription:
        'Delicate pressed botanicals on soft cream cardstock, for the wedding that feels like a garden in bloom.',
      price: 4500,
      status: 'active',
      featured: true,
      category: [catIds['invitations']].filter(Boolean),
      hasVariants: true,
      variants: [
        { name: 'Pack of 25' },
        { name: 'Pack of 50', priceOverride: 8500 },
        { name: 'Pack of 100', priceOverride: 16000 },
      ],
    },
    {
      title: 'Modern Minimalist Invitation',
      slug: 'modern-minimalist-invitation',
      shortDescription:
        'Clean typographic lines and generous whitespace, for couples who let the details speak quietly.',
      price: 3800,
      status: 'active',
      featured: false,
      category: [catIds['invitations']].filter(Boolean),
      hasVariants: false,
    },
    {
      title: 'Watercolour Save the Date Card',
      slug: 'watercolour-save-the-date-card',
      shortDescription:
        'Soft hand-painted washes in blush and sage, mailed months ahead to set the tone for your day.',
      price: 2800,
      status: 'active',
      featured: true,
      category: [catIds['save-the-dates']].filter(Boolean),
      hasVariants: true,
      variants: [{ name: 'Pack of 25' }, { name: 'Pack of 50', priceOverride: 5200 }],
    },
    {
      title: 'Photo Save the Date',
      slug: 'photo-save-the-date',
      shortDescription:
        'Your favourite engagement photo, framed in a timeless border with your date front and centre.',
      price: 3200,
      status: 'active',
      featured: false,
      category: [catIds['save-the-dates']].filter(Boolean),
      hasVariants: false,
    },
    {
      title: 'Kraft Table Number Signage Set',
      slug: 'kraft-table-number-signage-set',
      shortDescription:
        'Rustic kraft paper table numbers with hand-lettered script, numbered 1 through 10.',
      price: 6500,
      status: 'active',
      featured: true,
      category: [catIds['signage']].filter(Boolean),
      hasVariants: false,
    },
    {
      title: 'Botanical Wedding Menu Cards',
      slug: 'botanical-wedding-menu-cards',
      shortDescription:
        'Match your menu cards to your invitation suite for a beautifully coordinated table setting.',
      price: 3500,
      status: 'active',
      featured: false,
      category: [catIds['menus']].filter(Boolean),
      hasVariants: true,
      variants: [
        { name: 'Pack of 25' },
        { name: 'Pack of 50', priceOverride: 6500 },
        { name: 'Pack of 100', priceOverride: 12000 },
      ],
    },
  ]
}

async function seedProducts(headers, catIds) {
  for (const product of makeProducts(catIds)) {
    try {
      await api('/products', { method: 'POST', body: JSON.stringify(product) }, headers)
      console.log(`  ✓ Product: ${product.title} — £${(product.price / 100).toFixed(2)}`)
    } catch (e) {
      console.warn(`  ✗ Product failed: ${product.title} — ${e.message}`)
    }
  }
}

function lexical(text) {
  return {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
        },
      ],
    },
  }
}

async function seedContactPage(headers) {
  const existing = await api(`/pages?where[slug][equals]=contact`, {}, headers)
  if (existing.docs?.[0]) {
    console.log('  ↩ Contact page already exists')
    return
  }

  const page = {
    title: 'Contact',
    slug: 'contact',
    _status: 'published',
    hero: { type: 'none' },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: lexical(
              "We'd love to help bring your wedding stationery to life. Email hello@willowandwren.co.uk and we'll get back to you within one business day.",
            ),
          },
        ],
      },
    ],
    meta: {
      title: 'Contact | Willow & Wren',
      description: 'Get in touch with Willow & Wren about custom wedding stationery.',
    },
  }

  try {
    await api('/pages', { method: 'POST', body: JSON.stringify(page) }, headers)
    console.log('  ✓ Contact page created')
  } catch (e) {
    console.warn(`  ✗ Contact page failed — ${e.message}`)
  }
}

function customLink(label, url) {
  return { link: { type: 'custom', url, label, newTab: false } }
}

async function seedNav(headers) {
  await api(
    '/globals/header',
    {
      method: 'POST',
      body: JSON.stringify({
        navItemsLeft: [
          customLink('Shop', '/shop'),
          customLink('Invitations', '/shop/invitations'),
          customLink('Save the Dates', '/shop/save-the-dates'),
        ],
        navItemsRight: [customLink('Contact', '/contact')],
      }),
    },
    headers,
  )
  console.log('  ✓ Header nav updated')

  await api(
    '/globals/footer',
    {
      method: 'POST',
      body: JSON.stringify({
        column1Heading: 'Shop',
        column1Links: [
          customLink('All Products', '/shop'),
          ...CATEGORIES.map((c) => customLink(c.title, `/shop/${c.slug}`)),
        ],
        column2Heading: 'Info',
        column2Links: [customLink('Contact', '/contact')],
      }),
    },
    headers,
  )
  console.log('  ✓ Footer nav updated')
}

console.log('\n🌿 Seeding Willow & Wren...\n')
const token = await login()
const headers = { Authorization: `JWT ${token}` }

console.log('\n📂 Seeding product categories...')
const catIds = await seedCategories(headers)

console.log('\n💌 Seeding products...')
await seedProducts(headers, catIds)

console.log('\n✉️  Seeding contact page...')
await seedContactPage(headers)

console.log('\n🧭 Seeding navigation...')
await seedNav(headers)

console.log('\n✅ Done! Visit /admin to review, and upload product photos on each product.\n')
