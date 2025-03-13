"use client"

import { useState } from "react";
import Image from "next/image";
import { Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SliderItem as SliderType } from "@/domain/models/models";

export function SliderSectionClient({ items }: { items: SliderType[] }) {
  debugger
  return (
    <section
      id="safer-solutions"
      className="pb-[80px] md:pb-[160px] "
      itemScope
      itemType="https://schema.org/HowTo"
      aria-labelledby="process-title"
    >
      <div className="max-w-7xl mx-auto px-[20px] sm:px-0">
        <ProcessTitleSubtitle />
        {/* <Sliderist items={items} /> */}
        <Slider sliderItems={items} />
      </div>
    </section>
  );
}

const ProcessTitleSubtitle = () => {
  return (
    <header className="mb-[42px] gap-[32px] md:gap-[12px]  flex flex-col flex-start">
      <h2 id="process-title" className="flex" itemProp="name">
        <div className="bg-[#014441] px-[10px] py-[8px] flex items-center justify-center rounded-full gap-[10px]">
          <Square className="w-[20px] h-[20px] text-white transform -rotate-45" />
          <span className="block text-[16px] leading-[1.1] font-medium tracking-[-0.02em] text-white">
            Better Outcomes
          </span>
        </div>
      </h2>
      <h3 className="text-[24px] md:text-[44px]">Reimagining Endoscopy: Safer, Smarter Solutions Await</h3>
      <p className="text-[18px] md:text-[20px]">
        Elevate your practice with Alton's disposable accessories, supplied by Rose Medical.
      </p>
    </header>
  );
};

const Slider = ({ sliderItems }: { sliderItems: SliderType[] }) => {
  const [selectedOption, setSelectedOption] = useState<SliderType>(sliderItems[0]);

  return (
    <div className="bg-[#01423F] rounded-xl overflow-hidden w-full h-[300px] md:h-[680px] flex relative">
      {/* Color Options Column */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 flex flex-col z-10 gap-[16px]">
        {sliderItems.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOption(option)}
            className={`rounded-full w-[72px] h-[46px] overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ${
              selectedOption.id === option.id
                ? "ring-2 ring-white ring-offset-2 ring-offset-[#01423F]"
                : ""
            }`}
          >
            <div className="relative w-[72px] h-[46px]  rounded-xl overflow-hidden">
              <Image src={option.image_url} alt="Alton" fill className="object-cover" />
            </div>
          </button>
        ))}
      </div>
      {selectedOption && (
        <div className="flex-1 flex items-center justify-center ">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedOption.id}
              className="relative w-full h-full "
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Image
                src={selectedOption.image_url}
                alt="Rose Medical"
                fill
                quality={100}
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Logo */}
      {/* <div className="flex-1 flex items-center justify-center">
        <div className="relative w-48 h-24">
          <Image
            src="/rose-logo-white.png"
            alt="Rose Medical"
            fill
            className="object-contain"
          />
        </div>
      </div> */}
    </div>
  );
};

