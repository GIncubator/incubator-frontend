import axios from 'axios';

const CREATE_USER_URL = 'http://localhost:4000/auth/register';
const LOGIN_USER_URL = 'http://localhost:4000/auth/login';

const registerUser = (name, email, password) => axios.post(CREATE_USER_URL, { name, email, password });
const loginUser = (email, password) => axios.post(LOGIN_USER_URL, { email, password });

export {
  registerUser,
  loginUser
}