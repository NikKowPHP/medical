'use client'

import Link from 'next/link'
import { navigationConfig } from '@/config/navigation'
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const scrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)

  // useEffect(() => {
  //   let animationFrameId: number

  //   const handleScroll = () => {
  //     // Cancel any previous animation frame
  //     if (animationFrameId) {
  //       cancelAnimationFrame(animationFrameId)
  //     }

  //     // Use requestAnimationFrame for smoother scroll handling
  //     animationFrameId = requestAnimationFrame(() => {
  //       const currentScrollY = window.scrollY
  //       scrollYRef.current = currentScrollY
        
  //       // Clear existing timeout if it exists
  //       if (scrollTimeout.current) {
  //         clearTimeout(scrollTimeout.current)
  //       }

  //       // Use functional update to avoid stale state
  //       scrollTimeout.current = setTimeout(() => {
  //         setScrolled(prev => {
  //           const isScrolled = currentScrollY > 20
  //           return isScrolled !== prev ? isScrolled : prev
  //         })
  //       }, 100)
  //     })
  //   }

  //   // Initial check for scroll position
  //   handleScroll()

  //   // Use passive scroll listener for better performance
  //   window.addEventListener('scroll', handleScroll, { passive: true })
    
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //     if (animationFrameId) cancelAnimationFrame(animationFrameId)
  //     if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
  //   }
  // }, []) // Empty dependency array ensures this runs once

  // useEffect(() => {
  //   if (!scrolled) {
  //     setMobileMenuOpen(false)
  //   }
  // }, [scrolled])

  // // Close menu when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const target = event.target as Node
  //     const menu = document.getElementById('mobile-menu')
  //     const menuButton = document.getElementById('menu-button')

  //     if (
  //       menu &&
  //       !menu.contains(target) &&
  //       menuButton &&
  //       !menuButton.contains(target)
  //     ) {
  //       setMobileMenuOpen(false)
  //     }
  //   }

  //   if (mobileMenuOpen) {
  //     document.addEventListener('mousedown', handleClickOutside)
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [mobileMenuOpen])

  // useEffect(() => {
  //   if (!mobileMenuOpen) {
  //   document.body.style.overflowX = 'hidden';
  //   } else {
  //   document.body.style.overflowX = '';
  //   }
  //   }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-sm text-[#575757] transition-all duration-300 `}
      itemScope
      itemType="https://schema.org/WPHeader"
    >
   
     

      <div className="mx-auto px-[5px] w-full max-w-6xl border border-red-500">

        <div className="flex justify-between items-center py-[16px] border border-red-500">
          <div className='flex-1 border border-red-500'>

          <Link
            href="/"
            className={`gap-2 self-start font-bold transition-all duration-300 max-w-[100px] max-h-[38px] `}
            title="Rose Medical"
            aria-label="Rose Medical Homepage"
          >
              <Image src="/logo.svg" alt="Rose Medical Logo" width={100} height={100} className=" h-auto" />
          </Link>

          </div>

          {/* Mobile menu button - always visible on mobile */}
          <button
            id="menu-button"
            className="md:hidden flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 transition-transform duration-300 ease-in-out" />
            ) : (
              <Menu className="w-6 h-6 transition-transform duration-300 ease-in-out" />
            )}
          </button>

          

          {/* Desktop menu button - only when scrolled */}
         
            <nav
              className="hidden md:block transition-opacity duration-300 border border-red-500"
              aria-label="Main navigation"
              itemScope
              itemType="https://schema.org/SiteNavigationElement"
            >
              <div className="flex sm:gap-[100px] border border-red-500">
                <ul className="flex justify-between gap-[42px] border border-red-500">
                 
                  {navigationConfig.mainNav.map((item) => (
                    <li key={item.href} aria-label={item.title}>
                      <Link
                        href={item.href}
                        className="transition-colors inline-flex items-center text-[16px]  gap-2 duration-200 px-[8px] py-[4px]"
                        style={
                          {
                            '--hover-color': item.color,
                          } as React.CSSProperties
                        }
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>

               
            </div>
       
          </nav>
          <div className=" flex-1 flex justify-end items-center">
              <button className="flex items-center gap-[5px] rounded-full pr-[15px] pl-[25px] py-[15px] border border-[#C3C4C5]">
                <span className="text-[16px] ">Request a Quote </span>
                <ChevronRight className="w-[20px] h-[20px] text-[#C3C4C5]" />
              </button>
            </div>
        
        </div>
      </div>

      {/* Backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 h-screen bg-black/50 backdrop-blur-sm z-50 transition-all duration-100"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

  
    
    </header>
  )
}
