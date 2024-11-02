import { nanoid } from '@reduxjs/toolkit';
import { EventCard } from '../ui';

interface ListEventsProps {
  events: Event[] | undefined;
}

export const ListEvents: React.FC<ListEventsProps> = ({ events }) => {
  return (
    <ul className={`flex flex-wrap justify-start gap-6 w-full h-auto`}>
      {events?.map(event => <EventCard key={nanoid()} event={event} />)}
    </ul>
  );
};
