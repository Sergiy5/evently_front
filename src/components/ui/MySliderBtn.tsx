import React from 'react';
import clsx from 'clsx';
import { MdKeyboardArrowLeft } from 'react-icons/md';
// import ArrowIcon from "../../../../public/icons/arrow.svg";
// import { MySliderBtnProps } from "@/typification";

export interface CustomArrowProps {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onClick?: React.MouseEventHandler<any> | undefined;
  currentSlide?: number | undefined;
  slideCount?: number | undefined;
}

export interface MySliderBtnProps extends CustomArrowProps {
  prev_style?: string;
}

export const MySliderBtn: React.FC<MySliderBtnProps> = ({
  currentSlide,
  slideCount,
  prev_style,
  ...props
}): React.JSX.Element => {
  const isActiveNext = currentSlide === 16;
  const isActivePrev = currentSlide === 0;

  const isActive = prev_style ? isActivePrev : isActiveNext;

  return (
    <button
      {...props}
      aria-disabled={isActive}
      className={clsx(
        `absolute  top-[42%] flex items-center justify-center w-20 h-20 rounded-[20px]
         outline-none transition-colors transition-outline duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] z-10`,
        {
          'cursor-default': isActive,
          'cursor-pointer': !isActive,
          [`${
            isActive
              ? 'text-disabledColor bg-disabledBgColor'
              : 'text-textColor bg-enableBgColor'
          }`]: true,

          [`hover:text-${
            !isActive ? 'accentColor' : 'textColor'
          } hover:bg-hoverBgColor active:text-accentClicked active:bg-accentClicked focus:outline-2`]:
            !isActive,
          'focus:outline-2': !isActive,
        },
        prev_style ? '-left-7' : '-right-7'
      )}
    >
      <MdKeyboardArrowLeft
      // className={clsx(
      //   " ml-auto mr-auto text-inherit w-6 h-6 opacity-100",
      //   prev_style
      // )}
      />
    </button>
  );
};
