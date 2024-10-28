import { IEvent } from '@/types/components';
import { Container } from '../container/Container';
import { ListEvents } from '../listEvents/ListEvents';
import { useEffect } from 'react';
// import { events } from '@/assets/fakeData/events';

interface AllEventsprops {
  events: IEvent[] | undefined
}
export const AllEvents: React.FC<AllEventsprops> = ({events}) => {
  useEffect(() => {
      console.log(events)
  })
  return (
    <Container className={`flex flex-col gap-8`}>
      <h1>Усі події</h1>
      <div className="flex flex-col gap-4"></div>
      <ListEvents events={events} />
    </Container>
  );
};
