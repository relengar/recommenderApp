import { logIn, logOut } from './access';
import { requestFunc, isAllowedImageFormat } from './helpers';

const requestStart = () => {
  return {
    type: 'USER_REQUEST_START'
  };
};

const requestFail = (error, values) => {
  return {
    type: 'USER_REQUEST_FAIL',
    error,
    values
  };
};

const setUserList = (users, pagination) => {
  return {
    type: 'USERLIST_SET',
    users,
    pagination
  };
};

export const setUser = (user) => {
  return {
    type: 'USER_SET',
    user
  };
};

export const getUserList = (offset = 0, limit = 2) => {
  return dispatch => {
    dispatch(requestStart());
    let url = '/user/all?offset='+offset+'"&limit='+limit;
    let pagination = {offset, limit};
    requestFunc(url)
    .then(resp => {
      pagination.count = resp.data.count;
      dispatch(setUserList(resp.data.rows, pagination));
    })
    .catch(resp => {
      dispatch(requestFail(resp.response.data.message, {}));
    });
  }
};

export const createUser = data => {
  return dispatch => {
    dispatch(requestStart());
    if (isAllowedImageFormat(data.file)) {
      let passw = data.password;
      requestFunc('/user', 'PUT', data)
      .then(resp => {
        dispatch(logIn(resp.data.name, passw));
        dispatch(setUser(resp.data));
      })
      .catch(resp => {
        dispatch(requestFail(resp.response.data.message, data));
      });
    }
    else {
      dispatch(requestFail("Please upload images only", data));
    }
  };
};

export const getUser = id => {
  return dispatch => {
    dispatch(requestStart());
    requestFunc('/user/'+id)
    .then(resp => {
      dispatch(setUser(resp.data));
    })
    .catch(resp => {
      dispatch(requestFail(resp.response.data.message, {}));
    });
  };
};

export const updateUser = data => {
  return dispatch => {
    dispatch(requestStart());
    if (isAllowedImageFormat(data.file)) {
      console.log(data)
      requestFunc('/user/update', 'POST', data)
      .then(resp => {
        dispatch(setUser(data));
      })
      .catch(resp => {
        dispatch(requestFail(resp.response.data.message, data));
      });
    }
    else {
      dispatch(requestFail("Please upload images only", data));
    }
  }
};

export const deleteUser = id => {
  return dispatch => {
    dispatch(requestStart());
    requestFunc('/user', 'DELETE')
    .then(resp => {
      dispatch(setUser({}));
      dispatch(logOut());
    })
    .catch(resp => {
      dispatch(requestFail(resp.response.data.message, {}));
    })
  }
};
