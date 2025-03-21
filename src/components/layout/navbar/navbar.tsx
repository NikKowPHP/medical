'use client'

import Link from 'next/link'
import { navigationConfig } from '@/config/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionButton } from '@/components/ui/motion-button'
import { MotionLink } from '@/components/ui/motion-link'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className="sticky  top-0 left-0 right-0 z-50 bg-white px-5 md:px-0  text-[#575757] transition-all duration-300"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="mx-auto px-[5px] w-full max-w-6xl">
        <div className="flex justify-between items-center py-[16px] ">
          <div className="flex-1  ">
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
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <div>
            {/* Desktop Navigation */}
            <nav
              className="hidden md:block transition-opacity duration-300"
              aria-label="Main navigation"
              itemScope
              itemType="https://schema.org/SiteNavigationElement"
            >
              <div className="flex sm:gap-[100px]">
                <ul className="flex justify-between gap-[42px]">
                  {navigationConfig.mainNav.map((item) => (
                    <li key={item.title} aria-label={item.title}>
                      <MotionLink
                    href={item.href}
                    targetSection={!item.isRoute ? item.targetSection : undefined}
                    isRoute={item.isRoute}
                    onClick={() => setMobileMenuOpen(false)}
                    className="transition-colors inline-flex items-center text-[16px] gap-2 duration-200 px-[8px] py-[4px] relative"
                  >
                    <motion.span
                      className="relative inline-block"
                      whileHover="hover"
                      initial="initial"
                    >
                      {item.title}
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-current origin-left"
                        variants={{
                          hover: { scaleX: 1 },
                          initial: { scaleX: 0 }
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        aria-hidden="true"
                      />
                    </motion.span>
                  </MotionLink>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="flex-1 hidden md:flex md:justify-end md:items-center">
            <RequestQuoteButton />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navbar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-full bg-white md:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col p-4 gap-[16px] justify-center items-center pb-[24px]">
              {navigationConfig.mainNav.map((item) => (
                <li key={item.title} aria-label={item.title}>
                   <MotionLink
                    href={item.href}
                    targetSection={!item.isRoute ? item.targetSection : undefined}
                    isRoute={item.isRoute}
                    onClick={() => setMobileMenuOpen(false)}
                    className="transition-colors inline-flex items-center text-[16px] gap-2 duration-200 px-[8px] py-[4px] relative"
                  >
                    <motion.span
                      className="relative inline-block"
                      whileHover="hover"
                      initial="initial"
                    >
                      {item.title}
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-current origin-left"
                        variants={{
                          hover: { scaleX: 1 },
                          initial: { scaleX: 0 }
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        aria-hidden="true"
                      />
                    </motion.span>
                  </MotionLink>
                </li>
              ))}
              <li key="request-a-quote">
                <RequestQuoteButton />
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export function RequestQuoteButton() {
  return (
    <MotionButton 
      href="/contact" 
      text="Request a Quote" 
      variant="outline" 
    />
  )
}
