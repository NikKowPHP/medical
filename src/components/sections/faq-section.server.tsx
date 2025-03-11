import { getFaqItems } from "@/lib/data/faq-data";
import { Faq } from "@/components/sections/faq-section.client";

export default async function FaqSection() {
  // Await the slider data on the server. If getSlider returns a promise, this works properly.
  const faqItems = await getFaqItems();

  // Ensure sliderItems is defined (default to an empty array if necessary)
  return <Faq items={faqItems || []} />;
}
