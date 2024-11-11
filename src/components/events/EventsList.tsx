import EventCard from './EventCard';

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
