import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.BASE_URL || 'https://laravel-react-crud.000webhostapp.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default Api;
