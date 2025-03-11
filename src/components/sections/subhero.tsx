"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

export function SubHeroSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Update the offset - you can tweak the multiplier to suit your design.
      setOffset(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The multiplier controls the parallax speed.
  const parallaxStyle = {
    transform: `translateY(${offset * 0.1}px)`,
  };

  return (
    <section
      className="relative overflow-hidden pb-[20px] sm:py-[40px]"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="max-w-7xl mx-auto relative h-[400px] overflow-hidden">
        <div style={parallaxStyle} className="absolute inset-0">
          <Image
            src="/subhero.avif"
            alt="Subhero"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="opacity-0 animate-fadeIn"></div>
    </section>
  );
}
