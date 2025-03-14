"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MotionButton } from '../ui/motion-button'

export const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  // scroll down makes translateY negative , initial scale is 1 , scroll down scalle smaller a little 

  // 3D-like parallax transformations
  const yHeading = useTransform(scrollYProgress, [0, 1], [0, -200])
  const ySubheading = useTransform(scrollYProgress, [0, 1], [0, -150])
  const yButton = useTransform(scrollYProgress, [0, 1], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -5])
  const zHeading = useTransform(scrollYProgress, [0, 1], [0, 50])
  const zSubheading = useTransform(scrollYProgress, [0, 1], [0, 30])

  // Initial entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  }

  return (
    <section
      className="px-5 md:px-0 pb-[20px] sm:py-[40px] relative overflow-hidden"
      itemScope
      itemType="https://schema.org/WebPageElement"
      ref={ref}
      style={{ perspective: 1000 }}
    >
      {/* Background layer */}
      <motion.div 
        className="absolute inset-0"
        style={{
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.8]),
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
          rotateX: useTransform(scrollYProgress, [0, 1], [0, -5])
        }}
      />

      <div className='max-w-3xl mx-auto pt-[100px] sm:pt-[20px] relative'>
        <motion.div 
          className="flex flex-col items-center justify-center gap-[32px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            scale,
            rotateX,
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.h1
            style={{ 
              y: yHeading,
              translateZ: zHeading
            }}
            className="text-[36px] sm:text-[42px] lg:text-[60px] leading-[1.1] font-bold text-center relative z-10"
            itemProp="headline"
            variants={childVariants}
          >
            Disposable Endoscopic Accessories
          </motion.h1>

          <motion.h2
            style={{ 
              y: ySubheading,
              translateZ: zSubheading
            }}
            className="text-[18px] sm:text-[20px] leading-[1.1] font-bold text-[#0AB2AC] text-center relative z-20"
            itemProp="headline"
            variants={childVariants}
          >
            Your Trusted Source for Alton's Sterile Disposable Endoscopic Accessories
          </motion.h2>

          <motion.div 
            variants={childVariants}
            style={{ 
              y: yButton,
              translateZ: 30
            }}
            className="relative z-30"
          >
            <MotionButton href="/contact" text="Contact Us" variant="cta" />
           
          </motion.div>
        </motion.div>
      </div>
      <div className="opacity-0 animate-fadeIn"></div>
    </section>
  )
}
