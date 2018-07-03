import { requestFunc } from './helpers';

const startDiscReq = () => {
  return {
    type: 'DISCUSSION_REQUEST_START'
  };
};

export const failDiscReq = error => {
  error = error.message ? error.message : String(error);
  return {
    type: 'DISCUSSION_REQUEST_FAIL',
    error
  }
};

const setReviews = (reviews, pagination) => {
  return {
    type: 'REVIEWS_SET',
    reviews,
    pagination
  };
};

const addReview = (review) => {
  return {
    type: 'REVIEW_ADD',
    review
  }
};

const setComments = (comments, pagination) => {
  return {
    type: 'COMMENTS_SET',
    comments,
    pagination
  }
}

export const setCurrentReview = (review) => {
  return {
    type: 'SET_CURRENT_REVIEW',
    review
  }
}

export const getReviews = (id, offset = 0, limit = 2) => {
  return dispatch => {
    const pagination = {offset, limit};
    dispatch(startDiscReq())
    return requestFunc(`/review/company/${id}?offset=${offset}&limit=${limit}`)
    .then(resp => {
      pagination.count = resp.data.count;
      dispatch(setReviews(resp.data.rows, pagination))
    })
    .catch(err => {failDiscReq(err)})
  };
};

export const getComments = () => {
  return dispatch => {
    dispatch(startDiscReq())
  }
}

export const toggleDiscussion = (review) => {
  return (dispatch, store) => {
    if (review) {
      const currentReview = Object.assign({}, review, {commentsView: true})
      dispatch(setCurrentReview(currentReview))
      dispatch(getCommentsForReview(review.id))
    }
    else {
      dispatch(setCurrentReview(null))
    }
  }
}

export const getCommentsForReview = (reviewId, offset = 0, limit = 2) => {
  return dispatch => {
    dispatch(startDiscReq())
    const pagination = {offset, limit};
    return requestFunc(`/review/comments/${reviewId}?offset=${offset}&limit=${limit}`)
    .then(resp => {
      pagination.count = resp.data.count;
      dispatch(setComments(resp.data.rows, pagination))
    })
    .catch(err => {failDiscReq(err)})
  }
}

export const postReview = (ownerID, companyID, review) => {
  return (dispatch, store) => {
    dispatch(startDiscReq());
    const payload = Object.assign({}, review, {userId : ownerID});
    return requestFunc(`/review/${companyID}`, 'POST', payload)
    .then(resp => {
      const reviewer = store().access.currentUser;
      const result = Object.assign({}, resp.data.review, {reviewer: {id: reviewer.id, name: reviewer.name}});
      dispatch(addReview(result));
    })
    .catch(error => dispatch(failDiscReq(error)))
  }
}

export const postComment = (reviewId, comment) => {
  return (dispatch, store) => {
    dispatch(startDiscReq());
    const reqObj = Object.assign({}, comment, {commenterId: store().access.currentUser.id, commentType: 'user'});
    return requestFunc(`/comment/${reviewId}`, 'POST', reqObj)
    .then(resp => {
      const submittedComment = Object.assign(resp.data, {commentingUser: store().access.currentUser})
      const comments = [submittedComment].concat(store().discussion.currentReview.comments);
      const pagination = store().discussion.comPagination;
      dispatch(setComments(comments, Object.assign({}, pagination, {count: pagination.count+1})))
    })
    .catch(error => failDiscReq(error))
  }
};
