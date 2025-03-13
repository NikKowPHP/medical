import dynamic from 'next/dynamic'


export const HeroSection = dynamic(
  () =>
    import('@/components/sections/hero').then((mod) => mod.HeroSection),
  {
    ssr: true,
  }
)


export const SliderSection = dynamic(
  () =>
    import('@/components/sections/slider-section.server').then(
      (mod) => mod.default
    ),
  {
    ssr: true,
  }
)




export const ProductList = dynamic(
  () =>
    import('@/components/sections/products-section').then(
      (mod) => mod.ProductList
    ),
  { 
    ssr: true,
  }
)



export const QuoteSection = dynamic(
  () => import('@/components/sections/quote-section').then(mod => mod.QuoteSection),
  {
    ssr: true,
  }
)

export const SubHeroSection = dynamic(
  () => import('@/components/sections/subhero').then(mod => mod.SubHeroSection),
  {
    ssr: true,
  }
)

export const SaferSolutionsSection = dynamic(
  () => import('@/components/sections/slider-section.server').then(mod => mod.default),
  {
    ssr: true,
  }
)

export const FaqSection = dynamic(
  () => import('@/components/sections/faq-section.server').then(mod => mod.default),
  {
    ssr: true,
  }
)

export const CtaSection = dynamic(
  () => import('@/components/sections/cta-section').then(mod => mod.CtaSection),
  {
    ssr: true,
  }
)

export const ContactSection = dynamic(
  () => import('@/components/sections/contact-section').then(mod => mod.ContactSection),
  {
    ssr: true,
  }
)