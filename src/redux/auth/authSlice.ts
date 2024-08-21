import {createSlice, isAnyOf } from '@reduxjs/toolkit';
import { UnknownAction } from 'redux';
import {
  register,
  logIn,
  logOut,
  updateUser,
  refreshUser,
} from '@/redux/auth/operations';

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
    user: {
      name: null,
      email: null,
      birthday: null,
      phone: null,
      skype: null,
      avatarURL: null,
    },
    token: null,
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

function handleUserLoggingFulfilled(state: any, action: any): void {
  state.user = action.payload.user;
  state.token = action.payload.token;
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
    birthday: null,
    phone: null,
    skype: null,
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
  setCurrentDate } = authSlice.actions;
export const authReducer = authSlice.reducer;
