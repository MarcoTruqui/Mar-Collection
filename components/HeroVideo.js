'use client'

import { useEffect, useRef } from 'react'

// Hero clip: the original on Cloudinary is 4K (3840×2160, 40 s, ~87 MB), far
// too heavy to stream, so each screen gets its own derived version (all are
// pre-generated and cached on Cloudinary):
//
//   PHONE   (≤767px wide)  1080×1440 portrait crop, ~4 Mbps. Phones show the
//                          hero as a tall strip, so a wide video gets cropped
//                          and blown up ~2.5× — that was the pixelation.
//   RETINA  (≥1024px, 2×)  2560 wide, ~9 Mbps
//   DESKTOP (≥768px)       1920 wide, ~6 Mbps
//
// q_80 is a fixed, high quality (q_auto picked too low for moving water).
const BASE = 'https://res.cloudinary.com/dwutnv1bb/video/upload'
const FILE = '4006-176282263_1_dim63c'
const SRC_PHONE   = `${BASE}/c_fill,g_center,w_1080,h_1440,q_80,br_4m,vc_h264/${FILE}.mp4`
const SRC_RETINA  = `${BASE}/w_2560,q_80,br_9m,vc_h264/${FILE}.mp4`
const SRC_DESKTOP = `${BASE}/w_1920,q_80,br_6m,vc_h264/${FILE}.mp4`
const POSTER = `${BASE}/so_0,f_jpg,q_auto:good,w_2560/${FILE}.jpg`

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
      <source src={SRC_PHONE} type="video/mp4" media="(max-width: 767px)" />
      <source src={SRC_RETINA} type="video/mp4" media="(min-width: 1024px) and (min-resolution: 1.5dppx)" />
      <source src={SRC_DESKTOP} type="video/mp4" />
    </video>
  )
}
