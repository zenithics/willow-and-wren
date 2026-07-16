import { useId } from 'react'

/**
 * Shared line-art botanical motifs for the Willow & Wren brand (sage sprig,
 * leaf divider, and a soft placeholder wash for imagery that hasn't been
 * sourced yet). Keeps every block's decorative touches visually consistent.
 *
 * Each instance mints its own leaf-id via useId so multiple sprigs on one
 * page never collide on duplicate SVG ids.
 */

export function Sprig({ className = '' }: { className?: string }) {
  const leafId = `ww-leaf-${useId()}`
  return (
    <svg
      className={className}
      viewBox="0 0 60 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      aria-hidden="true"
    >
      <defs>
        <path id={leafId} d="M0,0 Q-5,-7 0,-16 Q5,-7 0,0 Z" />
      </defs>
      <path d="M8,96 C14,70 12,40 34,8" />
      <use href={`#${leafId}`} transform="translate(10,80) rotate(-35)" />
      <use href={`#${leafId}`} transform="translate(16,58) rotate(35) scale(-1,1)" />
      <use href={`#${leafId}`} transform="translate(20,36) rotate(-30)" />
      <use href={`#${leafId}`} transform="translate(28,16) rotate(30) scale(-1,1)" />
    </svg>
  )
}

export function LeafDivider({ className = '' }: { className?: string }) {
  const leafId = `ww-leaf-${useId()}`
  return (
    <svg
      className={`mx-auto w-32 h-5 text-primary/60 ${className}`}
      viewBox="0 0 140 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden="true"
    >
      <defs>
        <path id={leafId} d="M0,0 Q-4,-5 0,-11 Q4,-5 0,0 Z" />
      </defs>
      <line x1="0" y1="10" x2="52" y2="10" />
      <line x1="88" y1="10" x2="140" y2="10" />
      <use href={`#${leafId}`} transform="translate(62,15) rotate(-70)" />
      <use href={`#${leafId}`} transform="translate(70,16) rotate(180)" />
      <use href={`#${leafId}`} transform="translate(78,15) rotate(70) scale(-1,1)" />
    </svg>
  )
}

/**
 * Fills its (relatively positioned, overflow-hidden) parent with a soft
 * brand-toned wash and a centred sprig — used wherever a client hasn't
 * uploaded final photography/illustration yet, instead of a bare grey box.
 */
export function ImagePlaceholder({
  className = '',
  rounded = false,
}: {
  className?: string
  rounded?: boolean
}) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/50 via-background to-accent/15 ${
        rounded ? 'rounded-full' : ''
      } ${className}`}
    >
      <Sprig className="w-8 h-14 md:w-10 md:h-16 text-primary/35" />
    </div>
  )
}
