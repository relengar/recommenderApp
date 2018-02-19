import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, logIn, logOut } from '../actions/access';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.alterInput = this.alterInput.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentDidUpdate() {
    const {loggedUser} = this.props;
    if (loggedUser && loggedUser.id && (this.state.username || this.state.password)) {
      this.setState({username: "", password: ""});
    }
  };

  alterInput(evt) {
    this.setState({[evt.target.id]: evt.target.value});
  }
  handleLogIn(evt) {
    this.props.dispatch(logIn(this.state.username, this.state.password));
    evt.preventDefault();
  }
  handleLogOut(evt) {
    this.props.dispatch(logOut());
    evt.preventDefault();
  }

  render() {
    const { loggedUser, isFetching , userError} = this.props
    if (isFetching) {
      return <div><p>Loading...</p></div>
    }
    else if (loggedUser && loggedUser.id) {
      return (
        <div>Welcome {loggedUser.name}
          <p><button type="button" name="button" onClick={this.handleLogOut}>Log out</button></p>
        </div>
      );
    }
    else {
      return (
      <header className="navbar" id="header">
        <form onSubmit={this.handleLogIn}>
          <div className="form-group">
            <div className="field half first"><input className="col-form-label col-form-label-sm" id="username" placeholder="username" type="text" value={this.state.username} onChange={this.alterInput} /></div>
            <div className="field half"><input className="col-form-label col-form-label-sm" id="password" placeholder="password" type="password" value={this.state.password} onChange={this.alterInput} /></div>
          </div>
          {userError ? <p><span className="alert alert-dismissible alert-danger">Error: {userError}</span></p> : ""}
          <div className="modal-footer">
            <button className="btn btn-primary" type="submit" name="button" >Log in</button>
          </div>
        </form>
      </header>
    );
    }
  }
};

LoginContainer.propTypes = {
  loggedUser: PropTypes.object,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  userError: PropTypes.string
};

const mapStateToProps = state => {
  return {
    loggedUser: state.access.currentUser,
    isFetching: state.access.isFetching ? state.isFetching : false,
    userError: state.access.userError
  }
};

export default connect(mapStateToProps)(LoginContainer);
