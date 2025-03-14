import { Calendar } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <article
      className="relative overflow-hidden min-h-screen bg-white"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <div className="max-w-4xl mx-auto py-[80px] md:py-[160px]  px-[20px] sm:px-0">
        <div className="flex flex-col items-center gap-[30px] ">
          <div className="flex ">
            <div className="bg-[#014441] px-[10px] py-[8px] flex items-center justify-center rounded-full gap-[10px] ">
              {/* <RectangleSvg width={20} height={20} /> */}
              <Calendar className="w-[20px] h-[20px] text-white " />
              <span className="block text-[16px]  leading-[1.1] font-medium tracking-[-0.02em]  text-white">
                14 Jan 2025
              </span>
            </div>
          </div>
          <h1 className="text-[24px] md:text-[60px]">Terms of Service</h1>
        </div>
        <div className="flex flex-col gap-[30px]">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    </article>
  );
}
