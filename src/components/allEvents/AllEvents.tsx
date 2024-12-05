import { ListEvents } from './ListEvents';

interface AllEventsProps {
  events: Event[];
  title: string | boolean;
}

export const AllEvents: React.FC<AllEventsProps> = ({ events, title }) => {
  return (
    <div className={`flex flex-col gap-8`}>
      {title && <h1>{title}</h1>}
      <ListEvents events={events} />
    </div>
  );
};
