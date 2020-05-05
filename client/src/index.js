import React from 'react';
import ReactDOM from 'react-dom';
//edited
import './css/index.css';

import App from './App';
import { Provider } from './Context';

ReactDOM.render(
  <Provider>
  <App />
  </Provider>,
  document.getElementById('root')
);