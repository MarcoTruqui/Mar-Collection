'use client'

import { useEffect, useState } from 'react'

// Cloudinary derived versions of the hero clip (the original file is ~87 MB,
// which stalled playback and showed a white flash while it buffered). These
// exact transformation strings are already generated and cached on Cloudinary.
const BASE = 'https://res.cloudinary.com/dwutnv1bb/video/upload'
const FILE = '4006-176282263_1_dim63c'
const SRC_DESKTOP = `${BASE}/q_auto:eco,w_1280,br_1500k/${FILE}.mp4` // ~7.6 MB
const SRC_MOBILE  = `${BASE}/q_auto:eco,w_960,br_900k/${FILE}.mp4`   // ~4.6 MB
const POSTER      = `${BASE}/so_0,f_jpg,q_auto,w_1600/${FILE}.jpg`

export default function HeroVideo() {
  const [src, setSrc] = useState(null)

  // Pick the smaller file on phones; wait until mounted so only one of the
  // two files is ever downloaded.
  useEffect(() => {
    setSrc(window.matchMedia('(max-width: 767px)').matches ? SRC_MOBILE : SRC_DESKTOP)
  }, [])

  return (
    <video
      key={src || 'pending'}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      src={src || undefined}
      className="absolute inset-0 w-full h-full object-cover"
    />
  )
}
