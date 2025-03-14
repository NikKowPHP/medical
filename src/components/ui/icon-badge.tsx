'use client'

import { useEffect, useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type IconBadgeProps = {
  lucideIconName?: string
  customIcon?: ReactNode
  text: string
  bgColor?: string
  textColor?: string
  className?: string
  iconSize?: number
}

export function IconBadge({
  lucideIconName,
  customIcon,
  text,
  bgColor = '#014441',
  textColor = 'white',
  className = '',
  iconSize = 20
}: IconBadgeProps) {
  const [LucideIcon, setLucideIcon] = useState<LucideIcon | null>(null)

  useEffect(() => {
    if (lucideIconName) {
      const loadIcon = async () => {
        const { [lucideIconName as keyof typeof import('lucide-react')]: icon } = await import('lucide-react')
        setLucideIcon(icon)
      }
      loadIcon()
    }
  }, [lucideIconName])

  return (
    <div 
      className={`flex items-center justify-center rounded-full gap-[10px] px-[10px] py-[8px] ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {customIcon ? (
        <div style={{ width: iconSize, height: iconSize }}>{customIcon}</div>
      ) : LucideIcon ? (
        <LucideIcon size={iconSize} style={{ color: textColor }} />
      ) : null}
      
      <span 
        className="block text-[16px] leading-[1.1] font-medium tracking-[-0.02em]"
        style={{ color: textColor }}
      >
        {text}
      </span>
    </div>
  )
}