import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ProfilePic from './profilePic';

const ViewDataFields = ({dataArr, header, docId, docType, children}) => {
  return (
    <section id="three">
      <div className="inner">
        <h2>{header}</h2>
        {docType === 'user' && <ProfilePic docId={docId} docType={'user'} />}
        {dataArr.map((item, i) => {
          return (<p key={i}>
            <label htmlFor={item.label}>{item.label}: </label>
            <span><i>{item.value}</i></span>
          </p>)
        })}
      </div>
      {children}
    </section>
  )
};

ViewDataFields.propTypes = {
  dataArr: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ),
  header: PropTypes.string.isRequired,
  docId: PropTypes.number,
  docType: PropTypes.string,
  children: PropTypes.node
}

export default ViewDataFields;
