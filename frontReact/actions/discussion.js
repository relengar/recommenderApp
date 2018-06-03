import { requestFunc } from './helpers';

const startReviewsReq = () => {
  return {
    type: 'REVIEWS_REQUEST_START'
  };
};

const failReviews = error => {
  type: 'REVIEWS_FAIL',
  error
};

// const startCommentReq = () => {
//   return {
//     type: 'COMMENTS_REQUEST_START'
//   };
// }

const setReviews = (reviews, pagination) => {
  return {
    type: 'REVIEWS_SET',
    reviews,
    pagination
  };
};

export const getReviews = (id, offset = 0, limit = 2) => {
  return dispatch => {
    const pagination = {offset, limit};
    dispatch(startReviewsReq())
    return requestFunc(`/review/company/${id}?offset=${offset}&limit=${limit}`)
    .then(resp => {
      pagination.count = resp.data.count;
      dispatch(setReviews(resp.data.rows, pagination))
    })
    .catch(err => {failReviews(err)})
  };
};

export const postReview = (ownerID, companyID, review) => {
  return dispatch => {
    dispatch(startReviewsReq());
    const payload = Object.assign({}, review, {userId : ownerID});
    return requestFunc(`/review/${companyID}`, 'POST,', payload)
    .then(resp => dispatch(addReview(resp.data)))
    .catch(error => failReviews(error))
  }
}

export const submitReview = (id, review) => {
  return dispatch => {
    dispatch(startReviewsReq());
  };
};
