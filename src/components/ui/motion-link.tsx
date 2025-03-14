'use client'

import { ReactNode, useCallback } from 'react'
import Link from 'next/link'

type MotionLinkProps = {
  href: string
  children: ReactNode
  className?: string
  isRoute?: boolean
  onClick?: () => void
}

export function MotionLink({
  href,
  children,
  className = '',
  isRoute = true,
  onClick
}: MotionLinkProps) {
  const handleSmoothScroll = useCallback((e: React.MouseEvent) => {
    if (!isRoute) {
      e.preventDefault()
      
      // Remove the # if it exists in the href
      const targetId = href.startsWith('#') ? href.substring(1) : href
      const element = document.getElementById(targetId)
      
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
      
      // Update URL without reload (optional)
      window.history.pushState(null, '', `#${targetId}`)
    }
    
    if (onClick) onClick()
  }, [href, isRoute, onClick])

  if (isRoute) {
   
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={`#${href}`} 
      className={className}
      onClick={handleSmoothScroll}
    >
      {children}
    </a>
  )
}