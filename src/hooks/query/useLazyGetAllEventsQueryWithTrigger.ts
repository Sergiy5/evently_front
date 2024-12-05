import { useEffect } from 'react';

import { useLazyGetAllEventsQuery } from '@/redux/events/operations';

export function useLazyGetAllEventsQueryWithTrigger() {
  const [trigger, { data: events, isLoading }] = useLazyGetAllEventsQuery();

  useEffect(() => {
    trigger();
  }, [trigger]);

  return { events, isLoading };
}
