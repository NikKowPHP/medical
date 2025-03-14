'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

type MotionButtonProps = {
  href: string
  text: string
  variant?: 'cta' | 'outline' | 'ghost'
  className?: string
  iconClassName?: string
  showChevron?: boolean
}

export function MotionButton({
  href,
  text,
  variant = 'cta',
  className = '',
  iconClassName = '',
  showChevron = true
}: MotionButtonProps) {
  // Base variants for styling
  const variants = {
    cta: "text-white text-[16px] bg-[#014441] rounded-full pl-[20px] pr-[10px] py-[15px]  hover:border-gray-500",
    outline: "text-[#014441] text-[16px] bg-white border border-[#C3C4C5] rounded-full pl-[20px] pr-[10px] py-[15px]",
    ghost: "text-[#575757] text-[16px] bg-transparent rounded-full pl-[20px] pr-[10px] py-[15px]"
  }

  // Icon colors based on variant
  const iconColors = {
    cta: "text-white",
    outline: "text-[#b7b7b8]",
    ghost: "text-[#575757]"
  }

  const baseClassName = variants[variant]
  const chevronClassName = iconClassName || iconColors[variant]
  
  return (
    <Link href={href}>
      <motion.div
        className={`flex items-center gap-[10px] ${baseClassName} ${className}`}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        variants={{
          rest: { scale: 1 },
          hover: { scale: variant === 'cta' ? 0.95 : 0.98 , border: variant === 'outline' ? 'border-gray-700' : 'border-transparent' }
        }}
      >
        <span>{text}</span>
        {showChevron && (
          <motion.div
            className="relative w-[20px] h-[20px] overflow-hidden"
            variants={{
              rest: {},
              hover: {}
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center"
              variants={{
                rest: { x: 0 },
                hover: { x: "100%" }
              }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <ChevronRight className={`w-full h-full ${chevronClassName}`} />
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center"
              variants={{
                rest: { x: "-100%", opacity: 0 },
                hover: { x: 0, opacity: 1 }
              }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <ChevronRight className={`w-full h-full ${chevronClassName}`} />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </Link>
  )
}