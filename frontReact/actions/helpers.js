import axios from 'axios';

export const requestFunc = (url, method = 'GET', data = {}) => {
  let formData = new FormData();
  Object.keys(data).forEach(item => {
    formData.append(item, data[item]);
  });
  return axios({
    url,
    method,
    data: formData
  });
};

export const isAllowedImageFormat = (file) => {
  let allowedTypes = ["jpg", "jpeg", "png", "gif", "tif", "bmp"];
  let result = true;
  if (file && file.type) {
    result = false;
    allowedTypes.forEach(type => {
      if (file.type.indexOf(type) !== -1) {
        result = true;
      }
    });
  }
  return result
};
