'use client'

import { useState } from 'react'

const testimonials = [
  {
    type: 'text',
    name: 'Pierre M.',
    location: 'Marseille',
    text: 'Grâce à NaviGuide, j\'ai évité de nombreux pièges lors de l\'achat de mon premier voilier. Formation très complète !',
    rating: 5,
  },
  {
    type: 'video',
    name: 'Jean',
    location: 'Témoignage vidéo',
    youtubeId: 'U38C2vMt5Xs',
    thumbnail: 'https://www.dropbox.com/scl/fi/3qrfgtkq6rp5e8wj8u7gf/unnamed-2025-09-09T235551.901.png?rlkey=eujvq49exz7j46jxp0sscvlrz&st=c1jrqx0m&dl=1',
    rating: 5,
  },
  {
    type: 'text',
    name: 'Sophie D.',
    location: 'La Rochelle',
    text: 'Les modules sur l\'inspection technique m\'ont permis d\'économiser des milliers d\'euros en détectant les problèmes avant l\'achat.',
    rating: 5,
  },
  {
    type: 'video',
    name: 'Famille',
    location: 'Témoignage vidéo',
    youtubeId: 'Ks0yMH7Kl9I',
    thumbnail: 'https://www.dropbox.com/scl/fi/jzs52xsj0yyk7u6glw5ka/unnamed-2025-09-09T235551.629.png?rlkey=x7j28lqahsn54jbuzqgmktj8v&st=cnjywqmq&dl=1',
    rating: 5,
  },
  {
    type: 'text',
    name: 'Marc L.',
    location: 'Brest',
    text: 'Formation claire et structurée. J\'ai particulièrement apprécié les checklists téléchargeables.',
    rating: 5,
  },
  {
    type: 'text',
    name: 'Anne C.',
    location: 'Nice',
    text: 'Excellent investissement ! Je me sens maintenant capable de négocier et d\'acheter mon bateau en toute confiance.',
    rating: 5,
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setShowVideo(false)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setShowVideo(false)
  }

  const testimonial = testimonials[currentIndex]

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
        <div className="flex gap-1 text-yellow-400 mb-4 justify-center">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {testimonial.type === 'text' ? (
          <>
            <p className="text-gray-700 text-lg md:text-xl italic text-center mb-6">
              "{testimonial.text}"
            </p>
            <div className="text-center">
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              <p className="text-gray-500 text-sm">{testimonial.location}</p>
            </div>
          </>
        ) : (
          <>
            {showVideo ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=1&rel=0`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                className="relative w-full cursor-pointer rounded-lg overflow-hidden"
                style={{ paddingBottom: '56.25%' }}
                onClick={() => setShowVideo(true)}
              >
                <img
                  src={testimonial.thumbnail}
                  alt={`Témoignage de ${testimonial.name}`}
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
            )}
            <div className="text-center mt-4">
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              <p className="text-gray-500 text-sm">{testimonial.location}</p>
            </div>
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
        aria-label="Témoignage précédent"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
        aria-label="Témoignage suivant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-[#007bff]' : 'bg-gray-300'
            }`}
            aria-label={`Aller au témoignage ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
