import { nanoid } from '@reduxjs/toolkit';

import { EventCard } from '../../ui';

interface IProps {
  events: Event[];
}

export const AdminEventsList: React.FC<IProps> = ({ events }) => {
  return (
    <div className={`flex flex-wrap justify-start gap-6`}>
      {events?.map(event => (
        <EventCard key={nanoid()} event={event} status={true} />
      ))}
    </div>
  );
};
