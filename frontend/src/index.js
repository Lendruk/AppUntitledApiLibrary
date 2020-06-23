import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './containers/App';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';

import configureStore from './configureStore';

import './index.css';
import './App.css';

const initialState = {};
export const { store, persistor } = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>,
    MOUNT_NODE,
  );
};

render();

if (module.hot) {
  module.hot.accept(['./containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}