import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/Home';
import { Layout } from '@/components/layout/Layout';
import { loader as eventsLoader } from '../pages/events/Events';
import { loader as eventLoader } from '../pages/events/Event';
import { action as editEventAction } from '@/pages/events/EventEdit';
import EventEdit from '@/pages/events/EventEdit';
import AdminUsers, {
  loader as AdminUserLoader,
} from '@/pages/admin/AdminUsers';

const NotFound = React.lazy(() => import('../pages/NotFoundPage'));
const Events = React.lazy(() => import('../pages/events/Events'));
const Event = React.lazy(() => import('../pages/events/Event'));

const router = createBrowserRouter([
  {
    path: '/evently_front',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'events',
        element: <Events />,
        loader: eventsLoader,
      },
      {
        path: 'events/:idEvent',
        element: <Event />,
        loader: ({ params }) => eventLoader(params.idEvent),
      },
      {
        path: 'events/new/edit',
        element: <EventEdit />,
        loader: () => eventLoader('new'),
        action: ({ request }) => editEventAction(request, 'new'),
      },
      {
        path: 'events/:idEvent/edit',
        element: <EventEdit />,
        loader: ({ params }) => eventLoader(params.idEvent),
        action: ({ request, params }) =>
          editEventAction(request, params.idEvent),
      },

      // Later add privat router
      {
        path: 'admin',
        children: [
          { path: 'users', element: <AdminUsers />, loader: AdminUserLoader },
          { path: 'events' },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
