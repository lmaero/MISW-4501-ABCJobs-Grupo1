import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://10.0.2.2:4000/auth',
});

export default authApi;
