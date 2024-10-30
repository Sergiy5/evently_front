import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './operations';

export interface User {
  id: string;
  name: string;
  email: string;
  creationDate: Date;
  mailConfirmation: boolean;
  role: 'USER' | 'ADMIN';
  location: string;
  phone: string;
  status: 'ACTIVE' | 'BANNED';
}

export interface UsersInitialState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: unknown;
}

const initialState: UsersInitialState = {
  users: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const usersReducer = userSlice.reducer;
