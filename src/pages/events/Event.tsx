import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { eventType } from './types';
import { deleteEvent, getEvent } from './http';

const Event: React.FC = () => {
  const event = useLoaderData() as eventType;
  const navigate = useNavigate();

  const handleEditEvent = () => {
    navigate('edit');
  };

  const handleDeleteEdit = async () => {
    await deleteEvent(event.id);
    navigate('/evently_front/events');
  };

  return (
    <>
      <div>
        <button onClick={handleEditEvent}>Edit</button>
        <button onClick={handleDeleteEdit}>Delet</button>
      </div>
      <p>Event {event.id}</p>
      <p>Event name: {event.name}</p>

      <Link to="/evently_front/events" className='bg-green-500'>Close</Link>
    </>
  );
};

export default Event;

export const loader = async (id?: string): Promise<eventType> => {
  return await getEvent(id);
};
