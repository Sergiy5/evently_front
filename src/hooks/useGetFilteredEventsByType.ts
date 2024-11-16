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
    }
    // only top events
    if (events && topEventsFilterOnly) {
      const newArray = events.filter(item => item.category === 'TOP_EVENTS');
      setFilteredEventsByType(newArray);
    }
    // other categories without top
    if (events && !allEventsFilter && !topEventsFilter) {
      const filteredArray = events.filter(item =>
        selectedTypes.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
    }
    // other categories with top
    if (events && topEventsFilter) {
      const filteredArray = events.filter(
        item =>
          item.category === 'TOP_EVENTS' && selectedTypes.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
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
