'use client'

import { ReactNode, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useSmoothScrollStore } from '@/hooks/use-smooth-scroll'
import { usePathname, useRouter } from 'next/navigation'

type MotionLinkProps = {
  href: string
  children: ReactNode
  className?: string
  isRoute?: boolean
  onClick?: () => void
  targetSection?: string
}

export function MotionLink({
  href,
  children,
  className = '',
  isRoute = true,
  onClick,
  targetSection
}: MotionLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const lenis = useSmoothScrollStore((state) => state.lenis)


   // Handle section scrolling after page navigation
   useEffect(() => {
    // Check if we have a hash in the URL
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      
      if (hash) {
        // Wait a bit for the page to fully render
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element && lenis) {
            lenis.scrollTo(element, { offset: 0 })
          } else if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    }
  }, [pathname, lenis])


  const handleClick = useCallback((e: React.MouseEvent) => {
    // Custom handling for section links
    if (!isRoute) {
      e.preventDefault()
      
      // Remove the # if it exists in the href
      const targetId = targetSection || (href.startsWith('#') ? href.substring(1) : href)
      
   
      // If we're not on the homepage and the link is to a section, navigate first
      if (pathname !== '/' && href == ('/')) {
        // Navigate to homepage with the hash
        debugger
        router.push(`/#${targetId}`)
        return
      }
      
      // On the same page, just scroll
      const element = document.getElementById(targetId)
      
      if (element && lenis) {
        lenis.scrollTo(element, { offset: 0 })
      } else if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      
      // Update URL without reload
      window.history.pushState(null, '', `#${targetId}`)
    }
    
    if (onClick) onClick()
  }, [href, isRoute, onClick, pathname, router, targetSection, lenis])

  // Standard route link (not a section)
  if (isRoute) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={pathname === '/' ? `#${targetSection || href}` : `/#${targetSection || href}`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}