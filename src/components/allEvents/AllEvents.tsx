import { Container } from '../container/Container';
import { ListEvents } from '../listEvents/ListEvents';
import { events } from '@/assets/fakeData/events';

interface AllEventsprops {}
export const AllEvents: React.FC<AllEventsprops> = () => {
  
  return (
    <Container className={`flex flex-col gap-8`}>
      <h1>Усі події</h1>
      <div className="flex flex-col gap-4"></div>
      <ListEvents events={events} />
    </Container>
  );
};
