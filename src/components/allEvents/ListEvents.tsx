import { nanoid } from '@reduxjs/toolkit';

import { EventCard } from './EventCard';

interface ListEventsProps {
  events: Event[];
}

export const ListEvents: React.FC<ListEventsProps> = ({ events }) => {
  return (
    <div className={`flex flex-wrap justify-start gap-6`}>
      {events.map(event => (
        <EventCard key={nanoid()} event={event} />
      ))}
    </div>
  );
};
