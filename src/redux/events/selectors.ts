import { RootState } from '../store';

export const getALlEvents = (state: RootState) => state.events.AllEvents;
export const getLikedEvents = (state: RootState) => state.events.likedEvents;
