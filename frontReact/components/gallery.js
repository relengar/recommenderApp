import React from 'react';
import PropTypes from 'prop-types';
import { deletePicture } from '../actions/gallery';
import { connect } from 'react-redux';

export class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.deletePic = this.deletePic.bind(this);
  }

  deletePic(picName) {
    this.props.dispatch(deletePicture(this.props.companyId, picName));
  }

  render() {
    const { pictures, companyId, editable } = this.props;
    return (
      <div>
      <h4>Gallery</h4>
        {pictures.map((pic, i) => {
          const url  = `/company/${companyId}/picture/${pic}`;
          return (
            <span key={companyId + i}>
              <img className='profilePic' src={url} />
              {editable && <a className='bg-light btn' onClick={() => {this.deletePic(pic)}}>Delete</a>}
            </span>
          );
        })}
      </div>
    );
  }
};

Gallery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  companyId: PropTypes.number,
  pictures: PropTypes.array,
};

const mapStateToProps = state => {
  return {};
};

export default connect (mapStateToProps)(Gallery);
