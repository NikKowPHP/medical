import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const CtaSection = () => {
  return (
    <section
      id="cta-section"
      className="py-[60px] px-[20px] md:px-0 bg-[#F8F1E7] flex flex-col justify-center items-center"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-start justify-start gap-[32px] ">
          <h2 className="text-[36px] font-bold  text-black leading-[1.2] ">
            Ready to Improve Your Endoscopy Procedures?
          </h2>
          <div className="flex items-center justify-start">
            <Link
              href="/products"
              className="flex items-center justify-between gap-[30px]  text-white  text-[18px] bg-[#262625] rounded-full  pl-[20px] pr-[10px] py-[10px]" >
                <span>Request a Quote</span>
              <div className="p-[10px] bg-white rounded-full">
                <ChevronRight className="w-6 h-6 text-black" />
              </div>
            </Link>
          </div>
          <h3 className="text-[20px] font-bold text-black leading-[1.2] ">
            Elevate your practice with Alton's disposable accessories, supplied
            by Rose Medical.
          </h3>
        </div>
      </div>
    </section>
  );
};
