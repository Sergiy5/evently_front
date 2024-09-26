import React, { useState, useRef, useEffect } from 'react';
import { Option } from '@/utils/statickData';



interface EventSelectProps {
  options: Option[];
  label?: string; 
  dropdownWidth?: string;
  buttonWidth?: string;
  replaceLabelOnSelect?: boolean;
  buttonShadow?: string;
}

const CustomSelect: React.FC<EventSelectProps> = ({
  options,
  label = '', 
  dropdownWidth = '60px',
  buttonWidth = '54px',
  replaceLabelOnSelect = true,
  buttonShadow = '' 
}) => {
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleClick = (option: Option) => {
    if (replaceLabelOnSelect) {
      setSelectedOption(option.label); 
    }
    setIsOpen(false); 
    console.log(option.label)
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
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center items-center rounded-md px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none relative"
        style={{ width: buttonWidth }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='text-base hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)]'>{replaceLabelOnSelect && selectedOption ? selectedOption : label}</span>
        <span
          className={`w-0 h-0 inline-block mt-[2px] ml-1 transition-transform duration-200 ease-in-out ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          style={{
            borderLeft: '3px solid transparent',
            borderRight: '3px solid transparent',
            borderTop: '3px solid black',
          }}
        />
      </button>
      {isOpen && (
        <div
          role="menu"
          className="origin-top absolute left-1/2 transform -translate-x-1/2 mt-1 rounded-md shadow-lg bg-blue-100 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          style={{ width: dropdownWidth, boxShadow: buttonShadow }}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleClick(option)}
                className="block w-full text-center px-4 py-2 text-sm text-black hover:bg-blue-200"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
