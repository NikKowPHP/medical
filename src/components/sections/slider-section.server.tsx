import { SliderSectionClient } from "@/components/sections/slider-section.client";
import { sliderService } from "@/lib/services/slider.service";

export default async function SliderSection() {
  const sliderItems = await sliderService.getSliderItems();
  return <SliderSectionClient items={sliderItems || []} />;
}