import Slider from 'react-slick';
import { nanoid } from '@reduxjs/toolkit';
import cryptoImage from '@/assets/images/cryptoAwards.webp';
import runInHonor from '@/assets/images/runInHonor.webp';
import wieldTheatre from '@/assets/images/wieldTheatre.webp';
import musicPlatform from '@/assets/images/musicPlatform.webp';
import { useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

interface prevNextBtnProps {
  className?: string;
}
const PrevNextBtn: React.FC<prevNextBtnProps> = ({ className }) => {
  return (
    <button
      className={`${className} absolute flex items-center left-0 w-56 h-56 -bottom-110 justify-center bg-red-500
       hover:bg-textDark
      `}
    >
      {/* <MdKeyboardArrowLeft size="24" /> */}
    </button>
  );
};

export const Hero: React.FC = () => {
const [currentSlide, setCurrentSlide] = useState(0);
  const arraySlides = [
    { title: 'Crypto Awards', url: cryptoImage },
    { title: 'Race', url: runInHonor },
    { title: 'Wield Theatre', url: wieldTheatre },
    { title: 'Music Platform', url: musicPlatform },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <PrevNextBtn className="rotate-180" />,
    prevArrow: <PrevNextBtn />,
    arrows: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    customPaging: (i: number) => {
      return (
        <div
          className={`rounded-full absolute
          ${i === currentSlide ? 'bg-textDark size-3 top-1' : 'bg-darkGray size-2 top-1'}
          `}
        ></div>
      );
    },
    dotsClass: 'slick-dots custom-dots',
    afterChange: (currentSlide: number) => {
      setCurrentSlide(currentSlide);
    },
  };

  return (
    <div className="w-full px-[43px]">
      <Slider {...settings} dots dotsClass='slick-dots custom-dots'>
        {arraySlides.map(item => (
          <div key={nanoid()} className={` aspect-[1356/606] `}>
            <img
              // aria-hiden="true"
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
