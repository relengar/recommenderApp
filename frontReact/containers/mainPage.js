import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserList } from '../actions/user';
import { getAllCompanies, getCategories } from '../actions/company';
import { NavLink } from 'react-router-dom';
import PaginatedLinks from '../components/paginatedLinks';
import FormSelect from '../components/formSelect';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.getUsers = this.getUsers.bind(this);
    this.getCompanies = this.getCompanies.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.state = {category: null};
  }
  componentDidMount() {
    const { pagination } = this.props;
    this.props.dispatch(getUserList(pagination.users.offset));
    // this.props.dispatch(getAllCompanies(pagination.companies.offset));
    this.props.dispatch(getCategories());
  }

  getUsers(evt) {
    const { pagination } = this.props;
    let offset = pagination.users.offset;
    offset = evt.target.id === 'next' ? offset + pagination.users.limit : offset - pagination.users.limit;
    this.props.dispatch(getUserList(offset));
  }
  getCompanies(evt) {
    const { pagination } = this.props;
    let offset = pagination.companies.offset;
    offset = evt.target.id === 'next' ? offset + pagination.companies.limit : offset - pagination.companies.limit;
    this.props.dispatch(getAllCompanies(this.state.category, offset));
  }
  setCategory(evt) {
    this.setState({category: evt.target.value});
    this.props.dispatch(getAllCompanies(evt.target.value, 0))
  }

  render() {
    const { userList, companies, isFetching, isLoggedIn, pagination, categories} = this.props;
    return (
      <section id="main">
        <h1>Find the craftsman you need.</h1>
        <div className="container">
          {!isLoggedIn ? <NavLink className="btn btn-outline-primary" to="/app/user">Register</NavLink> : <NavLink className="btn btn-outline-primary" to="/app/company">Create new company</NavLink>}
        </div>
        <div className="container">
        <h3>Users</h3>
        <PaginatedLinks
          items={userList}
          urlPrefix={'/app/user/'}
          pagination={pagination.users}
          getItems={this.getUsers}
          isFetching={isFetching.users}
         />
        </div>
        <div className="container">
        <h3>Companies</h3>
        <FormSelect
          data={categories}
          onChange={this.setCategory}
          valueAttr={'id'}
          nameAttr={'name'}
        />
        <PaginatedLinks
          items={companies}
          urlPrefix={'/app/company/'}
          pagination={pagination.companies}
          getItems={this.getCompanies}
          isFetching={isFetching.companies}
         />
        </div>
      </section>
    );
  }
};

MainPage.propTypes = {
  isFetching: PropTypes.object,
  userList: PropTypes.array,
  companies: PropTypes.array,
  categories: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  pagination: PropTypes.object,
}

const mapStateToProps = state => {
  let pagination = {
    users: state.user.pagination ? state.user.pagination : {offset: 0},
    companies: state.company.pagination ? state.company.pagination : {offset: 0}
  };
  let isFetching = {
    users: state.user.isFetching,
    companies: state.company.isFetching
  }
  return {
    userList: state.user.userList ? state.user.userList : [],
    companies: state.company.companies ? state.company.companies : [],
    categories: state.company.categories ? state.company.categories : [],
    isLoggedIn: (state.access.currentUser && !isNaN(state.access.currentUser.id)),
    isFetching,
    pagination
  }
};

export default connect(mapStateToProps)(MainPage);
