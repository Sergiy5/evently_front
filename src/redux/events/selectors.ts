import { RootState } from '../store';

export const getLikedEvents = (state: RootState) => state.events.likedEvents;
