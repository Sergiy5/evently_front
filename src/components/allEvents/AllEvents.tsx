import { Container } from '../container/Container';
import { ListEvents } from '../listEvents/ListEvents';

interface AllEventsProps {
  events?: Event[];
}

export const AllEvents: React.FC<AllEventsProps> = ({ events }) => {
  return (
    <Container className={`flex flex-col gap-8`}>
      <h1>Усі події</h1>
      <div className="flex flex-col gap-4"></div>
      <ListEvents events={events} />
    </Container>
  );
};
