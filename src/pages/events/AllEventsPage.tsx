import { useEffect, useState } from 'react';

import { useLazyGetAllEventsQuery } from '@/redux/events/operations';
import {
  addRangeDatesArray,
  addSelectedPrices,
} from '@/redux/filter/FilterSlice';
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
  const [showCalendar, setShowCalendar] = useState(false);

  const dispatch = useAppDispatch();
  console.log(startRange, endRange);

  const [trigger, { data: events, isLoading }] = useLazyGetAllEventsQuery();

  const { addTypeFilter, selectedTypesLS } = useGetEventTypeFilter();
  const { addDateFilter, selectedDatesLS, setSelectedDates } =
    useGetEventDateFilter({ showCalendar, setShowCalendar });
  const { addPriceFilter, selectedPrices, setSelectedPrices } =
    useGetEventPriceFilter();
  const { rangeDatesArray } = useGetEventDatesRangeFilter({
    showCalendar,
    startRange,
    endRange,
  });

  const { filteredEventsByType } = useGetFilteredEventsByType({
    events,
    selectedTypesLS,
  });
  const { filteredEventsByDate } = useGetFilteredEventsByDate({
    filteredEventsByType,
    selectedDatesLS,
    showCalendar,
  });
  const { filteredEventsByRange, setFilteredEventsByRange } =
    useGetFilteredEventsByRange({
      filteredEventsByType,
      showCalendar,
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
      selectedPrices,
      filteredEventsByDateOrRange,
      setFilteredEvents,
    });
  };

  const resetFilters = () => {
    addTypeFilter('Усі події');
    setSelectedDates([]);
    setFilteredEventsByRange([]);
    setSelectedPrices([]);
    setFirstRender(true);
    setShowCalendar(false);
  };

  const getRangeDates = (start: Date, end: Date | undefined) => {
    setStartRange(start);
    setEndRange(end);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
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
    dispatch(addSelectedPrices(selectedPrices));
  }, [selectedPrices, rangeDatesArray, dispatch]);

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
          selectedPrices={selectedPrices}
          getRangeDates={getRangeDates}
          toggleCalendar={toggleCalendar}
          showCalendar={showCalendar}
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
