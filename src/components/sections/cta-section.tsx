import { MotionButton } from "../ui/motion-button";

export const CtaSection = () => {
  return (
    <section
      id="cta-section"
      className="py-[60px] px-[20px] md:px-0 bg-[#F8F1E7] flex flex-col justify-center items-center"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start  justify-start gap-[32px] ">
          <div className="flex flex-col gap-[32px]">
            <h2 className="text-[36px] md:text-[60px] font-bold  text-black leading-[1.2] ">
              Ready to Improve Your Endoscopy Procedures?
            </h2>
            <div className="flex items-center justify-start">
              <MotionButton href="/products" text="Request a Quote" variant="ctaBlack"/>
             
            </div>
          </div>
          <h3 className="text-[20px] md:text-[28px] font-bold text-black leading-[1.2] ">
            Elevate your practice with Alton's disposable accessories, supplied
            by Rose Medical.
          </h3>
        </div>
      </div>
    </section>
  );
};
