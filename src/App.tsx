import React from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './routing';

// const NotFound = React.lazy(() => import('./pages/NotFoundPage'));
// const Events = React.lazy(() => import('./pages/events/Events'));
// const Home = React.lazy(() => import('./pages/Home'));

const App: React.FC = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //     <Route index element={<Home />} />
    //     <Route path="/events" element={<Events />} loader={eventsLoader} />
    //     {/* <Route path="/..." element={...} />
    //   <Route path="/..." element={...} /> */}
    //     <Route path="*" element={<NotFound />} />;
    //   </Route>
    // </Routes>
    <RouterProvider router={router}/>
  );
};

export default App;
