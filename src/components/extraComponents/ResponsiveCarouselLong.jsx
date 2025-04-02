// src/extraComponents/ResponsiveCarousel.jsx
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ResponsiveCarouselLong({ slides }) {
  // State to track screen size
  const [screenSize, setScreenSize] = useState('mobile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width >= 768 && width < 1536) {
        setScreenSize('tablet');
      } else if (width >= 1536 && width < 1920) {
        setScreenSize('desktop');
      } else {
        setScreenSize('large');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to render a block based on data
  const renderBlock = (slide) => (
    <div className={`relative w-full ${slide.bgColor || 'bg-white'} flex h-full flex-col justify-start items-start gap-[10px] md:gap-[15px] p-3 md:p-4 rounded-lg shadow-md min-h-[300px] max-h-[440px] xl:max-h-[480px] 2xl:max-h-[580px] 3xl:max-h-[700px]`}>
      <img src={slide.image} alt={`Imagen de ${slide.title}`} className="absolute w-10 h-10 md:w-12 md:h-12 top-[-12px] mb-1 md:mb-2" />
      <h5 className="text-[14px] leading-[18px] xs:text-[18px] xs:leading-[20px]  font-RobotoSlab font-medium text-black mt-6">{slide.title}</h5>
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

  // Placeholder until component mounts
  if (!mounted) {
    return <div className="h-full w-full bg-gray-100 animate-pulse"></div>;
  }

  // Responsive rendering based on screen size
  if (screenSize === 'mobile') {
    // Mobile: 1 item per view
    return (
      <div className="w-full h-full px-4 ">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="w-full py-4 h-full custom-swiper-long"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id} className="w-full h-full flex justify-center items-stretch pb-12 md:pb-4 pt-4">
              <div className="w-full h-full">
                {renderBlock(slide)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } else if (screenSize === 'tablet') {
    // Tablet: 2 items per view
    return (
      <div className="w-full h-full px-4 min-h-[520px]">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="w-full py-4 h-full custom-swiper-long"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id} className="w-full h-full flex justify-center items-stretch pb-12 md:pb-4 pt-4">
              <div className="w-full h-full">
                {renderBlock(slide)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } else if (screenSize === 'desktop') {
    // Desktop: 3 items per view
    return (
      <div className="w-full h-full px-4 min-h-[480px]">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="w-full py-4 h-full custom-swiper-long"
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id} className="w-full h-full flex justify-center items-stretch pb-12 md:pb-4 pt-4">
              <div className="w-full h-full">
                {renderBlock(slide)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } else {
    // Large screens: all 5 items in a row
    return (
      <div className="w-full h-full grid grid-cols-5 gap-4 px-4">
        {slides.map(slide => (
          <div key={slide.id} className="h-full">
            {renderBlock(slide)}
          </div>
        ))}
      </div>
    );
  }
}