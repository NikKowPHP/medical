'use client'

import Image from "next/image";

// import { useEffect } from 'react';
// import { usePage } from '@/contexts/page-context';

export const QuoteSection = () => {
  // const { getQuote, quote } = usePage()

  // useEffect(() => {
  //   const fetchQuote = async () => {
  //     try {
  //       await getQuote()
  //       console.log('quoteSection', quote)
  //     } catch (error) {
  //       console.error('Failed to fetch quote section:', error);
  //     }
  //   };

  //   fetchQuote();
  // }, []);

  // if (!quote) {
  //   return <div className="py-[50px] px-[20px] md:px-0 bg-black flex flex-col justify-center items-center">Loading...</div>;
  // }

  return (
    <section
      id="quote-section"
      className="py-[50px] md:py-[120px] px-[20px] md:px-0 bg-[#014441] flex flex-col justify-center items-center"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[26px]  md:text-[34px] font-bold text-center text-white leading-[1.2] flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-[20px]">
          <div className="flex items-center gap-2">
            <span className="">Elevate Endoscopy with</span>
            <div className="relative w-[50px] h-[30px] sm:w-[70px] sm:h-[40px] md:w-[90px] md:h-[50px] rounded-xl md:rounded-full overflow-hidden">
              <Image src="/alton.avif" alt="Alton" fill className="object-cover" />
            </div>
          </div>
          <div>
            <span>Alton Accessories</span>
          </div>
          <div className="flex items-center gap-2 ">
            <span>Now Supplied by</span>
            <div className="relative w-[50px] h-[30px] sm:w-[70px] sm:h-[40px] md:w-[90px] md:h-[50px] rounded-xl md:rounded-full overflow-hidden">
              <Image src="/rose.avif" alt="Rose Medical" fill className="object-cover" />
            </div>
          </div>
          <div>
            <span>Rose Medical</span>
          </div>
        </h2>
      </div>
    </section>
  );
};