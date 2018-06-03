import { logOut, setCurrentUser } from './access';
import { requestFunc, isAllowedImageFormat } from './helpers';

export const requestStart = () => {
  return {
    type: 'USER_REQUEST_START'
  };
};

export const requestFail = (error, values) => {
  return {
    type: 'USER_REQUEST_FAIL',
    error,
    values
  };
};

export const setUserList = (users, pagination) => {
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
    let pagination = {offset, limit};
    return requestFunc(`/user/all?offset=${offset}&limit=${limit}`)
    .then(resp => {
      pagination.count = resp.data.count;
      dispatch(setUserList(resp.data.rows, pagination));
    })
    .catch(resp => {
      dispatch(requestFail(resp.data.message, {}));
    });
  }
};

export const createUser = data => {
  return dispatch => {
    dispatch(requestStart());
    if (isAllowedImageFormat(data.file)) {
      let passw = data.password;
      return requestFunc('/user', 'PUT', data)
      .then(resp => {
        dispatch(setCurrentUser(resp.data));
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
    return requestFunc(`/user/${id}`)
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
      return requestFunc('/user/update', 'POST', data)
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
    return requestFunc('/user', 'DELETE')
    .then(resp => {
      dispatch(setUser({}));
      dispatch(setCurrentUser(null));
    })
    .catch(resp => {
      dispatch(requestFail(resp.response.data.message, {}));
    })
  }
};
