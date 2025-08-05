import axios from 'axios';
const api = axios.create({
  baseURL: '/',
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});

export default api;