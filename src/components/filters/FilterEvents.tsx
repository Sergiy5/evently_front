import { useEffect, useState } from 'react';

import { eventDate, eventPrice, eventTypes } from '@/utils/statickData';
import { nanoid } from '@reduxjs/toolkit';

import { Container } from '../container/Container';
import { CustomCheckbox } from '../ui';
import { Checkbox } from '../ui/CheckBox';

interface FilterEventsProps {}

export const FilterEvents: React.FC<FilterEventsProps> = () => {
  // const [selectedFilters, setSelectedFilters] = useState<(string | boolean)[]>(
  //   []
  // );
  // const [allEvents, setAllEvents] = useState([...events]);

  // // Handle checkbox change
  // const handleCheckboxChange = (value: string | boolean) => {
  //   setSelectedFilters(
  //     prev =>
  //       prev.includes(value)
  //         ? prev.filter(item => item !== value) // Uncheck (remove from selected)
  //         : [...prev, value] // Check (add to selected)
  //   );
  // };

  // useEffect(() => {
  //   const filteredData = allEvents.filter(
  //     item =>
  //       selectedFilters.length === 0 || selectedFilters.includes(item.category)
  //   );
  //   setEvents(events);
  //   setAllEvents;
  //   filteredData;
  // }, [selectedFilters]);

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
                value={option.value}
                // checked={selectedFilters.includes(option.value)}
                // onChange={handleCheckboxChange}
                label={option.label}
                className={``}
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
          <button>Застосувати</button>
        </div>
      </div>
    </div>
  );
};
