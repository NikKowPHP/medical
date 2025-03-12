"use client"

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function SubHeroSection() {
  // Get the current vertical scroll position
  const { scrollY } = useScroll();

  // Vertical parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, -200], { clamp: false });
  
  // Scale transformation (zoom effect)
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1], { clamp: false });

  return (
    <section
      className="relative overflow-hidden pb-[20px] sm:py-[40px]"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="max-w-3xl mx-auto relative h-[400px] overflow-hidden sm:h-[800px] transform -translate-y-[250px]">
        <motion.div 
          style={{ 
            y,
            scale, // Apply both transformations
            transformOrigin: 'center' // Ensure scaling happens from the center
          }} 
          className="absolute inset-0 h-[150%] w-full"
        >
          <Image
            src="/subhero.avif"
            alt="Subhero"
            fill
            quality={100}
            
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
      <div className="opacity-0 animate-fadeIn"></div>
    </section>
  );
}
