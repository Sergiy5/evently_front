import { nanoid } from "@reduxjs/toolkit";
import { EventCard } from '../ui';
import { IEvent } from "@/types/components";
interface ListEventsProps {
  events: IEvent[];
}
export const ListEvents: React.FC<ListEventsProps> = ({ events }) => {
  console.log(events);


  return (
    <ul className={`flex flex-wrap justify-between gap-6 w-full h-auto`}>
      {events.map(event => (
          <EventCard key={nanoid()} event={ event } />
      ))}
    </ul>
  );
};
