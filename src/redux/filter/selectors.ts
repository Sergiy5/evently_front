import { RootState } from '../store';

export const getSelectedTypes = (state: RootState) =>
  state.filters.selectedTypes;
export const getSelectedDates = (state: RootState) =>
  state.filters.selectedDates;
export const getRangeDatesArray = (state: RootState) =>
  state.filters.rangeDatesArray;
export const getSelectedPrices = (state: RootState) =>
  state.filters.selectedPrices;
