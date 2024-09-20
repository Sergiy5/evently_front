import { Container } from '@/components/Container';
import { ListEvents } from './ListEvents';

interface TopEvents {
  events: number;
}
export const TopEvents: React.FC<TopEvents> = ({ events }) => {
  return (
    <Container className={`flex flex-col gap-8`}>
      <h1>Топ подій</h1>
      <ListEvents events={events} />
    </Container>
  );
};
