import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import { UnknownAction } from 'redux';
import {
  register,
  logIn,
  logOut,
  updateUser,
  refreshUser,
} from '@/redux/auth/operations';

export interface GoogleLoginResponse {
  name: string | null;
  email: string | null;
  token: string | null;
}

export interface User {
  userId: number | null;
  name: string | null;
  email: string | null;
}
export interface UserLoggingFulfilled {
  user: User;
  token: null | string;
}

const STATUS = {
  FULFILLED: 'fulfilled',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

const actionGenerators = [register, logIn];

const getActionGeneratorsWithType: (status: string) => any[] = status =>
  actionGenerators.map(generator => (generator as any)[status]);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null as null | number,
    user: {} as User,
    token: null as null | string,
    // theme: 'light',
    currentDate: Date.now(),
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },

  reducers: {
    // setTheme(state, action) {
    //   state.theme = action.payload;
    // },
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
    googleLogin(state, action: PayloadAction<GoogleLoginResponse>) {
      const { name, email, token } = action.payload;
      state.user = { name, email, userId: null };
      state.token = token;
      state.isLoggedIn = true;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(refreshUser.pending, handleRefreshUserPending)
      .addCase(refreshUser.fulfilled, handleRefreshUserFulfilled)
      .addCase(updateUser.fulfilled, handleUpdateUserFulfilled)
      .addCase(logOut.fulfilled, handleLogOut)
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.FULFILLED)),
        handleUserLoggingFulfilled
      )
      .addMatcher(
        isAnyOf(
          ...getActionGeneratorsWithType(STATUS.REJECTED),
          updateUser.rejected,
          refreshUser.rejected
        ),
        handleUserRejected
      );
  },
});

function handleUserLoggingFulfilled(
  state: any,
  action: any
): void {  
  // state.user = action.payload.user;
  state.token = action.payload.accessToken;
  state.user.userId = action.payload.userId;
  state.user.name = action.payload.userName;
  state.isLoggedIn = true;
  state.error = null;
}

function handleUpdateUserFulfilled(state: any, action: UnknownAction): void {
  state.user = action.payload;
  state.error = null;
}

function handleLogOut(state: any): void {
  state.user = {
    name: null,
    email: null,
    avatarURL: null,
  };
  state.token = null;
  state.isLoggedIn = false;
  state.error = null;
}
function handleRefreshUserPending(state: any): void {
  state.isRefreshing = true;
  state.error = null;
}

function handleRefreshUserFulfilled(state: any, action: UnknownAction): void {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
  state.error = null;
}

interface State {
  isRefreshing: boolean;
  error: any;
}
function handleUserRejected(state: State, action: any): void {
  state.isRefreshing = false;
  state.error = action.payload;
}

export const {
  // setTheme,
  setCurrentDate,
  googleLogin,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
