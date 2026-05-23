import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import App from './App';


// This finds the 'root' div in your public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// This tells React to render your <App /> component inside that 'root' div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

);