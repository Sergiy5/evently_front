import { Dispatch, SetStateAction } from 'react';

interface filterByPriceProps {
  selectedPrices: number[];
  filteredEventsByType: Event[];
  setFilteredEvents: Dispatch<SetStateAction<Event[] | []>>;
}

export const filterByPrice = ({
  selectedPrices,
  filteredEventsByType,
  setFilteredEvents,
}: filterByPriceProps) => {
  if (selectedPrices.length === 0) setFilteredEvents(filteredEventsByType);
  if (selectedPrices.length === 3) return;
  // 0
  if (selectedPrices.length === 1 && selectedPrices.includes(0)) {
    const newArray = filteredEventsByType.filter(item => item.price === 0);
    setFilteredEvents(newArray);
  }
  // >0 && <=500
  if (selectedPrices.length === 1 && selectedPrices.includes(500)) {
    const newArray = filteredEventsByType.filter(
      item => item.price > 0 && item.price <= 500
    );
    setFilteredEvents(newArray);
  }
  // 500-1000
  if (selectedPrices.length === 1 && selectedPrices.includes(1000)) {
    const newArray = filteredEventsByType.filter(
      item => item.price > 500 && item.price <= 1000
    );
    setFilteredEvents(newArray);
  }
  // 0-500
  if (
    selectedPrices.length === 2 &&
    selectedPrices.includes(0) &&
    selectedPrices.includes(500)
  ) {
    const newArray = filteredEventsByType.filter(
      item => item.price >= 0 && item.price <= 500
    );
    setFilteredEvents(newArray);
  }
  // >500-1000
  if (
    selectedPrices.length === 2 &&
    selectedPrices.includes(500) &&
    selectedPrices.includes(1000)
  ) {
    const newArray = filteredEventsByType.filter(
      item => item.price > 500 && item.price <= 1000
    );
    setFilteredEvents(newArray);
  }
  // 0 && 500-1000
  if (
    selectedPrices.length === 2 &&
    selectedPrices.includes(0) &&
    selectedPrices.includes(1000)
  ) {
    const newArray = filteredEventsByType.filter(
      item => item.price === 0 || (item.price >= 500 && item.price <= 1000)
    );
    setFilteredEvents(newArray);
  }
};