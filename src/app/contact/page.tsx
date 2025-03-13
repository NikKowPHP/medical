import { ContactSection, CtaSection } from "@/helpers/componentsLoad";

export default function ContactPage() {
  return (
    <div
      className="relative overflow-hidden min-h-screen bg-white"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <ContactSection />
      <CtaSection />
    </div>
  );
}
