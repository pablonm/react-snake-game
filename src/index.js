import React from 'react';
import ReactDOM from 'react-dom/client';
import Snake from './Snake';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Snake />
  </React.StrictMode>
);
