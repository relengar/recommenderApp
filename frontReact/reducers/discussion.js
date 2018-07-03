const initState = {
  revPagination: {offset: 0, limit: 2},
  comPagination: {offset: 0, limit: 2},
  isFetching: false,
  reviews: [],
  currentReview: null,
  error: null
};
const discussion = (state = initState, action) => {
  switch (action.type) {
    case 'DISCUSSION_REQUEST_START':
      return Object.assign({}, state,
        {
          isFetching: true
        });
    case 'DISCUSSION_REQUEST_FAIL':
      return Object.assign({}, state ,
        {
          isFetching: false,
          error: action.error
        });
    case 'REVIEWS_SET':
      return Object.assign({}, state ,
        {
          isFetching: false,
          reviews: action.reviews,
          revPagination: action.pagination
        });
    case 'SET_CURRENT_REVIEW':
        return Object.assign({}, state, {
          currentReview: action.review
        })
    case 'REVIEW_ADD':
        const reviews = state.reviews;
        reviews.unshift(action.review)
        reviews.length > state.revPagination.limit ? reviews.pop(): null;
        return Object.assign({}, state, {
          reviews,
          isFetching: false,
          error: null
        })
    case 'COMMENTS_SET':
        action.comments.length > state.comPagination.limit ? action.comments.pop(): null;
        const currentReview = Object.assign({}, state.currentReview, {comments: action.comments});
        return Object.assign({}, state, {
          isFetching: false,
          currentReview,
          comPagination: action.pagination
        })
    default:
      return state;
  }
};

export default discussion;
