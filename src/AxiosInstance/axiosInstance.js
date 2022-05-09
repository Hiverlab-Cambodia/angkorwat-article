import axios from 'axios';

//export const BASE_URL = 'https://projects.xcitech.in:5006/v1'
export const BASE_URL = 'http://127.0.0.1:5006/v1'


const API = axios.create({
  baseURL:BASE_URL
})

API.interceptors.request.use(request => {
  if (request.url.endsWith('login'))
      return request;

  const token = sessionStorage.getItem('token');
  request.headers['Authorization'] = `Bearer ${token}`;
  request.headers['Content-Type'] = 'application/json';
  return request;
});

API.interceptors.response.use(response => response,error => {
  if (error.response.status === 401) {
      console.log("401 error", error);
      sessionStorage.removeItem('token')
  }
  return Promise.reject(error);
})

export default API;

