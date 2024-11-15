import { eventDate, eventPrice, eventTypes } from '@/utils/statickData';
import { nanoid } from '@reduxjs/toolkit';

import { Checkbox } from '../ui/CheckBox';

interface FilterEventsProps {
  selectedTypes: string[];
  addTypeFilter: (filter: string) => void;
  filterEvents: () => void;
  resetFilters: () => void;
}

export const FilterEvents: React.FC<FilterEventsProps> = ({
  selectedTypes,
  addTypeFilter,
  filterEvents,
  resetFilters,
}) => {
  return (
    <div className="pl-[60px]">
      <div
        className={`w-[312px] border-buttonPurple border-[1px] rounded-[20px]`}
      >
        <div className="p-[18px]">
          <h2>Тип події</h2>
          <ul className={`flex flex-col gap-[16px]`}>
            {eventTypes.map(option => (
              <li key={nanoid()} className={`flex gap-4`}>
                <Checkbox
                  value={option.label}
                  onChange={() => addTypeFilter(option.label)}
                  checked={selectedTypes.includes(option.label)}
                  label={option.label}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="p-[18px]">
          <h2>Коли</h2>
          <ul className={`flex flex-col gap-[16px]`}>
            {eventDate.map(option => (
              <li key={nanoid()} className={`flex gap-4`}>
                <Checkbox
                  value={option.value}
                  // checked={selectedFilters.includes(option.value)}
                  // onChange={handleCheckboxChange}
                  label={option.label}
                  className={``}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="p-[18px]">
          <h2>Ціна</h2>
          <ul className={`flex flex-col gap-[16px]`}>
            {eventPrice.map(option => (
              <li key={nanoid()} className={`flex gap-4`}>
                <Checkbox
                  value={option.value}
                  // checked={selectedFilters.includes(option.value)}
                  // onChange={handleCheckboxChange}
                  label={option.label}
                  className={``}
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
