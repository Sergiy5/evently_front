import { useEffect, useState } from 'react';
import { DateRange as DateRangeCalendar, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { uk } from 'date-fns/locale';

const dayToday = new Date('2024-11-12T10:00:00');

interface DateRangeProps {
  getRangeDates: (start: Date, end: Date | undefined) => void;
  isShownCalendar: boolean;
}

export function DateRange({ getRangeDates, isShownCalendar }: DateRangeProps) {
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
    if (isShownCalendar) {
      if (start && end) {
        getRangeDates(start, end);
      }
    }
    if (!isShownCalendar) {
      setState([{ startDate: dayToday, endDate: undefined, key: 'selection' }]);
      getRangeDates(dayToday, undefined);
    }
  }, [start, end, isShownCalendar]);

  return (
    <div
      style={{
        height: isShownCalendar ? 'auto' : '0',
      }}
    >
      <DateRangeCalendar
        className="border-t-[2px] border-buttonPurple"
        editableDateInputs={false}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        locale={uk}
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        rangeColors={['#9B8FF3']}
      />
    </div>
  );
}
