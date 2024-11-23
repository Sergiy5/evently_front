import { useEffect, useState } from 'react';

import { useLazyGetAllEventsQuery } from '@/redux/events/operations';
import {
  addSelectedDates,
  addSelectedPrices,
  setIsCalendarShown,
} from '@/redux/filters/filtersSlice';
import { useAppDispatch } from '@/redux/hooks';

import { filterByPrice } from '@/helpers/filterByPrice';
import { useGetEventDateFilter } from '@/hooks/filters/useGetEventDateFilter';
import { useGetEventDatesRangeFilter } from '@/hooks/filters/useGetEventDatesRangeFilter';
import { useGetEventPriceFilter } from '@/hooks/filters/useGetEventPriceFilter';
import { useGetEventTypeFilter } from '@/hooks/filters/useGetEventTypeFilter';
import { useGetFilteredEventsByDate } from '@/hooks/filters/useGetFilteredEventsByDate';
import { useGetFilteredEventsByRange } from '@/hooks/filters/useGetFilteredEventsByRange';
import { useGetFilteredEventsByType } from '@/hooks/filters/useGetFilteredEventsByType';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FilterEvents } from '@/components/filters/FilterEvents';
import { Footer } from '@/components/footer/footer';
import { Main } from '@/components/main/Main';

interface AllEventsPageProps {}

const AllEventsPage: React.FC<AllEventsPageProps> = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [firstRender, setFirstRender] = useState(true);
  const [startRange, setStartRange] = useState<Date | undefined>(undefined);
  const [endRange, setEndRange] = useState<Date | undefined>(undefined);

  const dispatch = useAppDispatch();

  const [trigger, { data: events, isLoading }] = useLazyGetAllEventsQuery();

  const { addTypeFilter } = useGetEventTypeFilter();
  const { addDateFilter } = useGetEventDateFilter({});
  const { rangeDatesArray } = useGetEventDatesRangeFilter({
    startRange,
    endRange,
  });
  const { addPriceFilter } = useGetEventPriceFilter();

  const { filteredEventsByType } = useGetFilteredEventsByType({
    events,
  });
  const { filteredEventsByDate } = useGetFilteredEventsByDate({
    filteredEventsByType,
  });
  const { filteredEventsByRange, setFilteredEventsByRange } =
    useGetFilteredEventsByRange({
      filteredEventsByType,
      rangeDatesArray,
    });

  const filteredEventsByDateOrRange = () => {
    if (filteredEventsByDate.length > 0) {
      return filteredEventsByDate;
    }
    if (filteredEventsByRange.length > 0) {
      return filteredEventsByRange;
    } else {
      return [];
    }
  };

  const filterEvents = () => {
    filterByPrice({
      filteredEventsByDateOrRange,
      setFilteredEvents,
    });
  };

  const resetFilters = () => {
    addTypeFilter('Усі події');
    dispatch(addSelectedDates([]));
    setFilteredEventsByRange([]);
    dispatch(addSelectedPrices([]));
    setFirstRender(true);
    dispatch(setIsCalendarShown(false));
  };

  const getRangeDates = (start: Date, end: Date | undefined) => {
    setStartRange(start);
    setEndRange(end);
  };

  useEffect(() => {
    if (events && firstRender) {
      setFilteredEvents(events);
      setFirstRender(false);
    }
  }, [events, firstRender]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Main className="flex flex-col gap-16 mt-4">
      <div className="flex gap-[24px]">
        <FilterEvents
          filterEvents={filterEvents}
          addTypeFilter={addTypeFilter}
          resetFilters={resetFilters}
          addDateFilter={addDateFilter}
          addPriceFilter={addPriceFilter}
          getRangeDates={getRangeDates}
        />
        {isLoading && <div>loading</div>}
        {filteredEvents.length > 0 && !isLoading ? (
          <AllEvents events={filteredEvents} title={false} />
        ) : (
          <span>Нічого не знайдено</span>
        )}
      </div>
      <Footer />
    </Main>
  );
};

export default AllEventsPage;
