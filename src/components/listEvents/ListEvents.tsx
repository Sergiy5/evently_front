import { nanoid } from "@reduxjs/toolkit";
import { EventCard } from '../ui';
interface ListEventsProps {
  events: number;
}
export const ListEvents: React.FC<ListEventsProps> = ({ events }) => {
  const arrayEvents = [...Array(events)];

  return (
    <div className={`flex flex-wrap justify-between gap-6 w-full h-auto`}>
      {arrayEvents.map(() => (
       <div key={nanoid()}>
           <EventCard event={{}} />
              
       </div>
      ))}
    </div>
  );
};
