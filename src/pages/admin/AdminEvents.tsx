import { useEffect, useState } from 'react';

import { getAllEventsLoader } from '@/loaders/getAllEventsLoader';

import { AdminEventsList } from '@/components/admin/Events/AdminEventsList';

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[] | null>();

  useEffect(() => {
    const getEvents = async () => {
      setEvents(await getAllEventsLoader());
    };

    getEvents();
  }, []);

  console.log(events);

  return (
    <main>
      <AdminEventsList events={events || []} />
    </main>
  );
};

export default AdminEvents;
