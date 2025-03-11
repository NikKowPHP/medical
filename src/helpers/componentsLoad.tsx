import dynamic from 'next/dynamic'


export const HeroSection = dynamic(
  () =>
    import('@/components/sections/hero').then((mod) => mod.HeroSection),
  {
    ssr: true,
  }
)


export const MyExpertise = dynamic(
  () =>
    import('@/components/sections/my-expertise').then(
      (mod) => mod.MyExpertise
    ),
  {
    ssr: true,
  }
)

export const YoutubeSection = dynamic(
  () =>
    import('@/components/sections/youtube-section').then(
      (mod) => mod.YoutubeSection
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