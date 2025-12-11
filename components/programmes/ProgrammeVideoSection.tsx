'use client'

import { useState } from 'react'

export function ProgrammeVideoSection() {
  const [showVideo, setShowVideo] = useState(false)

  if (showVideo) {
    return (
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/dXx7-UIwJU4?autoplay=1&rel=0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-[200px] border-0 rounded-[15px]"
        />
      </div>
    )
  }

  return (
    <div
      className="video-thumbnail relative cursor-pointer min-h-[200px] flex items-center justify-center"
      onClick={() => setShowVideo(true)}
    >
      <img
        src="https://www.dropbox.com/scl/fi/pxy8v703kyi0iger4f0hr/unnamed-2025-09-09T235552.619.png?rlkey=156oka4lfl3e6kbz441sz1yo6&st=w9narb5r&dl=1"
        alt="Présentation Formation Essentielle NaviGuide"
        className="w-full h-[200px] object-cover rounded-[15px]"
      />
      <div className="play-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 rounded-full w-[70px] h-[70px] flex items-center justify-center transition-all hover:bg-black/80 hover:scale-110">
        <span className="text-white text-3xl ml-1">▶</span>
      </div>
    </div>
  )
}
