import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.css';
import 'flatpickr/dist/flatpickr.min.css';

import {routes} from './routes';
import App from './components/App';
import {store} from 'store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <React.StrictMode>
        <App routes={routes} />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
