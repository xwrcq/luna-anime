import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import AuthMiddleware from './utils/AuthMiddleware';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const rootFile = document.getElementById('root');
root.render(
  <Provider store={store}>
    <AuthMiddleware>
      <App />
    </AuthMiddleware>
  </Provider>
);
