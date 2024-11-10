import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  AllEvents: [] as Event[],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setAllEvents(state, action: { payload: Event[] }) {
      state.AllEvents = action.payload;
    },
  },
});

export const eventsReducer = eventsSlice.reducer;

export const { setAllEvents } = eventsSlice.actions;
