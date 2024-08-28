import React from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { eventType } from './types';

const Event: React.FC = () => {
  const event = useLoaderData() as eventType;
  console.log(event);

  return (
    <>
      <p>Event {event.id}</p>
      <p>Event name: {event.name}</p>

      <Link to="/evently_front/events">Close</Link>
    </>
  );
};

export default Event;

export const loader = async (id?: string): Promise<eventType> => {
  const response = await axios(
    `https://66ceec99901aab24842029e0.mockapi.io/events/${id}`
  );
  const resData: eventType = response.data;
  console.log(resData);

  return resData;
};
