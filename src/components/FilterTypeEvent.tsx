import { useEffect, useState } from 'react';
import { CustomCheckbox } from './ui';
import events from '@/assets/fakeData/events';

type FilterOption = {
  label: string;
  value: string;
};

export interface IEvent {
  id: number;
  rating: number;
  name: string;
  category: string;
  start: { day: string; time: string };
  end: { day: string; time: string };
  location: {city:string};
  price: string;
}

// Your filter options (checkboxes)
const filterOptions: FilterOption[] = [
  { label: 'Усі події', value: 'усі' },
  { label: 'Популярні', value: 'популярні' },
  { label: 'Під домом', value: 'під домом' },
  { label: 'Концерти', value: 'концерт' },
  { label: 'Майстер-клас', value: 'майстер-клас' },
  { label: 'Stand-Up', value: 'stand-Up' },
  { label: 'Бізнес та нетворкінг', value: 'бізнес' },
  { label: 'Спортивні заходи', value: 'спорт' },
];
interface FilterTypeEventProps {
  setEvents: (event: IEvent[]) => void;
}

export const FilterTypeEvent: React.FC<FilterTypeEventProps> = ({ setEvents }) => {
  const [selectedFilters, setSelectedFilters] = useState<(string | boolean)[]>(
    []
  );
  const [allEvents, setAllEvents] = useState([...events]);

  // Handle checkbox change
  const handleCheckboxChange = (value: string | boolean) => {
    setSelectedFilters(
      prev =>
        prev.includes(value)
          ? prev.filter(item => item !== value) // Uncheck (remove from selected)
          : [...prev, value] // Check (add to selected)
    );
  };

  useEffect(() => {
      const filteredData = allEvents.filter(
          item =>
            selectedFilters.length === 0 || selectedFilters.includes(item.category)
        );
        setEvents(events);
    }, [selectedFilters]);

  return (
    <div className={` w-full h-16 bg-lightPink px-8 rounded-[20px]`}>
      <ul className={`flex items-center justify-between h-full`}>
        {filterOptions.map(option => (
          <li className={`flex gap-4`}>
            <CustomCheckbox
              value={option.value}
              checked={selectedFilters.includes(option.value)}
              onChange={handleCheckboxChange}
              label={option.label}
              className={``}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
