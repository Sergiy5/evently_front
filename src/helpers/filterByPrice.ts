import { Dispatch, SetStateAction } from 'react';

interface filterByPriceProps {
  selectedPricesLS: number[];
  filteredEventsByDateOrRange: () => Event[];
  setFilteredEvents: Dispatch<SetStateAction<Event[] | []>>;
}

export const filterByPrice = ({
  selectedPricesLS,
  filteredEventsByDateOrRange,
  setFilteredEvents,
}: filterByPriceProps) => {
  if (selectedPricesLS.length === 0)
    setFilteredEvents(filteredEventsByDateOrRange());
  if (selectedPricesLS.length === 3) return;
  // 0
  if (selectedPricesLS.length === 1 && selectedPricesLS.includes(0)) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price === 0
    );
    setFilteredEvents(newArray);
  }
  // 1-500
  if (selectedPricesLS.length === 1 && selectedPricesLS.includes(500)) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price > 0 && item.price <= 500
    );
    setFilteredEvents(newArray);
  }
  // 501-1000
  if (selectedPricesLS.length === 1 && selectedPricesLS.includes(1000)) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price > 500 && item.price <= 1000
    );
    setFilteredEvents(newArray);
  }
  // 0-500
  if (
    selectedPricesLS.length === 2 &&
    selectedPricesLS.includes(0) &&
    selectedPricesLS.includes(500)
  ) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price >= 0 && item.price <= 500
    );
    setFilteredEvents(newArray);
  }
  // 1-1000
  if (
    selectedPricesLS.length === 2 &&
    selectedPricesLS.includes(500) &&
    selectedPricesLS.includes(1000)
  ) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price > 0 && item.price <= 1000
    );
    setFilteredEvents(newArray);
  }
  // 0 && 501-1000
  if (
    selectedPricesLS.length === 2 &&
    selectedPricesLS.includes(0) &&
    selectedPricesLS.includes(1000)
  ) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price === 0 || (item.price > 500 && item.price <= 1000)
    );
    setFilteredEvents(newArray);
  }
};
