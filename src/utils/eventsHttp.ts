import axios from 'axios';

import { eventType } from '../components/events/types';

const URL = 'https://66ceec99901aab24842029e0.mockapi.io';

export const deleteEvent = async (id: number) => {
  try {
    const response = await axios.delete(`${URL}/events/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete event');
  }
};

export const getEvent = async (id?: string) => {
  if (id === 'new') {
    return {};
  }

  try {
    const response = await axios(`${URL}/events/${id}`);
    const resData: eventType = response.data;

    return resData;
  } catch (error) {
    throw new Error('Failed to get event');
  }
};

export const getEvents = async () => {
  try {
    const response = await axios(`${URL}/events`);
    const resData: eventType[] = response.data;
    return resData;
  } catch (error) {
    throw new Error('Failed to get events');
  }
};

export const editEvent = async (formData: eventType, id?: string) => {
  try {
    const response = await axios.put(`${URL}/events/${id}`, {
      ...formData,
      countSeats: formData.countSeats || 'Необмежено',
    });
    const resData = response.data;
    return resData;
  } catch (error) {
    throw new Error('Failed to edit event');
  }
};

export const createEvent = async (formData: eventType) => {
  try {
    const response = await axios.post(
      `https://66ceec99901aab24842029e0.mockapi.io/events/`,
      {
        ...formData,
        countSeats: formData.countSeats || 'Необмежено' ,
      }
    );
    const resData = response.data;
    return resData;
  } catch (error) {
    throw new Error('Failed to create event');
  }
};
