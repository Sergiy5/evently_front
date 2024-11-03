import { createSlice } from '@reduxjs/toolkit';

import { fetchLikedEvents } from './operations';

const initialState = {
  likedEvents: [] as Event[],
  error: null as any,
  isLoading: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    deleteLikedEvents(state) {
      state.likedEvents = [];
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchLikedEvents.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchLikedEvents.fulfilled, (state, action) => {
        if (!action.payload) {
          state.error = true;
          state.isLoading = false;
          return;
        }
        state.likedEvents = action.payload || [];
        state.isLoading = false;
      })
      .addCase(fetchLikedEvents.rejected, (state, action) => {
        console.log('err');
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const eventsReducer = eventsSlice.reducer;

export const { deleteLikedEvents } = eventsSlice.actions;
