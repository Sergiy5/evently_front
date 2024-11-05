import { useEffect, useState } from 'react';

import { nanoid } from '@reduxjs/toolkit';

import { EventCard } from '../ui';
import { ShowAllButton } from '../ui/ShowAllButton';

interface ListEventsProps {
  events: Event[];
}

export const ListEvents: React.FC<ListEventsProps> = ({ events }) => {
  // TODO navigate to all events
  const [paginatedEvents, setPaginatedEvents] = useState<[] | Event[]>([]);
  const PAGINATION = 16;
  const showAll = () => {
    const secondPart = events?.slice(PAGINATION);
    if (secondPart) {
      setPaginatedEvents(prevState => [...prevState, ...secondPart]);
    }
  };
  const isAllCardsShown = events?.length === paginatedEvents.length;
  useEffect(() => {
    if (events) {
      setPaginatedEvents(events.slice(0, PAGINATION));
    }
  }, [events]);

  return (
    <>
      <ul className={`flex flex-wrap justify-start gap-6 w-full h-auto`}>
        {paginatedEvents?.map(event => (
          <EventCard key={nanoid()} event={event} />
        ))}
      </ul>
      {!isAllCardsShown && <ShowAllButton onClick={showAll} />}
    </>
  );
};
