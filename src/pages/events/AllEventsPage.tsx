import { useEffect, useState } from 'react';

import { useLazyGetAllEventsQuery } from '@/redux/events/operations';
import {
  addRangeDatesArray,
  addSelectedDates,
  setIsCalendarShown,
} from '@/redux/filters/filtersSlice';
import { getIsCalendarShown } from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

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
  console.log(startRange, endRange);

  const isShownCalendar = useAppSelector(getIsCalendarShown);

  const [trigger, { data: events, isLoading }] = useLazyGetAllEventsQuery();

  const { addTypeFilter, selectedTypesLS } = useGetEventTypeFilter();
  const { addDateFilter, selectedDatesLS } = useGetEventDateFilter({});
  const { rangeDatesArray } = useGetEventDatesRangeFilter({
    startRange,
    endRange,
  });
  const { addPriceFilter, selectedPricesLS, setSelectedPrices } =
    useGetEventPriceFilter();

  const { filteredEventsByType } = useGetFilteredEventsByType({
    events,
    selectedTypesLS,
  });
  const { filteredEventsByDate } = useGetFilteredEventsByDate({
    filteredEventsByType,
    selectedDatesLS,
    isShownCalendar,
  });
  const { filteredEventsByRange, setFilteredEventsByRange } =
    useGetFilteredEventsByRange({
      filteredEventsByType,
      isShownCalendar,
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
      selectedPricesLS,
      filteredEventsByDateOrRange,
      setFilteredEvents,
    });
  };

  const resetFilters = () => {
    addTypeFilter('Усі події');
    dispatch(addSelectedDates([]));
    setFilteredEventsByRange([]);
    setSelectedPrices([]);
    setFirstRender(true);
    dispatch(setIsCalendarShown(false));
  };

  const getRangeDates = (start: Date, end: Date | undefined) => {
    setStartRange(start);
    setEndRange(end);
  };

  useEffect(() => {
    if (events && events.length > 0 && firstRender) {
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

  useEffect(() => {
    dispatch(addRangeDatesArray(rangeDatesArray));
  }, [rangeDatesArray, dispatch]);

  return (
    <Main className="flex flex-col gap-16 mt-4">
      <div className="flex gap-[24px]">
        <FilterEvents
          filterEvents={filterEvents}
          addTypeFilter={addTypeFilter}
          selectedTypesLS={selectedTypesLS}
          resetFilters={resetFilters}
          addDateFilter={addDateFilter}
          selectedDatesLS={selectedDatesLS}
          addPriceFilter={addPriceFilter}
          selectedPricesLS={selectedPricesLS}
          getRangeDates={getRangeDates}
          isShownCalendar={isShownCalendar}
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
