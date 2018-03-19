const access = (state = {}, action) => {
  switch (action.type) {
    case 'ACCESS_REQUEST_START':
      return Object.assign({}, state,
        {
          isFetching: true,
          userError: null
        });
    case 'ACCESS_REQUEST_FAIL':
      return Object.assign({}, state,
        {
          isFetching: false,
          userError: action.error
        });
    case 'ACCESS_SET':
      return Object.assign({}, state,
        {
          isFetching: false,
          currentUser: action.user
        });
    default:
      return state;
  }
};

export default access;
