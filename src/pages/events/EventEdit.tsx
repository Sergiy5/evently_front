import React from 'react';
import { redirect } from 'react-router';
import { createEvent, editEvent } from '../../utils/eventsHttp';
import EventForm from '../../components/events/EventForm';

const EventEdit: React.FC = () => {
  return (
    <>
      <EventForm></EventForm>
    </>
  );
};

export default EventEdit;

export const action = async (request: any, id?: string) => {
  const fd = await request.formData();
  const formData = Object.fromEntries(fd);

  if (id === 'new') {
    await createEvent(formData);
    return redirect('/evently_front/events');
  } else {
    await editEvent(formData, id);
    return redirect('/evently_front/events/' + id);
  }
};
