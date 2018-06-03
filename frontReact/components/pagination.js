import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({children, pagination, getItems, isFetching}) => {
  let prev = pagination && pagination.offset > 0;
  let next = pagination && pagination.offset < (pagination.count - pagination.limit);
  if (isFetching) {
    return <div className="bs-component col-lg-6">Loading...</div>
  }
  return (
    <div className="bs-component col-lg-6">
      <div className="modal-body">
      {children}
      </div>
      {
        pagination && (next || prev) &&
          <div className="modal-footer">
            {prev && <span><a id='prev' onClick={getItems} href='javascript:'>Prev</a></span>}
            {next && prev && ' '}
            {next && <span><a id='next' onClick={getItems} href='javascript:'>Next</a></span>}
          </div>
      }
    </div>
  );
};

Pagination.propTypes = {
  children: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  getItems: PropTypes.func,
  isFetching: PropTypes.bool
};

export default Pagination;
