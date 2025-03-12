'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import normalizeWheel from 'normalize-wheel'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      infinite: false,
      syncTouch: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
    })

    const wheelHandler = (e: WheelEvent) => {
      const normalized = normalizeWheel(e)
      const currentScroll = (lenis as any).targetScroll || 0
      lenis.scrollTo(currentScroll + normalized.pixelY, {
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }

    const resizeObserver = new ResizeObserver(() => lenis.resize())
    resizeObserver.observe(document.documentElement)

    let lastTime = 0
    const raf = (time: number) => {
      const delta = time - lastTime
      lenis.raf(time)
      lastTime = time
      requestAnimationFrame(raf)
    }

    window.addEventListener('wheel', wheelHandler, { passive: false })
    window.addEventListener('resize', () => lenis.resize())
    window.addEventListener('orientationchange', () => lenis.resize())
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      window.removeEventListener('wheel', wheelHandler)
      window.removeEventListener('resize', () => lenis.resize())
      window.removeEventListener('orientationchange', () => lenis.resize())
      resizeObserver.disconnect()
    }
  }, [])

  return <>{children}</>
}