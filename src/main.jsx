import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initGA } from "./utils/analytics.js"
import './index.css';


initGA(import.meta.env.VITE_GA_MEASUREMENT_ID);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


