import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './css/index.css';
import './Cell/Cell.css';
import './ShowWeather/ShowWeather.css';
import './css/button.css';
import './css/inputLocation.css';
import './css/switch.css';

ReactDOM.render(
  
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
