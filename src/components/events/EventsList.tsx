import EventCard from './EventCard';

interface props {
  events: Event[];
}

const EventsList: React.FC<props> = ({ events }) => {
  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
};

export default EventsList;
