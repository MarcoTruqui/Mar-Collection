'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

// Only shows on first visit of the day. Subsequent page navigations skip it.
export default function IntroLoader() {
  const [phase, setPhase] = useState('hidden') // hidden | visible | shrinking | done
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    // Phase 1: fade in overlay
    setPhase('visible')

    // Phase 2: wait for page to load (at least 1.8s for effect), then shrink
    const waitForLoad = () => {
      setTimeout(() => setPhase('shrinking'), 300)
    }

    if (document.readyState === 'complete') {
      setTimeout(waitForLoad, 1200)
    } else {
      window.addEventListener('load', () => setTimeout(waitForLoad, 800), { once: true })
      // Fallback in case load fires late
      setTimeout(waitForLoad, 3000)
    }
  }, [])

  // After shrink animation completes, remove from DOM
  useEffect(() => {
    if (phase === 'shrinking') {
      const t = setTimeout(() => setPhase('done'), 900)
      return () => clearTimeout(t)
    }
  }, [phase])

  if (phase === 'done') return null

  const isVisible   = phase === 'visible'
  const isShrinking = phase === 'shrinking'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isVisible || isShrinking ? 1 : 0,
        transition: isShrinking
          ? 'opacity 0.5s ease 0.5s'
          : 'opacity 0.4s ease',
        pointerEvents: isShrinking ? 'none' : 'all',
      }}
    >
      <div
        style={{
          // Shrinks from center of screen into the top-left header position
          transformOrigin: 'center center',
          transform: isShrinking
            ? 'translate(-42vw, -46vh) scale(0.09)'
            : 'translate(0, 0) scale(1)',
          transition: isShrinking
            ? 'transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'none',
          opacity: isShrinking ? 0 : 1,
          // Fade out logo slightly before header logo appears
          // (avoids double-logo flash)
        }}
      >
        <Image
          src="/images/mar-logo.png"
          alt="MAR Collection"
          width={480}
          height={360}
          priority
          style={{ display: 'block' }}
        />
      </div>
    </div>
  )
}
