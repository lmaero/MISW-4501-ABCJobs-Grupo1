import axios from 'axios';

const companyApi = axios.create({
  baseURL: 'http://10.0.2.2:4004/company',
});

export default companyApi;
