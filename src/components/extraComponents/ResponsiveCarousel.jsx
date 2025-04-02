// src/extraComponents/ResponsiveCarousel.jsx
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ResponsiveCarousel({ slides }) {
  // Estado para detectar si la pantalla es móvil (< 768px)
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función que renderiza un bloque en base a los datos
  const renderBlock = (slide) => (
    <div className={`w-full ${slide.bgColor || 'bg-white'} flex h-full flex-col justify-start items-start gap-[10px] md:gap-[15px] p-3 md:p-6 rounded-lg shadow-md  min-h-[300px] max-h-[450px]`} >
      <img src={slide.image} alt={`Imagen de ${slide.title}`} className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2" />
      <h5 className="text-[14px] leading-[18px] xs:text-[18px] xs:leading-[20px]  font-RobotoSlab font-medium text-black">{slide.title}</h5>
      <ul className="list-disc flex flex-col gap-1  pl-5 text-gray-700">
      {slide.content.map((item, index) => (
        <li
          key={index}
          className="text-[12px] leading-[16px] sm:text-[14px] sm:leading-[18px] xl:text-[18px] xl:leading-[22px] font-RobotoSlab font-light mb-2"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
      </ul>
    </div>
  );

  // Placeholder hasta que el componente se monte
  if (!mounted) {
    return <div className="h-full w-full bg-gray-100 animate-pulse"></div>;
  }

  // Si es móvil, renderiza el carrusel con bullets de paginación
  if (isMobile) {
    return (
      <div className="w-full h-full px-4 ">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="w-full py-4 h-full"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id} className="w-full h-full flex justify-center items-stretch pb-12 md:pb-4">
              <div className="w-full h-full">
                {renderBlock(slide)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // Si es md o mayor, renderiza los bloques de forma estática en una fila
  return (
    <div className="w-full h-full flex-1 
                    grid 
                    grid-cols-2 
                    gap-6 
                    px-4 md:px-0 
                    py-8 md:py-0 
"
    >
      {slides.map(slide => (
        <div key={slide.id} className="h-full">
          {renderBlock(slide)}
        </div>
      ))}
    </div>
  );

}
