import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import EventsList from '../../components/events/EventsList';

import { eventType } from '../../components/events/types';
import { getEvents } from '../../utils/eventsHttp';

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
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <Link to={`${event.id}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Events;

export const loader = async (): Promise<eventType[]> => {
  return await getEvents();
};
