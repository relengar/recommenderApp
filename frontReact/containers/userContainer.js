import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createUser, getUser, setUser, deleteUser, updateUser } from '../actions/user';
import ViewDataFields from '../components/viewDataFields';
import UserForm from '../components/userForm';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.registerNewUser = this.registerNewUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    const { dispatch, urlId, user } = this.props;
    let retrieve = urlId && urlId !== user.id;
    retrieve ? dispatch(getUser(this.props.urlId)) : dispatch(setUser({}));
  }

  registerNewUser(userData) {
    this.props.dispatch(createUser(userData));
  }
  updateUser(userData) {
    this.props.dispatch(updateUser(userData));
  }
  deleteUser() {
    this.props.dispatch(deleteUser(this.props.user.id));
  }

  render() {
    const {user, currentUser, isFetching, error, urlId } = this.props;
    let edit = urlId && user && currentUser && user.id === currentUser.id;
    let view = urlId && user && user.id;
    if (isFetching) {
      return <section id="main"><span>Loading ...</span></section>
    }
    else if (edit) {
      // edit page
      return (
        <UserForm
          user={user}
          submitUser={this.updateUser}
          deleteUser={this.deleteUser}
          error={error}
          isNew={false}
         />
      );
    }
    else if (view) {
      // view page
      let fields = ["name", "firstName", "lastName", "email"].map(field => {
        return {value: user[field], label: field};
      });
      return (
        <ViewDataFields
          dataArr={fields}
          header={"Profile of " + user.name}
          docType={'user'}
          docId={user.id}
        />
      );
    }
    else if (currentUser && !urlId) {
      // redirect page
      return <Redirect to={'/'} />
    }
    else {
      // create page
      return (
        <UserForm
          user={user.id ? {} : user}
          submitUser={this.registerNewUser}
          error={error}
          isNew={true}
         />
      );
    }
  }
};

UserContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  user: PropTypes.object,
  error: PropTypes.string,
  currentUser: PropTypes.object,
  urlId: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.retrievedUser ? state.user.retrievedUser : {},
    isFetching: state.user.isFetching,
    currentUser: state.access.currentUser,
    error: state.user.error,
    urlId: ownProps.match.params.id
  };
};

export default connect(mapStateToProps)(UserContainer);
