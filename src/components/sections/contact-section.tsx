import { ChevronRight, MessageCircle, MessageSquareMore, Phone, Square } from "lucide-react";
import Link from "next/link";
import { Form } from "../form";
import { Lightbulb } from "lucide-react";

export const ContactSection = () => {
  return (
    <section
      id="cta-section"
      className="py-[40px] px-[20px] md:px-0  flex flex-col justify-center items-center"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="flex flex-col items-start gap-[16px]">
        {/* todo make as component */}
        <div className="bg-[#014441] pr-[15px] pl-[10px] py-[8px] flex items-center justify-center rounded-full gap-[10px] ">
          <Lightbulb className="w-[20px] h-[20px] text-white" />
          <span className="block text-[16px]  leading-[1.1] font-medium tracking-[-0.02em]  text-white">
            Contact us
          </span>
        </div>

        <h2 className="text-[22px] md:text-[44px] ">24/7 Available</h2>

        <p className="text-[16px] md:text-[20px]">
          You can contact us via email, phone, or by filling out the form on
          this page. We strive to respond promptly and look forward to
          connecting with you soon!
        </p>

        <div className="flex flex-col md:flex-row ml-2 justify-center gap-[24px] pb-[32px]">
          <div className="flex items-center gap-[10px] text-[18px]">
            <div className=" rounded-full p-[8px] border text-gray-500 border-gray-300"><MessageSquareMore className="w-[20px] h-[20px]" /></div>{" "}
            <span>example@gmail.com</span>
          </div>
          <div className="flex items-center gap-[10px] text-[18px]">
            <div className=" rounded-full p-[8px] border text-gray-500 border-gray-300"><Phone className="w-[20px] h-[20px]" /></div>{" "}
            <span>+44 123 456 7890</span>
          </div>
        </div>
      </div>

      <Form />
    </section>
  );
};
