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
