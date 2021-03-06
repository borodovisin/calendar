/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "mobx-react";
import * as serviceWorker from './serviceWorker';

import Calendar from './components/Calendar';
import createStore from './mst/createStore';

import './index.css';

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Calendar />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
