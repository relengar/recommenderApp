const company = (state = {}, action) => {
  switch (action.type) {
    case 'COMPANY_REQUEST_START':
      return Object.assign({}, state,
                {
          isFetching: true,
          error: null
        });
    case 'COMPANY_REQUEST_FAIL':
      return Object.assign({}, state,
                {
          isFetching: false,
          error: action.error,
          company: action.company
        });
    case 'COMPANY_SET':
        return Object.assign({}, state,
                    {
            retrievedCompany: action.company,
            isFetching: false,
            error: null
          }
        );
    case 'COMPANIES_SET':
        return Object.assign({}, state,
                    {
            companies: action.companies,
            pagination: action.pagination,
            isFetching: false,
            error: null
          }
        );
    default:
      return state;
  }
};

export default company;
