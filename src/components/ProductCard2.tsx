"use client";

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SwiperSlider({ src }: { src: string }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }}
      loop={true}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="mt-5 px-4"
    >
      {[...Array(5)].map((_, i) => (
        <SwiperSlide key={i}>
          <img
            src={src}
            alt={`Project ${i + 1}`}
            className="rounded-2xl w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
