import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import {Provider} from 'react-redux';
import store from './redux/store';

import Amplify from 'aws-amplify';
import awsconfig from '../config/aws-exports';
import {APP_LOG_LEVEL} from './constants/globalConstants';

window.LOG_LEVEL = APP_LOG_LEVEL;

Amplify.configure(awsconfig);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ScrollToTop>
        <App></App>
      </ScrollToTop>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
