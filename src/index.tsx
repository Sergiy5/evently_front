import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter basename="evently_front">
      <App />
    </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
