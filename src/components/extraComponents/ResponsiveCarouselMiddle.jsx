// src/extraComponents/ResponsiveCarousel.jsx
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ResponsiveCarousel({ slides }) {
  // State to track screen size
  const [screenSize, setScreenSize] = useState('mobile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 550) {
        setScreenSize('mobile');
      } else if (width >= 550 && width < 1280) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función que renderiza un bloque en base a los datos
  const renderBlock = (slide) => (
    <div className={`w-full ${slide.bgColor || 'bg-white'} flex h-full flex-col justify-start items-start gap-[10px] md:gap-[15px] p-3 md:p-6 rounded-lg shadow-md min-h-[240px] max-h-[450px]`}>
      <img src={slide.image} alt={`Imagen de ${slide.title}`} className="w-8 h-8 md:w-10 md:h-10 mb-1 md:mb-2" />
      <h5 
        className="text-[14px] leading-[18px] xs:text-[18px] xs:leading-[20px] font-RobotoSlab font-medium mb-0 md:mb-2 text-black"
        dangerouslySetInnerHTML={{ __html: slide.title }}
      />
      <ul className="flex flex-col gap-1 pl-0 text-gray-700">
      {slide.content.map((item, index) => (
        <li
          key={index}
          className=" leading-[18px] md:leading-[18px] font-RobotoSlab font-light mb-0 md:mb-2"
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

  // Mobile view (< 550px): 1 slide carousel
  if (screenSize === 'mobile') {
    return (
      <div className="w-full h-full px-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="w-full py-4 h-full"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id} className="w-full h-full flex justify-center items-stretch pb-12">
              <div className="w-full h-full">
                {renderBlock(slide)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // Tablet view (550px - 1279px): 2 slides carousel
  if (screenSize === 'tablet') {
    return (
      <div className="w-full h-full px-4">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="w-full py-4 h-full"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id} className="w-full h-full flex justify-center items-stretch pb-12">
              <div className="w-full h-full">
                {renderBlock(slide)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // Desktop view (≥ 1280px): 3 static panels in a grid
  return (
    <div className="w-full h-full flex-1 grid grid-cols-3 gap-6 px-4 xl:px-0 py-8 xl:py-0">
      {slides.map(slide => (
        <div key={slide.id} className="h-full">
          {renderBlock(slide)}
        </div>
      ))}
    </div>
  );
}