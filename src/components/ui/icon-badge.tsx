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
        try {
          const lucideIcons = await import('lucide-react')
          const iconName = lucideIconName as keyof typeof lucideIcons
          
          if (lucideIcons[iconName]) {
            setLucideIcon(lucideIcons[iconName] as LucideIcon)
          }
        } catch (error) {
          console.error(`Failed to load icon: ${lucideIconName}`, error)
        }
      }
      loadIcon()
    }
  }, [lucideIconName])

  return (
    <div 
      className={`flex items-center justify-center rounded-full gap-[5px] pl-[10px] pr-[15px] py-[8px] ${className}`}
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