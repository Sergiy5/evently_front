import { useEffect, useState } from 'react';

interface useGetFilteredEventsByTypeProps {
  events: Event[] | undefined;
  selectedTypes: string[];
}

export function useGetFilteredEventsByType({
  events,
  selectedTypes,
}: useGetFilteredEventsByTypeProps) {
  const [filteredEventsByType, setFilteredEventsByType] = useState<Event[]>([]);

  const allEventsFilter = selectedTypes.includes('Усі події');
  const topEventsFilterOnly =
    selectedTypes.includes('Популярні') && selectedTypes.length === 1;
  const topEventsFilter = selectedTypes.includes('Популярні');

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
        selectedTypes.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
      return;
    }
    // other categories with top
    if (events && topEventsFilter) {
      const filteredArray = events.filter(
        item =>
          item.category === 'TOP_EVENTS' && selectedTypes.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
      return;
    }
  }, [
    events,
    allEventsFilter,
    selectedTypes,
    topEventsFilter,
    topEventsFilterOnly,
  ]);

  return { filteredEventsByType };
}
