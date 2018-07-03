import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCompany, updateCompany, getCompany, setCompany, deleteCompany } from '../actions/company';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ViewDataFields from '../components/viewDataFields';
import CompanyForm from '../components/companyForm';
import Gallery from '../components/gallery';
import Discussion from './discussion';

export class CompanyContainer extends React.Component {
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
    const { company, currentUser, isFetching, error, urlId, categories } = this.props;
    let edit = urlId && currentUser && company.id && currentUser.id === company.owner.id;
    let view = urlId && company.id;
    if (isFetching) {
      return <section id="main"><span>Loading ...</span></section>
    }
    // else if (urlId && currentUser && company.id && currentUser.id === company.owner.id) {
    else if (edit) {
      // edit
      return (
        <section>
          <CompanyForm
            company={company}
            categories={categories}
            isNew={false}
            submitCompany={this.updateCompany}
            deleteCompany={this.deleteCompany}
            error={error}
          />
          <Discussion/>
        </section>
      );
    }
    else if (view) {
      // view
      let fields = ["name", "email", "address", "homepage", "description"].map(field => {
        return {value: company[field], label: field};
      }).filter(field => field.value && field.label);
      return (
        <ViewDataFields
          dataArr={fields}
          header={company.name}
          docId={company.id}
          docType={'company'}
          children={
            <div>
              <p><label htmlFor="Owner">Owner: </label><i><NavLink to={'/app/user/'+company.owner.id}>{company.owner.name}</NavLink></i></p>
              {company.gallery.length > 0 && 
              <Gallery 
              pictures={company.gallery}
              companyId={company.id}
              editable={false}/>}
              <Discussion/>
            </div>
          }
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
        <section>
          <CompanyForm
            company={company}
            categories={categories}
            isNew={true}
            submitCompany={this.registerCompany}
            error={error}
          />
        </section>
      );
    }
  }
};

CompanyContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  company: PropTypes.object,
  categories: PropTypes.array,
  error: PropTypes.string,
  currentUser: PropTypes.object,
  urlId: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    company: state.company.retrievedCompany ? state.company.retrievedCompany : {},
    categories: state.company.categories ? state.company.categories : [],
    isFetching: state.company.isFetching,
    currentUser: state.access.currentUser,
    error: state.company.error,
    urlId: ownProps.match.params.id,
  };
};

export default connect(mapStateToProps)(CompanyContainer);
