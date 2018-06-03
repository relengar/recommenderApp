const discussion = (state = {}, action) => {
  switch (action.type) {
    case 'REVIEWS_REQUEST_START':
      return Object.assign({}, state,
        {
          fetchingReviews: true
        });
    case 'REVIEWS_FAIL':
      return Object.assign({}, state ,
        {
          fetchingReviews: false,
          reviewsError: action.error
        });
    case 'REVIEWS_SET':
      return Object.assign({}, state ,
        {
          fetchingReviews: false,
          reviews: action.reviews,
          revPagination: action.pagination
        });
    default:
      return state;
  }
};

export default discussion;
