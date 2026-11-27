'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { BRAND_NAME, BRAND_WORDMARK, BRAND_WORDMARK_SIZE } from '@/lib/brand'

// Opening screen: the Truqui Collection wordmark on bone, shown every time the
// site is opened. It fades in, holds briefly while the page loads, then lifts
// away to reveal the page. Never blocks for long: hard cap ~2.6 s.
export default function IntroLoader() {
  const [phase, setPhase] = useState('in') // in | shown | out | done

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers = []
    const later = (fn, ms) => timers.push(setTimeout(fn, ms))

    let started = false
    const leave = () => {
      if (started) return
      started = true
      setPhase('out')
      later(() => setPhase('done'), reduceMotion ? 200 : 750)
    }
    // Hold at least 1.3 s so the name registers; leave sooner after load if
    // the page took longer; never hold longer than 2.6 s.
    later(leave, reduceMotion ? 400 : 1300)
    later(leave, 2600)

    return () => timers.forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  const out = phase === 'out'

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#F6F2EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: out ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: out ? 'none' : 'all',
      }}
    >
      {/* Fade-in is pure CSS (globals.css → intro-in) so the wordmark shows
          from the very first paint, before the page's scripts have started. */}
      <div
        className="intro-in"
        style={{
          width: 'min(64vw, 420px)',
          transform: out ? 'translateY(-10px) scale(0.98)' : undefined,
          transition: 'transform 0.7s ease',
        }}
      >
        <Image
          src={BRAND_WORDMARK}
          alt={BRAND_NAME}
          width={BRAND_WORDMARK_SIZE.width}
          height={BRAND_WORDMARK_SIZE.height}
          priority
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>
    </div>
  )
}
