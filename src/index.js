import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import storeConfig from './redux/storeConfig';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={storeConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);