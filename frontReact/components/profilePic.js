import React from 'react';
import PropTypes from 'prop-types';

const ProfilePic = ({docType, docId}) => {
  let url = '/'+docType+'/profilePic/'+docId+'?refresh=' + new Date().getTime();
  if (!isNaN(parseInt(docId))) {
    return <img className='profilePic' src={url} />
  }
  else {
    return '';
  }
};

ProfilePic.propTypes = {
  docType: PropTypes.string.isRequired,
  docId: PropTypes.number,
};

export default ProfilePic;
