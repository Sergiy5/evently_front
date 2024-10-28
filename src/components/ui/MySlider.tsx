'use client';

import { useEffect, useRef, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Settings, default as Slider } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SliderProps<T> {
  arraySlides: T[] | undefined;
  settings: Settings;
  SlideComponent: React.ComponentType<{ event: T }>;
}

export const MySlider = <T,>({
  arraySlides,
  SlideComponent,
  settings,
}: SliderProps<T>) => {
  const [key, setKey] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const handleImagesLoad = () => {
      setKey(prevKey => prevKey + 1);
    };

    handleImagesLoad();
  }, [arraySlides]);

  return (
      <Slider key={key} ref={sliderRef} {...settings}>
        {arraySlides?.map(item => (
          <SlideComponent key={nanoid()} event={item} />
        ))}
      </Slider>
  );
};
