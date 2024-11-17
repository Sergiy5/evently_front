import { useEffect, useState } from 'react';

import { useGetAllEventsQuery } from '@/redux/events/operations';

import { filterByPrice } from '@/helpers/filterByPrice';
import { useGetEventDateFilter } from '@/hooks/useGetEventDateFilter';
import { useGetEventPriceFilter } from '@/hooks/useGetEventPriceFilter';
import { useGetEventTypeFilter } from '@/hooks/useGetEventTypeFilter';
import { useGetFilteredEventsByDate } from '@/hooks/useGetFilteredEventsByDate';
import { useGetFilteredEventsByType } from '@/hooks/useGetFilteredEventsByType';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FilterEvents } from '@/components/filters/FilterEvents';
import { Footer } from '@/components/footer/footer';
import { Main } from '@/components/main/Main';

interface AllEventsPageProps {}

const AllEventsPage: React.FC<AllEventsPageProps> = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [firstRender, setFirstRender] = useState(true);

  const { data: events } = useGetAllEventsQuery();
  const { addTypeFilter, selectedTypes } = useGetEventTypeFilter();
  const { addDateFilter, selectedDates, setSelectedDates } =
    useGetEventDateFilter();
  const { addPriceFilter, selectedPrices, setSelectedPrices } =
    useGetEventPriceFilter();
  const { filteredEventsByType } = useGetFilteredEventsByType({
    events,
    selectedTypes,
  });
  const { filteredEventsByDate } = useGetFilteredEventsByDate({
    filteredEventsByType,
    selectedDates,
  });

  const filterEvents = () => {
    filterByPrice({ selectedPrices, filteredEventsByDate, setFilteredEvents });
  };

  const resetFilters = () => {
    addTypeFilter('Усі події');
    setSelectedDates([]);
    setSelectedPrices([]);
    setFirstRender(true);
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

  return (
    <Main className="flex flex-col gap-16">
      <div className="flex gap-[24px] pt-[8px]">
        <FilterEvents
          filterEvents={filterEvents}
          addTypeFilter={addTypeFilter}
          selectedTypes={selectedTypes}
          resetFilters={resetFilters}
          addDateFilter={addDateFilter}
          selectedDates={selectedDates}
          addPriceFilter={addPriceFilter}
          selectedPrices={selectedPrices}
        />
        {filteredEvents.length > 0 ? (
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
