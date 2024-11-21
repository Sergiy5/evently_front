import { useEffect, useState } from 'react';

import { parseDateWithTime } from '@/helpers/parseDateWithTime';
import { thisWeekDays } from '@/helpers/thisWeekDays';
import { thisWeekendDays } from '@/helpers/thisWeekendDays';

interface useGetFilteredEventsByDateProps {
  filteredEventsByType: Event[];
  selectedDates: string[];
  showCalendar: boolean;
}

export function useGetFilteredEventsByDate({
  filteredEventsByType,
  selectedDates,
  showCalendar,
}: useGetFilteredEventsByDateProps) {
  const [filteredEventsByDate, setFilteredEventsByDate] = useState<Event[]>([]);

  const dayToday = '2024-11-12T10:00:00';

  const getDateOnly = (date: string) => {
    return date.slice(0, 10);
  };

  const todayFilter = selectedDates.includes('Сьогодні');
  const onWeekendFilter = selectedDates.includes('На вихідних');
  const thisWeekFilter = selectedDates.includes('На цьому тижні');

  const thisWeekDaysArray = thisWeekDays({ dayToday });
  const thisWeekendDaysArray = thisWeekendDays({ dayToday });

  useEffect(() => {
    if (selectedDates.length === 0 && !showCalendar) {
      setFilteredEventsByDate(filteredEventsByType);
      return;
    }
    if (selectedDates.length === 0 && showCalendar) {
      setFilteredEventsByDate([]);
      return;
    }
    // today only
    if (selectedDates.length === 1 && todayFilter) {
      const filteredArray = filteredEventsByType.filter(
        item =>
          getDateOnly(parseDateWithTime({ dateString: item.date.day })) ===
          getDateOnly(dayToday)
      );
      setFilteredEventsByDate(filteredArray);
      return;
    }
    // on weekend only
    if (selectedDates.length === 1 && onWeekendFilter) {
      const filteredArray = filteredEventsByType.filter(item =>
        thisWeekendDaysArray.includes(
          getDateOnly(parseDateWithTime({ dateString: item.date.day }))
        )
      );
      setFilteredEventsByDate(filteredArray);
      return;
    }
    // this week
    if (thisWeekFilter) {
      const filteredArray = filteredEventsByType.filter(item =>
        thisWeekDaysArray.includes(
          getDateOnly(parseDateWithTime({ dateString: item.date.day }))
        )
      );
      setFilteredEventsByDate(filteredArray);
      return;
    }
    // today and on weekend
    if (selectedDates.length === 2 && !thisWeekFilter) {
      const filteredArray = filteredEventsByType.filter(
        item =>
          getDateOnly(parseDateWithTime({ dateString: item.date.day })) ===
            getDateOnly(dayToday) ||
          thisWeekendDaysArray.includes(
            getDateOnly(parseDateWithTime({ dateString: item.date.day }))
          )
      );
      setFilteredEventsByDate(filteredArray);
      return;
    }
  }, [
    filteredEventsByType,
    selectedDates.length,
    todayFilter,
    thisWeekFilter,
    onWeekendFilter,
    showCalendar
  ]);

  return { filteredEventsByDate };
}
