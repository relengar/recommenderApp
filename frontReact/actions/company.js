import { requestFunc, isAllowedImageFormat } from './helpers';
import { getReviews, setCurrentReview } from './discussion';

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

const setCompanies = (companies, pagination, categoryId) => {
  return {
    type: 'COMPANIES_SET',
    companies,
    pagination,
    categoryId
  };
};

const setCategories = categories => {
  return {
    type: 'CATEGORIES_SET',
    categories
  };
};

export const setCompany = company => {
  return {
    type: 'COMPANY_SET',
    company,
  };
};

export const getCompany = id => {
  return dispatch => {
    dispatch(requestStart());
    return requestFunc(`/company/${id}`)
    .then(resp => {
      let company = Object.assign({},
        resp.data.company,
        { gallery: resp.data.gallery }
      );
      dispatch(setCompany(company))
      dispatch(setCurrentReview(null));
      return dispatch(getReviews(company.id));
    })
    .catch(resp => {dispatch(requestFail(resp.response.data.message, {}));})
  };
};

export const getAllCompanies = (categoryId, offset = 0, limit = 2) => {
  return dispatch => {
    if (categoryId) {
      dispatch(requestStart());
      let pagination = { offset, limit };
      return requestFunc(`/category/${categoryId}?offset=${offset}&limit=${limit}`)
      .then(resp => {
        pagination.count = resp.data.count;
        dispatch(setCompanies(resp.data.rows, pagination, categoryId))
      })
      .catch(resp => {dispatch(requestFail(resp.response.data.message, {}))});
    }
  };
};

export const createCompany = data => {
  return dispatch => {
    dispatch(requestStart());
    return requestFunc('/company', 'POST', data)
    .then(resp => {dispatch(setCompany(resp.data.comp))})
    .catch(resp => {dispatch(requestFail(resp.response.data.message, {}))});
  };
};

export const updateCompany = (data, id) => {
  return dispatch => {
    dispatch(requestStart());
    let imgOk = true;
    data.gallery.forEach((file, i) => {
      imgOk = isAllowedImageFormat(data[`gallery[${i}]`]) ? imgOk : false;
    })
    if (imgOk) {
      return requestFunc(`/company/${id}`, 'POST', data)
      .then(resp => {dispatch(setCompany(data))})
      .catch(resp => {dispatch(requestFail(resp.response.data.message, {}))});
    }
    else {
      dispatch(requestFail("Please upload images only", {}));
    }
  };
};

export const deleteCompany = id => {
  return dispatch => {
    dispatch(requestStart());
    return requestFunc(`/company/delete/${id}`, 'DELETE')
    .then(resp => {dispatch(setCompany({}))})
    .catch(resp => {dispatch(requestFail(resp.response.data.message, {}));})
  };
};

export const getCategories = () => {
  return dispatch => {
    dispatch(requestStart());
    return requestFunc('/category', 'GET')
    .then(resp => {dispatch(setCategories(resp.data))})
    .catch(resp => {dispatch(requestFail(resp.response.data.message, {}));})
  };
};
