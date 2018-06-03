import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import recommender from './reducers';
import thunkMiddleware from 'redux-thunk'
import App from './containers/app';

const store = createStore(recommender, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
