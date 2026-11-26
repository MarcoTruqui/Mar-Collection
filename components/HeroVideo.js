'use client'

import { useEffect, useRef } from 'react'

// Cloudinary derived versions of the hero clip (the original is ~87 MB, which
// stalled playback and flashed white while it buffered). Both versions below
// are already generated and cached on Cloudinary:
//   HD  (computers, ≥1024px wide): 1920px, ~4 Mbps, ~20 MB
//   SD  (phones/tablets):          1080px, ~2 Mbps, ~10 MB
// The old single 1280px / 1.5 Mbps version looked pixelated on big screens.
const BASE = 'https://res.cloudinary.com/dwutnv1bb/video/upload'
const FILE = '4006-176282263_1_dim63c'
const SRC_HD = `${BASE}/q_auto:good,w_1920,br_4m,vc_h264/${FILE}.mp4`
const SRC_SD = `${BASE}/q_auto:good,w_1080,br_2m,vc_h264/${FILE}.mp4`
const POSTER = `${BASE}/so_0,f_jpg,q_auto:good,w_1920/${FILE}.jpg`

// The <video> must be in the server-rendered HTML with `muted` and its
// sources already set. Phones (iOS especially) only autoplay a video that was
// muted when the browser first parsed it; one created later by React has no
// muted attribute, so the phone shows a play button instead of starting it.
// The browser picks the first <source> whose media query matches.
export default function HeroVideo() {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.setAttribute('muted', '')
    v.play().catch(() => {})
  }, [])

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={SRC_HD} type="video/mp4" media="(min-width: 1024px)" />
      <source src={SRC_SD} type="video/mp4" />
    </video>
  )
}
