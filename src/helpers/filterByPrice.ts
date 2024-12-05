interface filterByPriceProps {
  filteredEventsByDateOrRange: () => Event[];
  selectedPrices: number[];
}

export const filterByPrice = ({
  filteredEventsByDateOrRange,
  selectedPrices,
}: filterByPriceProps) => {
  if (selectedPrices.length === 0 || selectedPrices.length === 3) {
    return filteredEventsByDateOrRange;
  }
  // 0
  if (selectedPrices.length === 1 && selectedPrices.includes(0)) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price === 0
    );
    return newArray;
  }
  // 1-500
  if (selectedPrices.length === 1 && selectedPrices.includes(500)) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price > 0 && item.price <= 500
    );
    return newArray;
  }
  // 500-1000
  if (selectedPrices.length === 1 && selectedPrices.includes(1000)) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price >= 500 && item.price <= 1000
    );
    return newArray;
  }
  // 0-500
  if (
    selectedPrices.length === 2 &&
    selectedPrices.includes(0) &&
    selectedPrices.includes(500)
  ) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price >= 0 && item.price <= 500
    );
    return newArray;
  }
  // 1-1000
  if (
    selectedPrices.length === 2 &&
    selectedPrices.includes(500) &&
    selectedPrices.includes(1000)
  ) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price > 0 && item.price <= 1000
    );
    return newArray;
  }
  // 0 && 501-1000
  if (
    selectedPrices.length === 2 &&
    selectedPrices.includes(0) &&
    selectedPrices.includes(1000)
  ) {
    const newArray = filteredEventsByDateOrRange().filter(
      item => item.price === 0 || (item.price > 500 && item.price <= 1000)
    );
    return newArray;
  }
  return [];
};
