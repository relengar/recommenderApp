import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserList } from '../actions/user';
import { getAllCompanies, getCategories } from '../actions/company';
import { NavLink } from 'react-router-dom';
import Pagination from '../components/pagination';
import FormSelect from '../components/formSelect';

export class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.getUsers = this.getUsers.bind(this);
    this.getCompanies = this.getCompanies.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }
  componentDidMount() {
    const { dispatch, pagination } = this.props;
    dispatch(getUserList(pagination.users.offset));
    // this.props.dispatch(getAllCompanies(pagination.companies.offset));
    dispatch(getCategories());
  }

  getUsers(evt) {
    const { pagination } = this.props;
    let offset = pagination.users.offset;
    offset = evt.target.id === 'next' ? offset + pagination.users.limit : offset - pagination.users.limit;
    this.props.dispatch(getUserList(offset));
  }
  getCompanies(evt) {
    const { pagination, categoryId } = this.props;
    let offset = pagination.companies.offset;
    offset = evt.target.id === 'next' ? offset + pagination.companies.limit : offset - pagination.companies.limit;
    this.props.dispatch(getAllCompanies(categoryId, offset));
  }
  setCategory(evt) {
    this.props.dispatch(getAllCompanies(evt.target.getAttribute('value'), 0));
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
        <Pagination
          children={userList.map(item => {       return <div key={item.id}><NavLink to={'/app/user/'+item.id}>{item.name}</NavLink></div>     })}
          pagination={pagination.users}
          getItems={this.getUsers}
          isFetching={isFetching.users}
         />
        </div>
        <div className="container">
        <h3>Companies</h3>
        <ul className="nav">
          {categories.map(cat => {
            return <li key={cat.id} className="nav-item">
                    <a className="nav-link active" value={cat.id} onClick={this.setCategory} href="javascript:">{cat.name}</a>
                    </li>
          })}
        </ul>
        <Pagination
          children={companies.map(item => {       return <div key={item.id}><NavLink key={item.id} to={'/app/company/'+item.id}>{item.name}</NavLink></div>     })}
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
  categoryId: PropTypes.number,
  categories: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  pagination: PropTypes.object,
}

export const mapStateToProps = state => {
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
    categoryId: parseInt(state.company.categoryId),
    categories: state.company.categories ? state.company.categories : [],
    isLoggedIn: (state.access.currentUser && !isNaN(state.access.currentUser.id)),
    isFetching,
    pagination
  }
};

export default connect(mapStateToProps)(MainPage);
