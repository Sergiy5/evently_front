import { createSlice } from '@reduxjs/toolkit';
import { likedEvents } from './operations';

const initialState = {
  likedEvents: [] as Event[],
  likedEventsCount: 0,
  error: null as any,
  isLoading: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(likedEvents.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(likedEvents.fulfilled, (state, action) => {
        if (!action.payload) {
          state.error = true;
          state.isLoading = false;
          return;
        }
        state.likedEvents = action.payload || [];
        state.isLoading = false;
      })
      .addCase(likedEvents.rejected, (state, action) => {
        console.log('err');
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const eventsReducer = eventsSlice.reducer;
