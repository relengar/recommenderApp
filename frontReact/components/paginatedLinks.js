import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const PaginatedLinks = ({urlPrefix, items, pagination, getItems, isFetching}) => {
  let next = pagination && pagination.offset > 0;
  let prev = pagination && pagination.offset < (pagination.count - pagination.limit);
  if (isFetching) {
    return <div>Loading...</div>
  }
  return (
    <div>
    {items.map(item => {
      return <div key={item.id}><NavLink key={item.id} to={urlPrefix+item.id}>{item.name}</NavLink></div>
    })}
    {
      pagination &&
        <p>
          {next && <span><a id='prev' onClick={getItems} href='javascript:'>Prev</a></span>}
          {next && prev && ' '}
          {prev && <span><a id='next' onClick={getItems} href='javascript:'>Next</a></span>}
        </p>
    }
    </div>
  );
};

PaginatedLinks.propTypes = {
  urlPrefix: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  getItems: PropTypes.func,
  isFetching: PropTypes.bool
};

export default PaginatedLinks;
