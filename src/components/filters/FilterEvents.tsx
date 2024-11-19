import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import {
  eventDate,
  eventPrice,
  eventTypes,
} from '@/assets/staticData/statickData';
import { nanoid } from '@reduxjs/toolkit';

import { Checkbox } from '../ui/CheckBox';
import { DateRange } from './DateRange';

interface FilterEventsProps {
  selectedTypes: string[];
  addTypeFilter: (filter: string) => void;
  filterEvents: () => void;
  resetFilters: () => void;
  addDateFilter: (filter: string) => void;
  selectedDates: string[];
  addPriceFilter: (filter: number) => void;
  selectedPrices: number[];
}

export const FilterEvents: React.FC<FilterEventsProps> = ({
  selectedTypes,
  addTypeFilter,
  filterEvents,
  resetFilters,
  addDateFilter,
  selectedDates,
  addPriceFilter,
  selectedPrices,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="pl-[60px] relative">
      <div
        className="sticky top-[157px] h-[600px] w-[312px] border-buttonPurple border-[1px]
      rounded-[20px] flex flex-col gap-[24px] pt-[18px]"
      >
        <div className=" overflow-y-scroll">
          <div className="px-[18px]">
            <h2 className="mb-[16px]">Тип події</h2>
            <ul className={`flex flex-col gap-[16px] pl-[18px]`}>
              {eventTypes.map(option => (
                <li key={nanoid()} className={`flex gap-4`}>
                  <Checkbox
                    name="type"
                    value={option.label}
                    onChange={() => addTypeFilter(option.label)}
                    checked={selectedTypes.includes(option.label)}
                    label={option.label}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="px-[18px]">
            <h2 className="mb-[16px]">Коли</h2>
            <div className="pl-[18px]">
              <ul className="flex flex-col gap-[16px] mb-[18px]">
                {eventDate.map(option => (
                  <li key={nanoid()} className={`flex gap-4`}>
                    <Checkbox
                      name="when"
                      value={option.value}
                      onChange={() => addDateFilter(option.label)}
                      checked={selectedDates.includes(option.label)}
                      label={option.label}
                    />
                  </li>
                ))}
              </ul>
              <div
                className="border-[1px] border-buttonPurple rounded-[10px] overflow-hidden 
            w-[245px] mb-[18px]"
              >
                <button
                  className="flex justify-between items-center w-full h-[34px] px-[12px] focus:outline-none"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <span>Обрати дату</span>
                  <BiChevronDown />
                </button>
                {showCalendar && <DateRange />}
              </div>
            </div>
          </div>

          <div className="px-[18px]">
            <h2 className="mb-[16px]">Ціна</h2>
            <ul className={`flex flex-col gap-[16px] pl-[18px]`}>
              {eventPrice.map(option => (
                <li key={nanoid()} className={`flex gap-4`}>
                  <Checkbox
                    name="price"
                    value={option.value}
                    onChange={() => addPriceFilter(option.value)}
                    checked={selectedPrices.includes(option.value)}
                    label={option.label}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t-buttonPurple border-t-[1px] flex">
          <button
            className="h-[50px] flex justify-center items-center flex-1 focus:outline-none border-r-buttonPurple border-r-[1px]"
            onClick={resetFilters}
          >
            Відмінити
          </button>
          <button
            className="h-[50px] flex justify-center items-center flex-1 focus:outline-none bg-filter-btn-gradient rounded-br-[19px] text-background"
            onClick={filterEvents}
          >
            Застосувати
          </button>
        </div>
      </div>
    </div>
  );
};
