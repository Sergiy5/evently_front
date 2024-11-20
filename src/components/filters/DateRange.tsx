import { useEffect, useState } from 'react';
import { DateRange as DateRangeCalendar, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { uk } from 'date-fns/locale';

const dayToday = new Date('2024-11-12T10:00:00');

interface DateRangeProps {
  getRangeDates: (start: Date, end: Date) => void;
}

export function DateRange({ getRangeDates }: DateRangeProps) {
  const [state, setState] = useState<Range[]>([
    {
      startDate: dayToday,
      endDate: undefined,
      key: 'selection',
    },
  ]);

  const start = state[0].startDate;
  const end = state[0].endDate;

  useEffect(() => {
    start && end && getRangeDates(start, end);
  }, [start, end]);

  return (
    <DateRangeCalendar
      className="border-t-[2px] border-buttonPurple"
      editableDateInputs={false}
      onChange={item => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
      locale={uk}
      shownDate={dayToday}
      showMonthAndYearPickers={false}
      showDateDisplay={false}
      rangeColors={['#9B8FF3']}
    />
  );
}