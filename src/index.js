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
import './helpers/i18n';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';

window.LOG_LEVEL = APP_LOG_LEVEL;

Amplify.configure(awsconfig);

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <HashRouter>
        <ScrollToTop>
          <App></App>
        </ScrollToTop>
      </HashRouter>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about services workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
