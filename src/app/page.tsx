import { Suspense } from "react";
import {
  HeroSection,
  QuoteSection,
  ProductList,
  SubHeroSection,
  BetterOutcomesSection,
  SaferSolutionsSection,
} from "@/helpers/componentsLoad";
import { companyConfig } from "@/config/company";

export default async function HomePage() {
  return (
    <>
      <div
        className="relative overflow-hidden min-h-screen bg-white"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* Priority Content for LCP */}
        <HeroSection />
        <SubHeroSection />

        {/* Deferred Content */}
        <div className="relative">
          <Suspense fallback={<div className="min-h-[400px]"></div>}>
            <QuoteSection />
          </Suspense>
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <ProductList />
          </Suspense>
          <Suspense fallback={<div className="min-h-[700px]" />}>
            <div>
              <BetterOutcomesSection />
            </div>
          </Suspense>
          <Suspense fallback={<div className="min-h-[700px]" />}> 
            <SaferSolutionsSection />
          </Suspense>
          {/* <Suspense fallback={<div className="min-h-[400px]">Loading video...</div>}>
            <div>
              <YoutubeSection />
            </div>
          </Suspense> */}
        </div>

        {/* Metadata */}
        <meta itemProp="name" content={companyConfig.name} />
        <meta itemProp="description" content={companyConfig.description} />
        <meta itemProp="image" content="/images/ziro.avif" />
        <meta
          itemProp="dateModified"
          content={new Date().toISOString().split("T")[0]}
        />
      </div>
    </>
  );
}
