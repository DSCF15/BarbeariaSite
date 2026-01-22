import React, { useRef, useState, useEffect } from 'react'

export default function Gallery({ images = [] }) {
  const trackRef = useRef(null)
  const itemRefs = useRef([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const trackRect = track.getBoundingClientRect()
      const center = trackRect.left + trackRect.width / 2
      let best = 0
      let bestDist = Number.POSITIVE_INFINITY
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const elCenter = r.left + r.width / 2
        const dist = Math.abs(center - elCenter)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setCurrent(best)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => track.removeEventListener('scroll', onScroll)
  }, [images.length])

  if (!images || images.length === 0) return null

  const scrollTo = (idx) => {
    const el = itemRefs.current[idx]
    if (el && trackRef.current) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }

  const prev = () => scrollTo(Math.max(0, current - 1))
  const next = () => scrollTo(Math.min(images.length - 1, current + 1))

  return (
    <section id="galeria" className="mt-16" data-reveal>
      <h2 className="text-2xl font-bold mb-6">Galeria</h2>

      <div className="relative">
        <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white rounded-full p-2">◀</button>
        <div ref={trackRef} className="overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory flex gap-4 py-4 px-6">
          {images.map((src, i) => (
            <div
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              className="snap-center flex-shrink-0 w-[75%] sm:w-[46%] md:w-[36%] lg:w-[30%] h-64 rounded-lg overflow-hidden bg-gray-200 shadow-lg"
              data-item
            >
              <img src={src} alt={`gal-${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white rounded-full p-2">▶</button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => scrollTo(i)} className={`w-2 h-2 rounded-full ${i === current ? 'bg-yellow-300' : 'bg-white/30'}`} aria-label={`Ir para ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}
