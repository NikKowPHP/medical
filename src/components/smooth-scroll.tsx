'use client'

import { ReactNode, useEffect } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import Lenis from '@studio-freight/lenis'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.5,
      smoothWheel: true,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}