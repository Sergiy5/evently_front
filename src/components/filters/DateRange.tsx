import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { addMonths } from 'date-fns';
import { uk } from 'date-fns/locale';

const dayToday = new Date('2024-11-12T10:00:00');

export function DateRange() {
  // const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startDate1, setStartDate1] = useState<Date | null>(dayToday);
  const [endDate, setEndDate] = useState<Date | null>();

  const onChange = (dates: [Date | null, Date | null] | null) => {
    if (!dates) return;
    const [start, end] = dates;
    setStartDate1(start);
    if (end) setEndDate(end);
  };

  return (
    <DatePicker
      locale={uk}
      // selected={startDate1}
      onChange={onChange}
      // minDate={new Date()}
      minDate={dayToday}
      maxDate={addMonths(new Date(), 5)}
      startDate={startDate1 ?? undefined}
      endDate={endDate ?? undefined}
      selectsRange
      inline
      showDisabledMonthNavigation
    />
  );
}
