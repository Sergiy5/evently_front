import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { resetAllFilters } from '@/redux/filters/filtersSlice';
import { useAppDispatch } from '@/redux/hooks';

export function useResetAllFiltersAfterRouting() {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname !== '/all_events') {
      dispatch(resetAllFilters());
    }
  }, [dispatch, pathname]);
}
