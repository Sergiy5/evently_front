import EventCard from './EventCard';
import { eventType } from './types';
interface props {
  events: eventType[];
}

const EventsList: React.FC<props> = ({ events }) => {
  return (
    <ul>
      {events.map((event: eventType) => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
};

export default EventsList;
