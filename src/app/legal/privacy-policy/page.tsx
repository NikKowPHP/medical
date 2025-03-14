import { IconBadge } from "@/components/ui/icon-badge";

export default function PrivacyPolicyPage() {
  return (
    <article
      className="relative overflow-hidden min-h-screen bg-white"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <div className="max-w-7xl mx-auto  px-[20px] sm:px-0">
        <div className="flex flex-col gap-[30px] py-[80px] md:py-[160px]">
          <div className="flex flex-col items-center gap-[30px]">
          <IconBadge
              lucideIconName="Calendar"
              text="14 Jan 2025"
              bgColor="#014441"
              textColor="white"
            />
          <h1 className="text-[24px] md:text-[60px]">Terms of Service</h1>
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
