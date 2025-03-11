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
      className="py-[50px] px-[20px] md:px-0 bg-black flex flex-col justify-center items-center"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[26px] md:text-[48px] font-normal text-center text-white leading-[1.2] flex flex-col items-center justify-center gap-[20px]">
        {/* {`"${quote.quote}"`} */}
          <span className="flex  items-center relative ">
        Elevate Endoscopy with <Image src="/alton.avif" alt="Alton" fill className="w-[50px] h-[50px] rounded-xl absolute inset-0" />

          </span>
          <span className="text-[26px] md:text-[48px] font-normal text-center text-white leading-[1.2]">
          Alton Accessories
          </span>

        <span className="flex  items-center  ">
        Now Supplied by  <Image src="/rose.avif" alt="Rose Medical" width={50} height={50} className="w-auto h-auto" />
        </span>
        Rose Medical

        </h2>
      </div>
    </section>
  );
};