'use client'

import Link from 'next/link'
import { navigationConfig } from '@/config/navigation'
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className="relative sticky top-0 left-0 right-0 z-50 bg-white   text-[#575757] transition-all duration-300"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="mx-auto px-[5px] w-full max-w-6xl border border-red-500">
        <div className="flex justify-between items-center py-[16px] border border-red-500">
          <div className="flex-1 border border-red-500">
            <Link
              href="/"
              className="gap-2 self-start font-bold transition-all duration-300 max-w-[100px] max-h-[38px]"
              title="Rose Medical"
              aria-label="Rose Medical Homepage"
            >
              <Image
                src="/logo.svg"
                alt="Rose Medical Logo"
                width={100}
                height={100}
                className="h-auto"
              />
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

          <div>
            {/* Desktop Navigation */}
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
                        className="transition-colors inline-flex items-center text-[16px] gap-2 duration-200 px-[8px] py-[4px]"
                        style={{ '--hover-color': item.color } as React.CSSProperties}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="flex-1 hidden md:flex md:justify-end md:items-center">
            <button className="flex items-center gap-[5px] rounded-full pr-[15px] pl-[25px] py-[15px] border border-[#C3C4C5]">
              <span className="text-[16px]">Request a Quote</span>
              <ChevronRight className="w-[20px] h-[20px] text-[#C3C4C5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navbar */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="absolute left-0 right-0 top-full bg-white shadow-md md:hidden transition-opacity duration-300"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col p-4 space-y-4">
            {navigationConfig.mainNav.map((item) => (
              <li key={item.href} aria-label={item.title}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[18px] font-medium"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
