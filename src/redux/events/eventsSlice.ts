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
    addLikedEvent(state, action: { payload: Event }) {
      state.likedEvents = [...state.likedEvents, action.payload];
    },
    deleteLikedEvent(state, action: { payload: string }) {
      state.likedEvents = state.likedEvents.filter(item => {
        return item.id !== action.payload;
      });
    },
    deleteAllLikedEvents(state) {
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

export const { addLikedEvent, deleteLikedEvent, deleteAllLikedEvents } =
  eventsSlice.actions;
