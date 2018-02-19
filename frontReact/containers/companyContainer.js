import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCompany, updateCompany, getCompany, setCompany, deleteCompany } from '../actions/company';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ViewDataFields from '../components/viewDataFields';
import CompanyForm from '../components/companyForm';

class CompanyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.registerCompany = this.registerCompany.bind(this);
    this.updateCompany = this.updateCompany.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);
  }

  componentDidMount() {
    const { dispatch, urlId, company } = this.props;
    let retrieve = urlId && urlId !== company.id;
    retrieve ? dispatch(getCompany(this.props.urlId)) : dispatch(setCompany({}));
  }

  componentWillUnmount() {
    this.props.dispatch(setCompany({}));
  }

  registerCompany(data) {
    this.props.dispatch(createCompany(data));
  }
  updateCompany(data) {
    this.props.dispatch(updateCompany(data, this.props.company.id));
  }
  deleteCompany() {
    this.props.dispatch(deleteCompany(this.props.company.id));
  }

  render() {
    const { company, currentUser, isFetching, error, urlId } = this.props;
    let edit = urlId && currentUser && company.id && currentUser.id === company.owner.id;
    let view = urlId && company.id;
    if (isFetching) {
      return <section id="main"><span>Loading ...</span></section>
    }
    // else if (urlId && currentUser && company.id && currentUser.id === company.owner.id) {
    else if (edit) {
      // edit
      return (
        <CompanyForm
          company={company}
          isNew={false}
          submitCompany={this.updateCompany}
          deleteCompany={this.deleteCompany}
          error={error}
        />
      );
    }
    else if (view) {
      // view
      let fields = ["name", "email", "address", "homepage", "description"].map(field => {
        return {value: company[field], label: field};
      });
      return (
        <ViewDataFields
          dataArr={fields}
          header={company.name}
          docId={company.id}
          docType={'company'}
          children={<div><NavLink to={'/app/user/'+company.owner.id}>{company.owner.name}</NavLink></div>}
        />
      );
    }
    else if (!urlId && company.id) {
      // just created/deleted company, redirect to main page
      return <Redirect to={'/'} />
    }
    else {
      // create
      return (
        <CompanyForm
          company={company}
          isNew={true}
          submitCompany={this.registerCompany}
          error={error}
        />
      );
    }
  }
};

CompanyContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  company: PropTypes.object,
  error: PropTypes.string,
  currentUser: PropTypes.object,
  urlId: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    company: state.company.retrievedCompany ? state.company.retrievedCompany : {},
    isFetching: state.company.isFetching,
    currentUser: state.access.currentUser,
    error: state.company.error,
    urlId: ownProps.match.params.id
  };
};

export default connect(mapStateToProps)(CompanyContainer);
