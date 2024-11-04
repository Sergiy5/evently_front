import React, { useState, useRef, useEffect } from 'react';
import { Option } from '@/utils/statickData';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";


interface IEventSelectProps {
  options: Option[];
  label?: string; 
  className?: string;
  dropdownWidth?: string;
  buttonWidth?: string;
  replaceLabelOnSelect?: boolean;
  changeLink?: (link: string) => void | undefined;
}

const CustomSelect: React.FC<IEventSelectProps> = ({
  options,
  label = '',
  className,
  dropdownWidth = '60px',
  buttonWidth = '54px',
  replaceLabelOnSelect = true,
  changeLink,
}) => {
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  //function for changing lable 
  const handleClick = (option: Option) => {
    if (replaceLabelOnSelect) {
      setSelectedOption(option.label); 
    }
    setIsOpen(false); 
  };


  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ( 
    <div className="z-30  relative inline-block text-left border-buttonPurple  " ref={dropdownRef}>
      <button
        type="button"
        className={`${
          isOpen ? 'font-bold text-buttonPurple hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_0.5)]' : 'text-gray-700'
        } relative inline-flex justify-center items-center rounded-md px-2 py-1 bg-background text-sm text-gray-700 
         focus:outline-none relative ${className}`}
        style={{ width: buttonWidth }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className=' text-base'>{replaceLabelOnSelect && selectedOption ? selectedOption : label}</span>
        <IoIosArrowDown
          className={`absolute right-[-7px] w-[12px] h-[12px] inline-block mt-[2px] ml-1 transition-transform duration-200 ease-in-out ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div
          role="menu"
          className="origin-top absolute left-1/2 transform -translate-x-1/2 mt-1 rounded-[20px] shadow-lg bg-background 
          border-solid border-[1px] border-buttonPurple ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          style={{ width: dropdownWidth }}
        >
          <div className="py-1">
            {options.map((option) => (
              <NavLink 
              to={option.value}
              onClick={() => { 
                handleClick(option); 
                if (changeLink) {
                  changeLink(option.value); 
                }
              }}
              >
                <div
                  key={option.value}
                  onClick={() => handleClick(option)}
                  className="border-none block w-full mt-3 mb-3 text-left px-4  py-2 
                  text-black active:text-buttonPurple hover:font-bold cursor-pointer"
                  >
                  {option.label}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
