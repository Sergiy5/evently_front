import { eventDate, eventPrice, eventTypes } from '@/utils/statickData';
import { nanoid } from '@reduxjs/toolkit';

import { Checkbox } from '../ui/CheckBox';

interface FilterEventsProps {
  selectedTypes: string[];
  addTypeFilter: (filter: string) => void;
  filterEvents: () => void;
}

export const FilterEvents: React.FC<FilterEventsProps> = ({
  selectedTypes,
  addTypeFilter,
  filterEvents,
}) => {
  return (
    <div className="pl-[60px]">
      <div
        className={`w-[312px] p-[18px] border-buttonPurple border-[1px] rounded-[20px]`}
      >
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

        <div>
          <button>Відмінити</button>
          <button onClick={filterEvents}>Застосувати</button>
        </div>
      </div>
    </div>
  );
};
