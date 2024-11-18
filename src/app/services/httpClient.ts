import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:8000',
  withXSRFToken: true,
  withCredentials: true,

  headers: {
    'Accept': 'application/json',

  }
});
