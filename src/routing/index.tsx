import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Favourite from '@/pages/Favourite';
import Home from '@/pages/Home';
import MyEvent from '@/pages/MyEvent';
import UserProfile from '@/pages/UserProfile';
import AdminEvents from '@/pages/admin/AdminEvents';
import AdminUsers from '@/pages/admin/AdminUsers';
import Notifications from '@/pages/admin/Notification';
import PromoEvents from '@/pages/admin/PromoEvents';
import { action as editEventAction } from '@/pages/events/EventEdit';
import EventEdit from '@/pages/events/EventEdit';

import { Layout } from '@/components/layout/Layout';
import Profile from '@/components/profile/profile';

import { loader as eventLoader } from '../pages/events/Event';
import { loader as eventsLoader } from '../pages/events/Events';
import AdminRouter from './privateRouters/AdminRouter';
import LoginRouter from './privateRouters/LoginRouter';

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
      {
        element: <LoginRouter />,
        children: [
          { path: 'user_profile', element: <Profile /> },
          { path: 'favourite', element: <Favourite /> },
          { path: 'my-event', element: <MyEvent /> },
          {
            path: 'admin',
            element: <AdminRouter />,
            children: [
              {
                path: 'users',
                element: <AdminUsers />,
              },
              { path: 'events', element: <AdminEvents /> },
              { path: 'promo-events', element: <PromoEvents /> },
              { path: 'notifications', element: <Notifications /> },
            ],
          },
        ],
      },
      {
        path: 'profile/:userId',
        element: <UserProfile />,
      },

      // Later add privat router

      //routes for future components
      // Header routes
      { path: 'popular', element: '' },
      { path: 'organizers', element: '' },
      { path: 'about', element: '' },

      { path: 'all_events', element: '' },
      { path: 'nearby', element: '' },
      { path: 'concerts', element: '' },
      { path: 'workshop', element: '' },
      { path: 'stand_up', element: '' },
      { path: 'business_networking', element: '' },
      { path: 'sports_events', element: '' },
      { path: 'another', element: '' },

      { path: 'Kyiv', element: '' },
      { path: 'Odesa', element: '' },
      { path: 'Lviv', element: '' },
      { path: 'Kharkiv', element: '' },
      { path: 'Dnipro', element: '' },

      // Footer routes
      { path: 'office', element: '' },
      { path: 'ReturnsAndPayment', element: '' },
      { path: 'OfferAgreement', element: '' },
      { path: 'PrivacyPolicy', element: '' },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
