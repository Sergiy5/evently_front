import { useGetEventDateFilter } from './useGetEventDateFilter';
import { useGetEventDatesRangeFilter } from './useGetEventDatesRangeFilter';
import { useGetEventPriceFilter } from './useGetEventPriceFilter';
import { useGetEventTypeFilter } from './useGetEventTypeFilter';
import { useGetFilteredEventsByDate } from './useGetFilteredEventsByDate';
import { useGetFilteredEventsByRange } from './useGetFilteredEventsByRange';
import { useGetFilteredEventsByType } from './useGetFilteredEventsByType';

interface useFilterProps {
  events: Event[] | undefined;
}
export function useFilter({ events }: useFilterProps) {
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

  return {
    addTypeFilter,
    addDateFilter,
    addPriceFilter,
    selectedPrices,
    filteredEventsByDate,
    filteredEventsByRange,
    setFilteredEventsByRange,
  };
}
