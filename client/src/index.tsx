// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';       // Import Redux Provider
import App from './App';
import { store } from './redux/store';         // Import your configured Redux store

// Create root and render the React app wrapped with Redux Provider
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    {/* Provider makes the Redux store available to all components */}
    <Provider store={store}>  
      <App />
    </Provider>
  </React.StrictMode>
);
