import { requestFunc } from './helpers';

const galleryFreeze = () => {
  return {
    type: "GALLERY_FREEZE"
  };
};

const galleryFail = err => {
  return {
    type: "GALLERY_FAIL"
  };
};

const galleryDeletePics = pics => {
  return {
    type: "GALLERY_DELETE_PICS",
    pics
  };
};

export const deletePicture = (id, picName) => {
  return dispatch => {
    dispatch(galleryFreeze());
    return requestFunc(`/company/deletePicture/${picName}?id=${id}`, 'DELETE')
    .then(resp => {dispatch(galleryDeletePics([picName]))})
    .catch(resp => {dispatch(galleryFail(resp.response.data.message))});
  };
};
