import { Container } from '../container/Container';
import { ListEvents } from '../listEvents/ListEvents';

interface AllEventsProps {
  events: Event[];
}

export const AllEvents: React.FC<AllEventsProps> = ({ events }) => {
  const filteredEvents = events.filter(item => item.category !== 'TOP_EVENTS');

  return (
    <Container className={`flex flex-col gap-8`}>
      <h1>Усі події</h1>
      <ListEvents events={filteredEvents} />
    </Container>
  );
};
