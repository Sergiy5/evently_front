import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';

import EventsList from '@/components/events/EventsList';

import { eventType } from '@/components/events/types';
import { getEvents } from '@/utils/eventsHttp';

const Events: React.FC = () => {
  const events = useLoaderData() as eventType[];
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

export const loader = async (): Promise<eventType[]> => {
  return await getEvents();
};
