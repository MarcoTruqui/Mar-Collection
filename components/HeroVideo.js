'use client'

import { useEffect, useRef } from 'react'

// Cloudinary derived version of the hero clip (the original is ~87 MB, which
// stalled playback and flashed white while it buffered). This exact
// transformation is already generated and cached on Cloudinary (~7.6 MB).
const BASE = 'https://res.cloudinary.com/dwutnv1bb/video/upload'
const FILE = '4006-176282263_1_dim63c'
const SRC    = `${BASE}/q_auto:eco,w_1280,br_1500k/${FILE}.mp4`
const POSTER = `${BASE}/so_0,f_jpg,q_auto,w_1600/${FILE}.jpg`

// The <video> must be in the server-rendered HTML with `muted` and `src`
// already set. Phones (iOS especially) only autoplay a video that was muted
// when the browser first parsed it; one created later by React has no muted
// attribute, so the phone shows a play button instead of starting it.
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
      src={SRC}
      className="absolute inset-0 w-full h-full object-cover"
    />
  )
}
