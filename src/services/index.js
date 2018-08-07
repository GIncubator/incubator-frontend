import axios from 'axios';

const CREATE_USER_URL = 'http://localhost:4000/auth/register';
const LOGIN_USER_URL = 'http://localhost:4000/auth/login';
const STARTUP_INFO_URL = 'http://localhost:4000/api/v1/startupinfo';

const token = window.localStorage.getItem('token');
const JWT_TOKEN = `JWT ${token}`;

let axiosConfig = {
  headers : {
    'Content-Type': 'application/json',
    'Authorization': JWT_TOKEN 
  }
};

const registerUser = (name, email, password) => axios.post(CREATE_USER_URL, { name, email, password });
const loginUser = (email, password) => axios.post(LOGIN_USER_URL, { email, password });
const startupInfo = (startup) => axios.post(STARTUP_INFO_URL, startup, axiosConfig);

export {
  registerUser,
  loginUser,
  startupInfo
}