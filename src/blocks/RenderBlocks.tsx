import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { FeaturesBlock } from '@/blocks/Features/Component'
import { StatsBlock } from '@/blocks/Stats/Component'
import { LogoCarouselBlock } from '@/blocks/LogoCarousel/Component'
import { PricingBlock } from '@/blocks/Pricing/Component'
import { HeroSplitBlock } from '@/blocks/HeroSplit/Component'
import { HowItWorksBlock } from '@/blocks/HowItWorks/Component'
import { ImageGalleryBlock } from '@/blocks/ImageGallery/Component'
import { HomeHeroBlock } from '@/blocks/HomeHero/Component'
import { NewsletterBlock } from '@/blocks/Newsletter/Component'
import { TeamGridBlock } from '@/blocks/TeamGrid/Component'
import { VideoEmbedBlock } from '@/blocks/VideoEmbed/Component'
import { MapEmbedBlock } from '@/blocks/MapEmbed/Component'
import { EmbedBlock } from '@/blocks/Embed/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { FeaturedCollectionsBlock } from '@/blocks/FeaturedCollections/Component'
import { CollectionsShowcaseBlock } from '@/blocks/CollectionsShowcase/Component'
import { CategoryStripBlock } from '@/blocks/CategoryStrip/Component'
import { BrandStoryBlock } from '@/blocks/BrandStory/Component'
import { FeaturedProductsBlock } from '@/blocks/FeaturedProducts/Component'
import { IntroStatementBlock } from '@/blocks/IntroStatement/Component'
import { FinishingTouchesBlock } from '@/blocks/FinishingTouches/Component'
import { InstagramFeedBlock } from '@/blocks/InstagramFeed/Component'

const blockComponents = {
  archive: ArchiveBlock,
  banner: BannerBlock,
  code: CodeBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  testimonials: TestimonialsBlock,
  faq: FAQBlock,
  features: FeaturesBlock,
  stats: StatsBlock,
  logoCarousel: LogoCarouselBlock,
  pricing: PricingBlock,
  heroSplit: HeroSplitBlock,
  howItWorks: HowItWorksBlock,
  imageGallery: ImageGalleryBlock,
  homeHero: HomeHeroBlock,
  newsletter: NewsletterBlock,
  teamGrid: TeamGridBlock,
  videoEmbed: VideoEmbedBlock,
  mapEmbed: MapEmbedBlock,
  embed: EmbedBlock,
  timeline: TimelineBlock,
  featuredCollections: FeaturedCollectionsBlock,
  collectionsShowcase: CollectionsShowcaseBlock,
  categoryStrip: CategoryStripBlock,
  brandStory: BrandStoryBlock,
  featuredProducts: FeaturedProductsBlock,
  introStatement: IntroStatementBlock,
  finishingTouches: FinishingTouchesBlock,
  instagramFeed: InstagramFeedBlock,
}

/**
 * Most blocks own their own vertical rhythm (a `py-*` section with its own
 * background). A handful of older "bare" blocks don't, and MediaBlock can't
 * safely be given its own padding since it's also rendered inline inside
 * RichText content — those are the only ones that still need an external
 * margin here. Giving every block a blanket margin double-spaces the ones
 * that already pad themselves, which is what caused the uneven gaps.
 */
const BLOCKS_NEEDING_EXTERNAL_MARGIN = new Set(['mediaBlock'])

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const className = BLOCKS_NEEDING_EXTERNAL_MARGIN.has(blockType) ? 'my-16' : undefined
              return (
                <div className={className} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
