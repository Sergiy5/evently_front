import React from 'react';
import { useNavigate } from 'react-router';

import { useGetAllEventsQuery } from '@/redux/events/operations';

import EventsList from '@/components/events/EventsList';

const Events: React.FC = () => {
  const { data: events } = useGetAllEventsQuery();
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('new/edit');
  };

  return (
    <>
      <div>
        <button onClick={handleCreateEvent}>Create event</button>
      </div>
      {events && <EventsList events={events} />}
    </>
  );
};

export default Events;
