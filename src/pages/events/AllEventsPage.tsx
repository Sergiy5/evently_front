import { useEffect, useState } from 'react';

import { useLazyGetAllEventsQuery } from '@/redux/events/operations';
import {
  resetAllFilters,
  setFilteredEventsId,
} from '@/redux/filters/filtersSlice';
import { getFilteredEventsId } from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { filterByPrice } from '@/helpers/filterByPrice';
import { useFilter } from '@/hooks/filters/useFilter';
import { useScrollToTop } from '@/hooks/useScrollToTop';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FilterEvents } from '@/components/filters/FilterEvents';
import { Footer } from '@/components/footer/footer';
import { Main } from '@/components/main/Main';

const AllEventsPage: React.FC = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const dispatch = useAppDispatch();

  const filteredEventsId = useAppSelector(getFilteredEventsId);

  const [trigger, { data: events, isLoading }] = useLazyGetAllEventsQuery();

  const {
    addTypeFilter,
    addDateFilter,
    addPriceFilter,
    selectedPrices,
    filteredEventsByDate,
    filteredEventsByRange,
  } = useFilter({ events });

  const filteredEventsByDateOrRange = () => {
    if (filteredEventsByDate.length > 0) return filteredEventsByDate;
    if (filteredEventsByRange.length > 0) return filteredEventsByRange;
    return [];
  };

  const filteredEventsByDateOrRangeResult = filteredEventsByDateOrRange();

  const filterEvents = () => {
    const filteredEvents = filterByPrice({
      selectedPrices,
      filteredEventsByDateOrRangeResult,
    });
    dispatch(setFilteredEventsId(filteredEvents.map(item => item.id)));
  };

  const resetFilters = () => {
    if (events) {
      dispatch(resetAllFilters());
      dispatch(setFilteredEventsId(events.map(item => item.id)));
    }
  };

  useEffect(() => {
    if (events && events.length > 0) {
      setFilteredEvents(
        events.filter(item => filteredEventsId.includes(item.id))
      );
    }
  }, [events, filteredEventsId]);

  useScrollToTop();

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Main className="flex flex-col gap-16">
      <div className="flex gap-[24px]">
        <FilterEvents
          filterEvents={filterEvents}
          addTypeFilter={addTypeFilter}
          resetFilters={resetFilters}
          addDateFilter={addDateFilter}
          addPriceFilter={addPriceFilter}
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
