import React from 'react';
import PropTypes from 'prop-types';
import FormInput from './formInput';
import ProfilePic from './profilePic';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.alterInput = this.alterInput.bind(this);
    this.setFile = this.setFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    let initState = {name: "", firstName: "", lastName: "", email: "", password: "", retypePassword: "", error: null, file: '', fileName: ''};
    this.state = Object.assign({}, initState, this.props.user);
  }

  componentDidMount() {
    this.setState({error: null});
  }

  alterInput(evt) {
    this.setState({[evt.target.id]: evt.target.value});
  }
  setFile(evt) {
    this.setState({[evt.target.id]: evt.target.files[0], fileName: evt.target.value});
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.password === this.state.retypePassword) {
      this.setState({error: null});
      this.props.submitUser(this.state);
    }
    else {
      this.setState({error: "Passwords do not match."});
    }
  }
  handleDelete(evt) {
    evt.preventDefault();
    this.props.deleteUser();
  }

  render() {
    const { isNew, user, error } = this.props;
    return(
      <form onSubmit={this.handleSubmit}>
        <h1>{isNew ? 'New user': 'Profile of ' + user.name}</h1>
        <FormInput type={'text'} id={'name'} value={this.state.name} label={'User name'} onChange={this.alterInput} />
        <FormInput type={'text'} id={'firstName'} value={this.state.firstName} label={'First name'} onChange={this.alterInput} />
        <FormInput type={'text'} id={'lastName'} value={this.state.lastName} label={'Last name'} onChange={this.alterInput} />
        <FormInput type={'text'} id={'email'} value={this.state.email} label={'Email'} onChange={this.alterInput} />
        {
          isNew &&
          <span>
          <FormInput type={'password'} id={'password'} value={this.state.password} label={'Password'} onChange={this.alterInput} />
          <FormInput type={'password'} id={'retypePassword'} value={this.state.retypePassword} label={'Retype password'} onChange={this.alterInput} />
          </span>
        }
        <div className="6u 12u$(xsmall)">
          <label htmlFor={'file'}>Profile picture</label>
          <input  id={'file'} type="file" name={'file'} onChange={this.setFile} />
        </div>
        <ProfilePic docId={user.id} docType={'user'} />
        {
          isNew ?
          <div>
            <button type="submit" name="button">Register</button>
          </div>
          :
          <div>
            <button type="submit">Update user</button>
            <button type="button" onClick={this.handleDelete}>Delete user</button>
          </div>
        }
        {this.state.error || error ? <span>{this.state.error ? this.state.error : error}</span> : ""}
      </form>
    );
  }
}

UserForm.propTypes = {
  user: PropTypes.object,
  submitUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func,
  isNew: PropTypes.bool,
  error: PropTypes.string
};

export default UserForm;
