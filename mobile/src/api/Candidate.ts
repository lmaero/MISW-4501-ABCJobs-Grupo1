import axios from 'axios';

const candidateApi = axios.create({
  baseURL: 'http://10.0.2.2:4001/candidate',
});

export default candidateApi;
