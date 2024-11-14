import { ListEvents } from '../listEvents/ListEvents';

interface AllEventsProps {
  events: Event[];
  selectedTypes: string[];
}

export const AllEvents: React.FC<AllEventsProps> = ({
  events,
  selectedTypes,
}) => {
  return (
    <div className={`flex flex-col gap-8`}>
      <h1>Усі події</h1>
      <ListEvents events={events} />
    </div>
  );
};
