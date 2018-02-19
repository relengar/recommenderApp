import { requestFunc } from './helpers';

export const requestStart = () => {
  return {
    type: 'ACCESS_REQUEST_START'
  };
};

export const requestFail = error => {
  return {
    type: 'ACCESS_REQUEST_FAIL',
    error
  };
};

export const setCurrentUser = user => {
  return {
    type: 'ACCESS_SET',
    user
  }
};

export const logIn = (username, password) => {
  return dispatch => {
    dispatch(requestStart())
    requestFunc('/login', 'POST', { name: username, password})
    .then(resp => {dispatch(setCurrentUser(resp.data))})
    .catch(resp => {dispatch(requestFail(resp.response.data.message))});
  };
};

export const logOut = () => {
  return dispatch => {
    dispatch(requestStart());
    requestFunc('/logout')
    .then(resp => {dispatch(setCurrentUser(null))})
    .catch(resp => {dispatch(requestFail(resp.response.data.message))});
  };
};
