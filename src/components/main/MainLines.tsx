import { nanoid } from '@reduxjs/toolkit';

export const MainLines: React.FC = () => {
  return (
    <>
      <div
        key={nanoid()}
        className={`absolute z-10 h-[1px] translate-x-[-50%] left-[50%] bg-lightPurple top-0 w-lvw`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute z-10 h-[1px]  translate-x-[-50%] left-[50%] bg-lightPurple top-5 w-lvw`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute z-10 w-[1px] top-0 bg-lightPurple left-5 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute z-10 w-[1px] top-0 bg-lightPurple left-10 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute z-10 w-[1px] top-0 bg-lightPurple right-5 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute z-10 w-[1px] top-0 bg-lightPurple right-10 h-full`}
      ></div>
    </>
  );
};
