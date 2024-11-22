import { useEffect, useState } from 'react';

interface useGetFilteredEventsByTypeProps {
  events: Event[] | undefined;
  selectedTypesLS: string[];
}

export function useGetFilteredEventsByType({
  events,
  selectedTypesLS,
}: useGetFilteredEventsByTypeProps) {
  const [filteredEventsByType, setFilteredEventsByType] = useState<Event[]>([]);

  const allEventsFilter = selectedTypesLS.includes('Усі події');
  const topEventsFilterOnly =
    selectedTypesLS.includes('Популярні') && selectedTypesLS.length === 1;
  const topEventsFilter = selectedTypesLS.includes('Популярні');

  useEffect(() => {
    // only all events
    if (events && allEventsFilter) {
      setFilteredEventsByType(events);
      return;
    }
    // only top events
    if (events && topEventsFilterOnly) {
      const filteredArray = events.filter(
        item => item.category === 'TOP_EVENTS'
      );
      setFilteredEventsByType(filteredArray);
      return;
    }
    // other categories without top
    if (events && !topEventsFilter) {
      const filteredArray = events.filter(item =>
        selectedTypesLS.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
      return;
    }
    // other categories with top
    if (events && topEventsFilter) {
      const filteredArray = events.filter(
        item =>
          item.category === 'TOP_EVENTS' && selectedTypesLS.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
      return;
    }
  }, [
    events,
    allEventsFilter,
    selectedTypesLS,
    topEventsFilter,
    topEventsFilterOnly,
  ]);

  return { filteredEventsByType };
}
