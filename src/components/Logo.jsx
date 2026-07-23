/**
 * Official YOUVAN logo — torch Y with clasped hands + Youth for Bharat.
 * Variants control size for nav / hero / footer placements.
 */
const ALT =
  "Youvan logo: A blue 'Y' shaped like a torch with an orange flame and two hands clasping in unity, with the tagline 'Youth for Bharat' and the full mission statement."

const sizes = {
  nav: 'h-11 w-auto sm:h-12',
  hero: 'h-28 w-auto sm:h-36 md:h-44',
  footer: 'h-16 w-auto sm:h-20',
}

function Logo({ variant = 'nav', className = '' }) {
  return (
    <img
      src="/youvan-logo.png"
      alt={ALT}
      className={`${sizes[variant] ?? sizes.nav} object-contain ${className}`}
      decoding="async"
    />
  )
}

export default Logo
