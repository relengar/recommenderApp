import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Discussion extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const next = pagination && pagination.offset > 0;
    const prev = pagination && pagination.offset < (pagination.count - pagination.limit);
    const {reviews, getItems, pagination, isFetching} = this.props;
    if (isFetching) {
      return <div><p>Loading...</p></div>
    }
    return <div>{reviews.map(review => {
      return <p key={review.id}>{review.content}</p>
    })}
     {
      pagination &&
        <div className="modal-footer">
          {next && <span><a id='prev' onClick={getItems} href='javascript:'>Prev</a></span>}
          {next && prev && ' '}
          {prev && <span><a id='next' onClick={getItems} href='javascript:'>Next</a></span>}
        </div>
    }
    </div>
  }
};

Discussion.propTypes = {
  reviews: PropTypes.array,
  paginatiom: PropTypes.object,
  getItems: PropTypes.func,
  isFetching: PropTypes.bool
};

export default Discussion;
