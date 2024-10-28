import { RootState } from '../auth/selectors';

export const selectUsers = (state: RootState) => state.users.users;
