import { Link } from 'react-router-dom';
import { eventType } from './types';

interface props {
  event: eventType;
}

const EventCard: React.FC<props> = ({ event }) => {
  return <Link to={`${event.id}`}>{event.name}</Link>;
};

export default EventCard;
