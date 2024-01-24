import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default Api;
