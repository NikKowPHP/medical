import { getSlider } from "@/lib/data/safer_solutions-data";
import { SaferSolutionsSectionClient } from "@/components/sections/safer_solutions-section.client";

export default async function SaferSolutionsSection() {
  // Await the slider data on the server. If getSlider returns a promise, this works properly.
  const sliderItems = await getSlider();

  // Ensure sliderItems is defined (default to an empty array if necessary)
  return <SaferSolutionsSectionClient items={sliderItems || []} />;
}