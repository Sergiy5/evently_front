import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/Home';
import Layout from '@/components/Layaout';
import { loader as eventsLoader } from '../pages/events/Events';
import { loader as eventLoader } from '../pages/events/Event';

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
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
