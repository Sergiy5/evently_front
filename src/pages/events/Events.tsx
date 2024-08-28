import React from 'react';
import { useLoaderData } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { eventType } from './types';

const Events: React.FC = () => {
  const events = useLoaderData() as eventType[];

  return (
    <>
      <div>
        <button>Create event</button>
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

export default Events

export const loader = async (): Promise<eventType[]> => {
  const response = await axios(
    'https://66ceec99901aab24842029e0.mockapi.io/events'
  );
  const resData: eventType[] = response.data;
  return resData;
};
