import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// const ReviewItem = ({ review, canBeCommented, displayComments, submitComment }) => {
class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: "", reviewId: props.review.id};
    }

    alterInput(evt) {
        this.setState({[evt.target.id]: evt.target.value});
      }
    handleReviewSubmit(evt) {
        evt.preventDefault();
        submitComment(this.state);
    }

    render() {
        const { review, canBeCommented, displayComments } = this.props;
        return (
            <section>
                <div className="card w-75">
                    <div className="card-header">
                        <i>By <NavLink to={`/app/user/${review.reviewer.id}`}>{review.reviewer.name}</NavLink></i>
                    </div>
                    <div className="card-body">
                        <p><strong>Rating: </strong> {review.rating}</p>
                        <p>{review.content}</p>
                    </div>
                    {
                        canBeCommented && 
                        <div className="card-footer">
                            <h4>Your comment</h4>
                            <p><textarea onChange={this.alterInput} value={this.state.content} name="content" id="content" cols="30" rows="10"></textarea></p>
                            <p><button onClick={this.handleReviewSubmit}>Submit</button></p>
                        </div>
                    }
                </div>
                {displayComments && review.comments.map(comment => {
                    const url = comment.commentType === 'user' ? `/app/user/${comment.commentingUser.id}` : ``;
                    const name = comment.commentType === 'user' ? comment.commentingUser.name : 'Company';
                    // comments objects have to be altered on backend, there always should be a user
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
                })}
                <br />
            </section>
        );
    }
};

ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
    canBeCommented: PropTypes.bool.isRequired,
    displayComments: PropTypes.bool.isRequired,
    submitComment: PropTypes.func
}

export default ReviewItem;