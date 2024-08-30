export interface RootState {
  auth: {
    isLoggedIn: boolean;
    user: any; // or define a type for user
    isRefreshing: boolean;
    error: any; // or define a type for error
    token: string;
    theme: string;
    currentDate: Date;
  };
}

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectError = (state: RootState) => state.auth.error;
export const selectToken = (state: RootState) => state.auth.token;
export const selectTheme = (state: RootState) => state.auth.theme;
export const selectCurrentDate = (state: RootState) => state.auth.currentDate;
