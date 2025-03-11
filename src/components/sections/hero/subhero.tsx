import Image from 'next/image'

export const SubHeroSection = async () => {



  return (
    <section
      className="  pb-[20px] sm:py-[40px] "
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className='max-w-7xl mx-auto '>
       
 
      <Image src="/subhero.avif" alt="Subhero" width={1000} height={1000} />
       
       
      </div>
      <div className="opacity-0 animate-fadeIn"></div>
    </section>
  )
}
