import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Pagination from './pagination';

class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {content: "", reviewId: props.review.id};
    }

    toggle(evt) {
        evt.preventDefault();
        const review = this.props.review.commentsView ? null : this.props.review;
        this.props.toggleView(review);
    }
    renderComment(comment) {
        const url = comment.commentType === 'user' ? `/app/user/${comment.commentingUser.id}` : '';
        const name = comment.commentType === 'user' ? comment.commentingUser.name : 'Company';
        return (
            <div key={comment.id} className="card w-50">
                <div className="card-header">
                    <i><NavLink to={url}>{name}</NavLink></i>
                </div>
                <div className="card-body">
                    {comment.content}
                </div>
            </div>
        );
    }

    render() {
        const { review, displayComments, pagination, getItems, toggleView, isFetching } = this.props;
        return (
            <section>
                <div className="card w-75">
                    <div className="card-header">
                        <i>By <NavLink to={`/app/user/${review.reviewer.id}`}>{review.reviewer.name}</NavLink></i>
                    </div>
                    <div className="card-body">
                        <p><strong>Rating: </strong> {review.rating}</p>
                        <p>{review.content}</p>
                        {toggleView && <p><button className="btn btn-secondary" onClick={this.toggle}>View {review.commentsView ? 'reviews' : 'comments'}</button></p>}
                    </div>
                </div>
                {displayComments && review.comments &&
                <Pagination
                    children={review.comments.map(this.renderComment)}
                    isFetching={isFetching}
                    getItems={getItems}
                    pagination={pagination}
                />
                }
                <br />
            </section>
        );
    }
};

ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
    displayComments: PropTypes.bool.isRequired,
    toggleView: PropTypes.func,
    getItems: PropTypes.func,
    pagination: PropTypes.object,
    isFetching: PropTypes.bool
}

export default ReviewItem;