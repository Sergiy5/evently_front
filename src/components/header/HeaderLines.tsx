import { nanoid } from '@reduxjs/toolkit';

export const HeaderLines: React.FC = () => {
  return (
    <>
      <div
        key={nanoid()}
        className={`absolute h-[1px] translate-x-[-50%] left-[50%] bg-lightPurple bottom-0 w-full z-10`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute h-[1px]  translate-x-[-50%] left-[50%] bg-lightPurple -bottom-5 w-full z-10`}
      ></div>
    </>
  );
};
