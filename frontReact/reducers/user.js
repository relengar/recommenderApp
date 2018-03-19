const user = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REQUEST_START':
      return Object.assign({}, state,
                {
          isFetching: true,
          error: null
        });
    case 'USER_REQUEST_FAIL':
      return Object.assign({}, state,
                {
          isFetching: false,
          error: action.error,
          retrievedUser: action.values
        });
    case 'USER_SET':
      return Object.assign({}, state,
        {
          isFetching: false,
          retrievedUser: action.user,
          error: action.user.error ? action.user.error : null
        });
    case 'USERLIST_SET':
      return Object.assign({}, state,
                {
          isFetching: false,
          userList: action.users,
          pagination: action.pagination,
          error: null
        });
    default:
      return state;
  }
};

export default user;
