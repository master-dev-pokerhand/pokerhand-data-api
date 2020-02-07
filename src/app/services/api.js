import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.22.1.41:8080',
});

export default api;
