import { useEffect, useState } from 'react';
import { DateRange as DateRangeCalendar, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { clearDateRange, setDateRange } from '@/redux/filters/filtersSlice';
import { getEndDay, getStartDay } from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { uk } from 'date-fns/locale';

const dayToday = new Date('2024-11-12T10:00:00');

interface DateRangeProps {
  isShownCalendar: boolean;
}

export function DateRange({ isShownCalendar }: DateRangeProps) {
  const startDay = useAppSelector(getStartDay);
  const endDay = useAppSelector(getEndDay);

  const [state, setState] = useState<Range[]>([
    {
      startDate: startDay ? new Date(startDay) : undefined,
      endDate: endDay ? new Date(endDay) : undefined,
      key: 'selection',
    },
  ]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isShownCalendar) {
      const start = state[0].startDate?.toISOString() || undefined;
      const end = state[0].endDate?.toISOString() || undefined;

      dispatch(
        setDateRange({
          start: start,
          end: end,
        })
      );
    }
    if (!isShownCalendar) {
      setState([
        { startDate: undefined, endDate: undefined, key: 'selection' },
      ]);
      dispatch(clearDateRange());
    }
  }, [isShownCalendar, dispatch, state]);

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
        shownDate={dayToday}
      />
    </div>
  );
}
