import { Container } from '../container/Container';
import { ListEvents } from '../listEvents/ListEvents';
import ScrollUp from './ScrollUp';

interface AllEventsProps {
  events: Event[];
}

export const AllEvents: React.FC<AllEventsProps> = ({ events }) => {
  return (
    <Container className={`flex flex-col gap-8`}>
      <h1>Усі події</h1>
      <ListEvents events={events} />
      <ScrollUp />
    </Container>
  );
};
