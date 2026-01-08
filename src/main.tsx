import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './design-system/tokens.css';
import './design-system/antd-overrides.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);