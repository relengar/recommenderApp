import { requestFunc } from './helpers';

const requestStart = () => {
  return {
    type: 'COMPANY_REQUEST_START'
  };
};

const requestFail = (error, company) => {
  return {
    type: 'COMPANY_REQUEST_FAIL',
    error,
    company
  };
};

const setCompanies = (companies, pagination) => {
  return {
    type: 'COMPANIES_SET',
    companies,
    pagination
  };
};

export const setCompany = (company) => {
  return {
    type: 'COMPANY_SET',
    company,
  };
};

export const getCompany = id => {
  return dispatch => {
    dispatch(requestStart());
    requestFunc('/company/'+id)
    .then(resp => {dispatch(setCompany(resp.data.company))})
    .catch(resp => {dispatch(requestFail(resp.response.data.message, {}));})
  };
};

export const getAllCompanies = (offset = 0, limit = 2) => {
  return dispatch => {
    dispatch(requestStart());
    let url = '/company/all?offset='+offset+'&limit='+limit+'';
    let pagination = {offset, limit};
    requestFunc(url)
    .then(resp => {
      pagination.count = resp.data.count;
      dispatch(setCompanies(resp.data.rows, pagination))
    })
    .catch(resp => {dispatch(requestFail(resp.response.data.message, {}))});
  };
};

export const createCompany = data => {
  return dispatch => {
    dispatch(requestStart());
    requestFunc('/company', 'POST', data)
    .then(resp => {dispatch(setCompany(resp.data))})
    .catch(resp => {dispatch(requestFail(resp.response.data.message, {}))});
  };
};

export const updateCompany = (data, id) => {
  return dispatch => {
    dispatch(requestStart());
    requestFunc('/company/'+id, 'POST', data)
    .then(resp => {dispatch(setCompany(data))})
    .catch(resp => {dispatch(requestFail(resp.response.data.message, {}))});
  };
};

export const deleteCompany = id => {
  return dispatch => {
    dispatch(requestStart());
    requestFunc('/company/delete/'+id, 'DELETE')
    .then(resp => {dispatch(setCompany({}))})
    .catch(resp => {dispatch(requestFail(resp.response.data.message, {}));})
  };
};
