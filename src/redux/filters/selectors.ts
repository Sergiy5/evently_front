import { RootState } from '../store';

export const getSelectedTypes = (state: RootState) =>
  state.filter.selectedTypes;
export const getSelectedDates = (state: RootState) =>
  state.filter.selectedDates;
export const getRangeDatesArray = (state: RootState) =>
  state.filter.rangeDatesArray;
export const getSelectedPrices = (state: RootState) =>
  state.filter.selectedPrices;
export const getIsCalendarShown = (state: RootState) =>
  state.filter.isCalendarShown;
export const getStartDay = (state: RootState) => state.filter.startDate;
export const getEndDay = (state: RootState) => state.filter.endDate;
export const getFilteredEventsId = (state: RootState) =>
  state.filter.filteredEventsId;
export const getFirstSearch = (state: RootState) => state.filter.firstSearch;
export const getFilterWithHeaderNav = (state: RootState) => state.filter.filterWithHeaderNav;
