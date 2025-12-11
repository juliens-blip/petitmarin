'use client'

import { useState } from 'react'

export function VideoSection() {
  const [showVideo, setShowVideo] = useState(false)

  if (showVideo) {
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src="https://www.youtube.com/embed/qRYGnndjYbI?autoplay=1&rel=0"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div
      className="relative w-full cursor-pointer rounded-lg overflow-hidden shadow-xl"
      style={{ paddingBottom: '56.25%' }}
      onClick={() => setShowVideo(true)}
    >
      <img
        src="https://dl.dropboxusercontent.com/scl/fi/iduuxqxi2m0xtv3xq92rn/unnamed-2025-09-06T223506.582.png?rlkey=shk8d2fpagn311yrcbcpou2xf"
        alt="Vidéo de présentation"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors">
        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-[#007bff] ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
