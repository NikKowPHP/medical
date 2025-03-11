import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const HeroSection = async () => {




  return (
    <section
      className=" px-5 md:px-0 pb-[20px] sm:py-[40px] "
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className='max-w-7xl mx-auto pt-[100px]'>

       
 
          <div className=" flex flex-col items-center justify-center gap-[32px]">
            <h1
              className=" text-[36px] sm:text-[36px] lg:text-[36px] leading-[1.1] font-bold text-center"
              itemProp="headline"
            >
              Disposable Endoscopic Accessories
            </h1>
            <h2
              className="text-[18px]  sm:text-[18px] lg:text-[18px] leading-[1.1] font-bold text-[#0AB2AC] text-center"
              itemProp="headline"
            >
              {`Your Trusted Source for Alton's Sterile Disposable Endoscopic Accessories`}
            </h2>

            <Link href="/products" className="flex items-center text-center gap-[10px]  text-white  text-[16px] bg-[#014441] rounded-full  pl-[20px] pr-[10px] py-[15px]">Contact Us <ChevronRight className="w-6 h-6" /></Link>
           
          
          </div>
       
       
      </div>
      <div className="opacity-0 animate-fadeIn"></div>
    </section>
  )
}
