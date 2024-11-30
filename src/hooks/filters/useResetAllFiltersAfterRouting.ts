import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import { resetAllFilters } from '@/redux/filters/filtersSlice';
import { useAppDispatch } from '@/redux/hooks';

export function useResetAllFiltersAfterRouting() {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const isRouted = useRef(false);

  useEffect(() => {
    if (!isRouted.current && pathname !== '/all_events') {
      dispatch(resetAllFilters());
      isRouted.current = true;
    }
  }, [dispatch, pathname]);
}
