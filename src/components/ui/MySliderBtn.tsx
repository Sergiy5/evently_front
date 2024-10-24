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
  prev_style?: boolean;
}

export const MySliderBtn: React.FC<MySliderBtnProps> = ({
  currentSlide = 0,
  slideCount = 0,
  prev_style,
  ...props
}): React.JSX.Element => {
  const isActiveNext = currentSlide > 16 - 5;
  const isActivePrev = currentSlide === 0;

  const isActive = prev_style ? isActivePrev : isActiveNext;

  return (
    <button
      {...props}
      aria-disabled={isActive}
      className={clsx(
        `absolute  -top-20 flex items-center justify-center w-10 h-10 rounded-full 
         focus:outline-none transition-colors transition-outline duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] z-10`,
        {
          'cursor-default': isActive,
          'cursor-pointer': !isActive,
          [`${
            !isActive
              ? 'text-background bg-borderColor '
              : 'text-textDark bg-gray'
          }`]: true,

          // [`hover:text-${
          //   !isActive ? 'accentColor' : 'textColor'
          // } hover:bg-hoverBgColor active:text-accentClicked active:bg-accentClicked focus:outline-2`]:
          //   !isActive,
          // 'focus:outline-2': !isActive,
        },
        prev_style ? 'right-16' : 'left-[1277px]'
      )}
    >
      <MdKeyboardArrowLeft
        className={`ml-auto mr-auto text-inherit w-6 h-6 ${prev_style && 'rotate-180'}`}
      />
    </button>
  );
};
