import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Carousel.css"; 

interface CarouselProps {
  slides: {
    id: number;
    image: string;
    alt: string;
    buttonLink: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  return (
    <div className="carousel-container h-full bg-seasalt flex justify-center items-center">
      <Swiper
        effect="fade" 
        fadeEffect={{ crossFade: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        className="mySwiper w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover shadow-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Botões personalizados */}
      <div className="custom-prev"></div>
      <div className="custom-next"></div>
    </div>
  );
};

export default Carousel;
