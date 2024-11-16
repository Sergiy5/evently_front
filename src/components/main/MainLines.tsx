import { nanoid } from '@reduxjs/toolkit';

export const MainLines: React.FC = () => {
  return (
    <>
      <div
        key={nanoid()}
        className={`absolute z-50 w-[1px] top-0 bg-lightPurple left-5 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute z-50 w-[1px] top-0 bg-lightPurple left-10 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute z-50 w-[1px] top-0 bg-lightPurple right-5 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute z-50 w-[1px] top-0 bg-lightPurple right-10 h-full`}
      ></div>
    </>
  );
};
