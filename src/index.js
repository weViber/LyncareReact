import './index.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <
    React.StrictMode >
    <
    BrowserRouter >
    <
    App / >
    <
    /BrowserRouter> <
    /React.StrictMode>
);

reportWebVitals();