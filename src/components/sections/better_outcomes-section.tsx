import { Suspense } from "react";
import {
  getProcessItems,
  ProcessItem as ProcessItemType,
} from "@/lib/data/better_outcome-data";
import { LucideIcons } from "@/lib/data/better_outcome-data";
import { IconBadge } from "../ui/icon-badge";

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
          className="pb-[80px] md:pb-[160px] "
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
    <header className="mb-[42px] gap-[32px] md:gap-[12px] flex flex-col flex-start">
      <h2 id="process-title" className="flex" itemProp="name">
        <IconBadge
          lucideIconName="Diamond"
          text="Better Outcomes"
          bgColor="#014441"
          textColor="white"
        />
      </h2>
      <h3 className="text-[24px] md:text-[44px] ">Achieve Better Outcomes in Endoscopy</h3>
      <p className="text-[18px] md:text-[20px]">
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
      className="p-[25px]  flex flex-col md:flex-row gap-[60px] md:gap-[32px] leading-[1.6]  bg-[#F8F1E7] rounded-3xl"
      itemProp="step"
      itemScope
      itemType="https://schema.org/HowToStep"
    >
      <meta itemProp="position" content={`${index + 1}`} />
      <div className="flex flex-col gap-[80px]">
        <div className="rounded-full border border-black text-black flex items-center justify-center w-[48px] h-[48px]">
          <Icon className="w-[24px] h-[24px]" />
        </div>

        <div className="flex flex-col gap-[16px]">
          <h3 className="text-[20px] md:text-[28px] font-bold " itemProp="name">
            {item.title}
          </h3>
          <p
            className="text-[18px] md:text-[20px] leading-[1.6]"
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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[32px] sm:gap-y-0 sm:gap-x-[32px] w-full justify-center mx-auto"
      role="list"
      aria-label="Development process steps"
    >
      {items.map((item: ProcessItemType, index: number) => (
        <ProcessItem index={index} item={item} key={index} />
      ))}
    </div>
  );
};
