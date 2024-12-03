import { useEffect, useState } from 'react';

import { useLazyGetAllEventsQuery } from '@/redux/events/operations';
import {
  addSelectedDates,
  addSelectedPrices,
  setFilteredEventsId,
  setFilterWithHeaderNav,
  setFirstSearch,
  setIsCalendarShown,
} from '@/redux/filters/filtersSlice';
import { getFilteredEventsId, getFilterWithHeaderNav, getFirstSearch, getSelectedTypes } from '@/redux/filters/selectors';
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
import { useScrollToTop } from '@/hooks/useScrollToTop';

const AllEventsPage: React.FC = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [firstRender, setFirstRender] = useState(true);
  console.log(filteredEvents);

  const dispatch = useAppDispatch();

  const firstSearch = useAppSelector(getFirstSearch);
  const filteredEventsId = useAppSelector(getFilteredEventsId);
  const isFilterWithHeaderNav = useAppSelector(getFilterWithHeaderNav);
  const selectedTypes = useAppSelector(getSelectedTypes);

  const [trigger, { data: events, isLoading }] = useLazyGetAllEventsQuery();

  const { addTypeFilter } = useGetEventTypeFilter();
  const { addDateFilter } = useGetEventDateFilter();
  const { rangeDatesArray } = useGetEventDatesRangeFilter();
  const { addPriceFilter, selectedPrices } = useGetEventPriceFilter();

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
    if (filteredEventsByDate.length > 0) return filteredEventsByDate;
    if (filteredEventsByRange.length > 0) return filteredEventsByRange;
    return [];
  };

  const filterEvents = () => {
    setFilteredEvents(
      filterByPrice({
        selectedPrices,
        filteredEventsByDateOrRange,
      })
    );
    dispatch(setFirstSearch(false));
    dispatch(setFilterWithHeaderNav(false));
  };

  const resetFilters = () => {
    addTypeFilter('Усі події');
    dispatch(addSelectedDates([]));
    setFilteredEventsByRange([]);
    dispatch(addSelectedPrices([]));
    setFirstRender(true);
    dispatch(setIsCalendarShown(false));
    dispatch(setFirstSearch(true));
    dispatch(setFilterWithHeaderNav(false));
  };

  useEffect(() => {
    if (events && isFilterWithHeaderNav) {
      if (selectedTypes.includes('Популярні')) {
        setFilteredEvents(events.filter(
          item => item.category === 'TOP_EVENTS'
        ));
      }
      if (selectedTypes.includes('Усі події')) {
        setFilteredEvents(events);
      } else {
        setFilteredEvents(events.filter(
          item => item.type === selectedTypes[0]
        ));
      };
    };
    dispatch(setFirstSearch(false));
    setFirstRender(false);
  }, [dispatch, events, isFilterWithHeaderNav, selectedTypes]);

  useEffect(() => {
    if (!firstRender)
      dispatch(setFilteredEventsId(filteredEvents.map(item => item.id)));
  }, [dispatch, filteredEvents, firstRender]);

  useEffect(() => {
    if (events && firstSearch && firstRender) {
      setFilteredEvents(events);
      setFirstRender(false);
    }
    if (events && !firstSearch && firstRender) {
      setFilteredEvents(
        events.filter(item => filteredEventsId.includes(item.id))
      );
      setFirstRender(false);
    }
  }, [events, filteredEventsId, firstRender, firstSearch]);

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
