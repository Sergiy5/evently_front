import { Link } from 'react-router-dom';

interface props {
  event: Event;
}

const EventCard: React.FC<props> = ({ event }) => {
  return <Link to={`${event.id}`}>{event.title}</Link>;
};

export default EventCard;
