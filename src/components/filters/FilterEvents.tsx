import { useState } from 'react';

import {
  eventDate,
  eventPrice,
  eventTypes,
} from '@/assets/staticData/statickData';
import { nanoid } from '@reduxjs/toolkit';

import { Checkbox } from '../ui/CheckBox';
import CustomSelect from '../ui/CustomSelect';
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
    <div className="pl-[60px]">
      <div
        className={`w-[312px] border-buttonPurple border-[1px] rounded-[20px] flex flex-col gap-[24px]`}
      >
        <div className="px-[18px] pt-[18px]">
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
          <ul className={`flex flex-col gap-[16px] pl-[18px]`}>
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
          <div>
            <button onClick={() => setShowCalendar(!showCalendar)}>
              Обрати дату
            </button>
            {showCalendar && <DateRange />}
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
