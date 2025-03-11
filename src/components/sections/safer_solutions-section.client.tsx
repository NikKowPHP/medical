"use client"

import { useState } from "react";
import Image from "next/image";
import { Square } from "lucide-react";
import { SliderItem as SliderType } from "@/lib/data/safer_solutions-data";

export function SaferSolutionsSectionClient({ items }: { items: SliderType[] }) {
  return (
    <section
      id="safer-solutions"
      className="pb-[80px] sm:py-[25px]"
      itemScope
      itemType="https://schema.org/HowTo"
      aria-labelledby="process-title"
    >
      <div className="max-w-7xl mx-auto px-[20px] sm:px-0">
        <ProcessTitleSubtitle />
        <Sliderist items={items} />
      </div>
    </section>
  );
}

const ProcessTitleSubtitle = () => {
  return (
    <header className="mb-[42px] gap-[32px] flex flex-col flex-start">
      <h2 id="process-title" className="flex" itemProp="name">
        <div className="bg-[#014441] px-[10px] py-[8px] flex items-center justify-center rounded-full gap-[10px]">
          <Square className="w-[20px] h-[20px] text-white transform -rotate-45" />
          <span className="block text-[16px] leading-[1.1] font-medium tracking-[-0.02em] text-white">
            Better Outcomes
          </span>
        </div>
      </h2>
      <h3 className="text-[24px]">Reimagining Endoscopy: Safer, Smarter Solutions Await</h3>
      <p className="text-[18px]">
        Elevate your practice with Alton's disposable accessories, supplied by Rose Medical.
      </p>
    </header>
  );
};

const RoseMedicalSlider = () => {
  const [selectedOption, setSelectedOption] = useState("300E");

  const options = [
    { id: "200E", label: "200E", color: "bg-[#CCD8D7]" },
    { id: "300E", label: "300E", color: "bg-[#99A9A8]" },
    { id: "400E", label: "400E", color: "bg-[#01423F]" },
  ];

  return (
    <div className="bg-[#01423F] rounded-xl overflow-hidden w-full h-[300px] flex relative">
      {/* Color Options Column */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-10">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`${option.color} rounded-full w-14 h-14 flex items-center justify-center text-xs font-medium ${
              selectedOption === option.id
                ? "ring-2 ring-white ring-offset-2 ring-offset-[#01423F]"
                : ""
            }`}
          >
            <span className={`${selectedOption === option.id ? "text-white" : "text-slate-800"}`}>
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* Logo */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-48 h-24">
          <Image
            src="/rose-logo-white.png"
            alt="Rose Medical"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

const SliderItem = ({ index, item }: { index: number; item: SliderType }) => {
  // For the first item, use the RoseMedicalSlider component.
  if (index === 0) {
    return (
      <div
        className="relative rounded-3xl overflow-hidden"
        itemProp="step"
        itemScope
        itemType="https://schema.org/HowToStep"
      >
        <meta itemProp="position" content={`${index + 1}`} />
        <RoseMedicalSlider />
      </div>
    );
  }

  // For other items, render the provided image.
  return (
    <div
      className="p-[25px] relative flex flex-col gap-[60px] leading-[1.6] bg-[#F8F1E7] rounded-3xl h-[300px]"
      itemProp="step"
      itemScope
      itemType="https://schema.org/HowToStep"
    >
      <meta itemProp="position" content={`${index + 1}`} />
      <div className="relative w-full h-full">
        <Image
          src={item.image_url}
          alt="Rose Medical Safer Solutions Image Slider"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

const Sliderist = ({ items }: { items: SliderType[] }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[32px] sm:gap-y-0 sm:gap-x-[10px] w-full justify-center mx-auto"
      role="list"
      aria-label="Development process steps"
    >
      {items.map((item, index) => (
        <SliderItem index={index} item={item} key={index} />
      ))}
    </div>
  );
};