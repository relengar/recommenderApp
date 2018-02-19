import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import recommender from './reducers';
import thunkMiddleware from 'redux-thunk'
import App from './containers/app';

// import LoginContainer from './containers/loginContainer';

let store = createStore(recommender, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
