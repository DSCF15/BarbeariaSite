import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Gallery({ images = [] }) {
  return (
    <section id="galeria" className="mt-16" data-reveal>
      <h2 className="text-2xl font-bold mb-6">Galeria</h2>
      <div className="rounded-lg overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          loop
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="p-2">
                <img src={src} alt={`gal-${i}`} className="w-full h-56 object-cover rounded-lg shadow" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
