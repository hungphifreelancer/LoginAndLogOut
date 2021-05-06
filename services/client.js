import axios from 'axios';
import ApiConfig from '../config/api-config';
const apiClient = axios.create({
  baseURL: ApiConfig.BASE_URL,
  responseType: 'json',
  timeout: 20000,
  withCredentials: true,
  headers: {'X-Custom-Header': 'foobar'},
});

apiClient.interceptors.response.use(
  async function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export {apiClient};
