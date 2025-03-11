"use client"

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function SubHeroSection() {
  // Get the current vertical scroll position
  const { scrollY } = useScroll();

  // Multiply the scroll value by 0.1 for a parallax effect
  const y = useTransform(scrollY, (latest) => latest * 0.1);

  return (
    <section
      className="relative overflow-hidden pb-[20px] sm:py-[40px]"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="max-w-7xl mx-auto relative h-[400px] overflow-hidden">
        {/* The motion.div will animate the translateY based on the scroll position */}
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="/subhero.avif"
            alt="Subhero"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
      <div className="opacity-0 animate-fadeIn"></div>
    </section>
  );
}
