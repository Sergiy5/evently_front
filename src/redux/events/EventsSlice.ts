import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [] as Event[],
};

const EventsSlice = createSlice({
  name: 'events',
  initialState: initialState,
  reducers: {
    addAllEvents(state, action: { payload: Event[] }) {
      state.events = action.payload;
    },
  },
});

export const eventsReducer = EventsSlice.reducer;

export const { addAllEvents } = EventsSlice.actions;
