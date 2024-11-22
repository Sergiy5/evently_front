import { useEffect, useState } from 'react';

import { parseDateWithTime } from '@/helpers/parseDateWithTime';
import { thisWeekDays } from '@/helpers/thisWeekDays';
import { thisWeekendDays } from '@/helpers/thisWeekendDays';

interface useGetFilteredEventsByDateProps {
  filteredEventsByType: Event[];
  selectedDatesLS: string[];
  showCalendar: boolean;
}

export function useGetFilteredEventsByDate({
  filteredEventsByType,
  selectedDatesLS,
  showCalendar,
}: useGetFilteredEventsByDateProps) {
  const [filteredEventsByDate, setFilteredEventsByDate] = useState<Event[]>([]);

  const dayToday = '2024-11-12T10:00:00';

  const getDateOnly = (date: string) => {
    return date.slice(0, 10);
  };

  const todayFilter = selectedDatesLS.includes('Сьогодні');
  const onWeekendFilter = selectedDatesLS.includes('На вихідних');
  const thisWeekFilter = selectedDatesLS.includes('На цьому тижні');

  const thisWeekDaysArray = thisWeekDays({ dayToday });
  const thisWeekendDaysArray = thisWeekendDays({ dayToday });

  useEffect(() => {
    if (selectedDatesLS.length === 0 && !showCalendar) {
      setFilteredEventsByDate(filteredEventsByType);
      return;
    }
    if (selectedDatesLS.length === 0 && showCalendar) {
      setFilteredEventsByDate([]);
      return;
    }
    // today only
    if (selectedDatesLS.length === 1 && todayFilter) {
      const filteredArray = filteredEventsByType.filter(
        item =>
          getDateOnly(parseDateWithTime({ dateString: item.date.day })) ===
          getDateOnly(dayToday)
      );
      setFilteredEventsByDate(filteredArray);
      return;
    }
    // on weekend only
    if (selectedDatesLS.length === 1 && onWeekendFilter) {
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
    if (selectedDatesLS.length === 2 && !thisWeekFilter) {
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
    selectedDatesLS,
    todayFilter,
    thisWeekFilter,
    onWeekendFilter,
    showCalendar,
  ]);

  return { filteredEventsByDate };
}
