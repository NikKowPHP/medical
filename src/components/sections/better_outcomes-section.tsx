import { Suspense } from "react";
import {
  getProcessItems,
  ProcessItem as ProcessItemType,
} from "@/lib/data/better_outcome-data";
import { Newspaper, Star, Flag } from "lucide-react";
import { LucideIcons } from "@/lib/data/better_outcome-data";
const RectangleSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    focusable="false"
    color="var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))"
    className="w-[40px] h-[40px]"
    style={{
      userSelect: "none",
      display: "inline-block",
      fill: "var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))",
      color:
        "var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))",
      flexShrink: 0,
    }}
  >
    <g color="var(--token-f8a13159-30de-4787-9663-bcd286f368d1, rgb(248, 241, 231))">
      <path d="M235.33,116.72,139.28,20.66a16,16,0,0,0-22.56,0l-96,96.06a16,16,0,0,0,0,22.56l96.05,96.06h0a16,16,0,0,0,22.56,0l96.05-96.06a16,16,0,0,0,0-22.56ZM128,224h0L32,128,128,32,224,128Z" />
    </g>
  </svg>
);

export const BetterOutcomesSection = async () => {
  const processItems = getProcessItems();

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
          className="sm:py-[25px]"
          itemScope
          itemType="https://schema.org/HowTo"
          aria-labelledby="process-title"
        >
          <div className="max-w-7xl mx-auto  px-[20px] sm:px-0">
            <ProcessTitleSubtitle />
            <ProcessItemList processItems={processItems} />
          </div>
        </section>
      </Suspense>
    </>
  );
};

const ProcessTitleSubtitle = () => {
  return (
    <header className="mb-[42px] gap-[32px] flex flex-col flex-start flex-wrap">
      <h2 id="process-title" className="flex flex-col flex-start flex-wrap" itemProp="name">
        <div className="bg-[#014441]">
          <RectangleSvg />
          <span className="text-[16px] sm:text-[56px] lg:text-[48px] leading-[1.1] font-medium tracking-[-0.02em]  mb-[16px] text-white">
            Better Outcomes
          </span>
        </div>
      </h2>
      <h3 className="text-[24px] ">Achieve Better Outcomes in Endoscopy</h3>
      <p className="text-[18px]">
        Discover the advantages of single-use instruments for enhanced safety
        and efficiency.
      </p>
    </header>
  );
};

const ProcessItem = ({
  index,
  item,
}: {
  index: number;
  item: ProcessItemType;
}) => {
  const Icon = LucideIcons[item.icon];
  return (
    <div
      className="p-[25px]  flex flex-col gap-[60px] leading-[1.2]  bg-[#F8F1E7]"
      itemProp="step"
      itemScope
      itemType="https://schema.org/HowToStep"
    >
      <meta itemProp="position" content={`${index + 1}`} />
      <div className="flex flex-col gap-[80px]">
        <div className="rounded-full border border-black text-black flex items-center justify-center">
          <Icon className="w-[40px] h-[40px]" />
        </div>

        <div className="flex flex-col gap-[16px]">
          <h3
            className="text-[20px] font-bold "
            itemProp="name"
          >
            {item.title}
          </h3>
          <p
            className="text-[18px] leading-[1.2]"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProcessItemList = async ({
  processItems,
}: {
  processItems: Promise<ProcessItemType[]>;
}) => {
  const items = await processItems;
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[20px] sm:gap-y-0 sm:gap-x-[10px] w-full justify-center mx-auto"
      role="list"
      aria-label="Development process steps"
    >
      {items.map((item: ProcessItemType, index: number) => (
        <ProcessItem index={index} item={item} key={index} />
      ))}
    </div>
  );
};
