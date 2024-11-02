import Slider from 'react-slick';
import { nanoid } from '@reduxjs/toolkit';
import { useRef, useState } from 'react';
import { slides } from '@/assets/heroSlides/slides';
import { PrevNextBtn } from './PrevNextBtn';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
  };

  const setNextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const setPrevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const setSlideByDot = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <div className="w-full px-[43px]">
      <Slider ref={sliderRef} {...settings}>
        {slides.map(item => (
          <div key={nanoid()} className="aspect-[1356/606]">
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
      <div className="flex items-center mt-[20px] justify-center gap-[8px]">
        <PrevNextBtn onClick={setPrevSlide} />
        <div className="flex items-center gap-[8px]">
          {slides.map(slide => (
            <button
              onClick={() => setSlideByDot(slides.indexOf(slide))}
              className={`rounded-full flex items-center cursor-pointer focus:outline-none
          ${slides.indexOf(slide) === currentSlide ? 'bg-textDark size-3 ' : 'bg-darkGray size-2'}
          `}
            ></button>
          ))}
        </div>
        <PrevNextBtn onClick={setNextSlide} className="rotate-180" />
      </div>
    </div>
  );
};
