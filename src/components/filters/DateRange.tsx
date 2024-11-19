import { useState } from 'react';
import { DateRange as DateRangeCalendar, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { uk } from 'date-fns/locale';

const dayToday = new Date('2024-11-12T10:00:00');

export function DateRange() {
  const [state, setState] = useState<Range[]>([
    {
      startDate: dayToday,
      endDate: undefined,
      key: 'selection',
    },
  ]);
  console.log(state);

  return (
    <div className="border-t-[1px] border-buttonPurple">
      <DateRangeCalendar
        editableDateInputs={false}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        locale={uk}
        shownDate={dayToday}
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        rangeColors={['#E2DEFF']}
      />
    </div>
  );
}
