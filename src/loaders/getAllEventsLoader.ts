import { EventsApi } from '@/redux/events/operations';
import { store } from '@/redux/store';

export const getAllEventsLoader = async () => {
  const result = await store.dispatch(
    EventsApi.endpoints.getAllEvents.initiate()
  );

  return result.data || null;
};
