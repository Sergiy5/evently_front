import { useEffect, useState } from 'react';

import { useGetAllEventsQuery } from '@/redux/events/operations';

import { filterByPrice } from '@/helpers/filterByPrice';
import { useGetEventDateFilter } from '@/hooks/useGetEventDateFilter';
import { useGetEventPriceFilter } from '@/hooks/useGetEventPriceFilter';
import { useGetEventTypeFilter } from '@/hooks/useGetEventTypeFilter';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FilterEvents } from '@/components/filters/FilterEvents';
import { Footer } from '@/components/footer/footer';
import { Main } from '@/components/main/Main';

interface AllEventsPageProps {}

const AllEventsPage: React.FC<AllEventsPageProps> = () => {
  const [filteredEventsByType, setFilteredEventsByType] = useState<
    Event[] | []
  >([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[] | []>([]);
  const [firstRender, setFirstRender] = useState(true);

  const { data: events } = useGetAllEventsQuery();
  const { addTypeFilter, selectedTypes } = useGetEventTypeFilter();
  const { addDateFilter, selectedDates, setSelectedDates } =
    useGetEventDateFilter();
  const { addPriceFilter, selectedPrices, setSelectedPrices } =
    useGetEventPriceFilter();

  console.log(filteredEventsByType);

  const allEventsFilter = selectedTypes[0] === 'Усі події';

  const filterEvents = () => {
    filterByPrice({ selectedPrices, filteredEventsByType, setFilteredEvents });
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
    if (events && allEventsFilter) {
      setFilteredEventsByType(events);
    }
    if (events && !allEventsFilter) {
      const filteredArray = events.filter(item =>
        selectedTypes.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
    }
  }, [events, allEventsFilter, selectedTypes]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Main className="flex flex-col gap-16">
      <div className="flex gap-[24px]">
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
        {filteredEvents && <AllEvents events={filteredEvents} title={false} />}
      </div>
      <Footer />
    </Main>
  );
};

export default AllEventsPage;
