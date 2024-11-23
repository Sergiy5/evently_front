import { RootState } from '../store';

export const getSelectedTypes = (state: RootState) =>
  state.filter.selectedTypes;
export const getSelectedDates = (state: RootState) =>
  state.filter.selectedDates;
export const getRangeDatesArray = (state: RootState) =>
  state.filter.rangeDatesArray;
export const getSelectedPrices = (state: RootState) =>
  state.filter.selectedPrices;
