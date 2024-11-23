import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTypes: [] as string[],
  selectedDates: [] as string[],
  rangeDatesArray: [] as string[],
  selectedPrices: [] as number[],
  isCalendarShown: false,
};

const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addSelectedTypes(state, action: { payload: string[] }) {
      state.selectedTypes = action.payload;
    },
    addSelectedDates(state, action: { payload: string[] }) {
      state.selectedDates = action.payload;
    },
    addRangeDatesArray(state, action: { payload: string[] }) {
      state.rangeDatesArray = action.payload;
    },
    addSelectedPrices(state, action: { payload: number[] }) {
      state.selectedPrices = action.payload;
    },
    setIsCalendarShown(state, action: { payload: boolean }) {
      state.isCalendarShown = action.payload;
    },
  },
});

export const filterReducer = filtersSlice.reducer;

export const {
  addRangeDatesArray,
  addSelectedDates,
  addSelectedPrices,
  addSelectedTypes,
  setIsCalendarShown,
} = filtersSlice.actions;
