import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';

import { getEvents } from '@/utils/eventsHttp';

import EventsList from '@/components/events/EventsList';

const Events: React.FC = () => {
  const events = useLoaderData() as Event[];
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('new/edit');
  };

  return (
    <>
      <div>
        <button onClick={handleCreateEvent}>Create event</button>
      </div>
      <EventsList events={events} />
    </>
  );
};

export default Events;

export const loader = async (): Promise<Event[]> => {
  return await getEvents();
};
