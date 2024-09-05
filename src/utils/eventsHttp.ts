import axios from 'axios';

import { eventType } from '../components/events/types';

export const deleteEvent = async (id: number) => {
  try {
    const response = await axios.delete(
      `https://66ceec99901aab24842029e0.mockapi.io/events/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete event');
  }
};

export const getEvent = async (id?: string) => {
  if (id === 'new') {
    return { id: 0, name: '' };
  }

  try {
    const response = await axios(
      `https://66ceec99901aab24842029e0.mockapi.io/events/${id}`
    );
    const resData: eventType = response.data;

    return resData;
  } catch (error) {
    throw new Error('Failed to get event');
  }
};

export const getEvents = async () => {
  try {
    const response = await axios(
      'https://66ceec99901aab24842029e0.mockapi.io/events'
    );
    const resData: eventType[] = response.data;
    return resData;
  } catch (error) {
    throw new Error('Failed to get events');
  }
};

export const editEvent = async (formData: any, id?: string) => {
  console.log(formData);

  try {
    const response = await axios.put(
      `https://66ceec99901aab24842029e0.mockapi.io/events/${id}`,
      {
        id: id,
        name: formData.title,
      }
    );
    const resData = response.data;
    return resData;
  } catch (error) {
    throw new Error('Failed to edit event');
  }
};

export const createEvent = async (formData: any) => {
  try {
    const response = await axios.post(
      `https://66ceec99901aab24842029e0.mockapi.io/events/`,
      {
        name: formData.title,
      }
    );
    const resData = response.data;
    return resData;
  } catch (error) {
    throw new Error('Failed to create event');
  }
};
