import { Suspense } from "react";
import {
  getSlider,
  SliderItem as SliderType,
} from "@/lib/data/safer_solutions-data";
import { Square } from "lucide-react";
import Image from "next/image";

const Icon = ({ width, height }: { width: number; height: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      focusable="false"
      color="var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))"
      style={{
        userSelect: "none",
        width: `${width}px`,
        height: `${height}px`,
        display: "inline-block",
        fill: "var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))",
        color: "var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))",
        flexShrink: 0,
      }}
    >
      <g
        color="var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))"
       
      >
        <path d="M134.08,154.79a8,8,0,0,0-12.15,0l-48,56A8,8,0,0,0,80,224h96a8,8,0,0,0,6.07-13.21ZM97.39,208,128,172.29,158.61,208ZM232,64V176a24,24,0,0,1-24,24h-8a8,8,0,0,1,0-16h8a8,8,0,0,0,8-8V64a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8V176a8,8,0,0,0,8,8h8a8,8,0,0,1,0,16H48a24,24,0,0,1-24-24V64A24,24,0,0,1,48,40H208A24,24,0,0,1,232,64Z" />
      </g>
    </svg>
  );
};

export const BetterOutcomesSection = async () => {
  const Slider = getSlider();

  return (
    <>
      <Suspense
        fallback={
          <div
            className="flex items-center justify-center min-h-[200px]"
            aria-label="Loading process section"
          >
            Loading...
          </div>
        }
      >
        <section
          id="better-outcomes"
          className="pb-[80px] sm:py-[25px] "
          itemScope
          itemType="https://schema.org/HowTo"
          aria-labelledby="process-title"
        >
          <div className="max-w-7xl mx-auto  px-[20px] sm:px-0">
            <ProcessTitleSubtitle />
            <Sliderist Slider={Slider} />
          </div>
        </section>
      </Suspense>
    </>
  );
};

const ProcessTitleSubtitle = () => {
  return (
    <header className="mb-[42px] gap-[32px] flex flex-col flex-start">
      <h2 id="process-title" className="flex" itemProp="name">
        <div className="bg-[#014441] px-[10px] py-[8px] flex items-center justify-center rounded-full gap-[10px] ">
          {/* <RectangleSvg width={20} height={20} /> */}
          <Square className="w-[20px] h-[20px] text-white transform -rotate-45" />
          <span className="block text-[16px]  leading-[1.1] font-medium tracking-[-0.02em]  text-white">
            Better Outcomes
          </span>
        </div>
      </h2>
      <h3 className="text-[24px] ">Reimagining Endoscopy: Safer, Smarter Solutions Await</h3>
      <p className="text-[18px]">
      Elevate your practice with Alton's disposable accessories, supplied by Rose Medical.


      </p>
    </header>
  );
};

const SliderItem= ({
  index,
  item,
}: {
  index: number;
  item: SliderType;
}) => {
  return (
    <div
      className="p-[25px] relative  flex flex-col gap-[60px] leading-[1.6]  bg-[#F8F1E7] rounded-3xl"
      itemProp="step"
      itemScope
      itemType="https://schema.org/HowToStep"
    >
      <meta itemProp="position" content={`${index + 1}`} />
      <Image src={item.image_url} alt={item.image_url} fill />
    </div>
  );
};

const Sliderist = async ({
  Slider,
}: {
  Slider: Promise<SliderType[]>;
}) => {
  const items = await Slider;
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[32px] sm:gap-y-0 sm:gap-x-[10px] w-full justify-center mx-auto"
      role="list"
      aria-label="Development process steps"
    >
      {items.map((item: SliderType, index: number) => (
        <SliderItem index={index} item={item} key={index} />
      ))}
    </div>
  );
};
