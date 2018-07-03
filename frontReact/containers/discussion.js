import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReviews, getCommentsForReview, postReview, postComment, toggleDiscussion, failDiscReq } from '../actions/discussion';
import ReviewItem from '../components/reviewItem';
import Pagination from '../components/pagination';

export class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.alterInput = this.alterInput.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.getItems = this.getItems.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.state = {content: '', rating: ''};
  }

  componentDidMount() {
    const { dispatch, companyId, reviews } = this.props;
    companyId && !reviews && dispatch(getReviews(companyId, 0));
  }

  alterInput(evt) {
    this.setState({[evt.target.id]: evt.target.value});
  }
  submitItem(evt) {
    evt.preventDefault();
    const { dispatch, companyId, currentUser, currentReview } = this.props;
    const { content, rating } = this.state;
    const err = !currentReview ? content.trim() === '' && rating.trim() === '' : content.trim() === '';
    if (err) {
      dispatch(failDiscReq('Missing required fields'));
      return;
    }
    this.setState({content: '', rating: ''})
    !currentReview ? dispatch(postReview(currentUser.id, companyId, {content, rating})) : dispatch(postComment(currentReview.id, {content}));
  }
  toggleView(review) {
    const { dispatch } = this.props;
    dispatch(toggleDiscussion(review));
  }
  getItems(evt, itemType) {
    const { dispatch, companyId, currentReview } = this.props;
    const pagination = itemType == 'reviews' ? this.props.pagination.reviews : this.props.pagination.comments;
    let offset = pagination.offset;
    offset = evt.target.id === 'next' ? offset + pagination.limit : offset - pagination.limit;
    itemType == 'reviews' ? dispatch(getReviews(companyId, offset)) : dispatch(getCommentsForReview(currentReview.id, offset));
  }
  
  render() {
    const {reviews, pagination, isFetching, currentUser, currentReview, error} = this.props;
    return (
      <section>
        {currentUser && currentUser.id && 
        <form onSubmit={this.submitItem}>
          <p><textarea rows="5" columns="80" id="content" value={this.state.content} placeholder={`Your ${!currentReview ? 'review' : 'comment'}`} onChange={this.alterInput}/></p>
          {!currentReview && <p><input type="number" id="rating" max="10" min="0" value={this.state.rating} onChange={this.alterInput}/></p>}
          <p><button className="btn btn-primary" type="submit">Submit {!currentReview ? 'review' : 'comment'}</button></p>
        </form>}
        {error && <span className="alert alert-dismissible alert-danger">{error.message ? error.message : error}</span>}
        {!currentReview && <Pagination
          children={reviews.map(review => {
            return <ReviewItem 
                      key={review.id} 
                      review={review}
                      displayComments={true} 
                      canBeCommented={false} 
                      toggleView={this.toggleView}
                    />
          })}
          pagination={pagination.reviews}
          getItems={(evt) => {this.getItems(evt, 'reviews')}}
          isFetching={isFetching}
        />}
        {currentReview && 
        <ReviewItem
          review={currentReview}
          displayComments={true}
          toggleView={this.toggleView}
          getItems={(evt) => {this.getItems(evt, 'comments')}}
          isFetching={isFetching}
          pagination={pagination.comments}
        />}
      </section>
    )
  }
};

Discussion.propTypes = {
  reviews: PropTypes.array,
  currentReview: PropTypes.object,
  pagination: PropTypes.object,
  isFetching: PropTypes.bool,
  currentUser: PropTypes.object,
  companyId: PropTypes.number,
  error: PropTypes.object,
};

const mapStateToProps = state => {
  const pagination = {reviews: state.discussion.revPagination , comments: state.discussion.comPagination};
  return {
    reviews: state.discussion.reviews,
    currentReview: state.discussion.currentReview,
    isFetching: state.discussion.isFetching,
    error: state.discussion.error,
    pagination,
    currentUser: state.access.currentUser,
    companyId: state.company.retrievedCompany && state.company.retrievedCompany.id ? state.company.retrievedCompany.id : null,
  }
}

export default connect(mapStateToProps)(Discussion);
