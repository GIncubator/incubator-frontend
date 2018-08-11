import axios from 'axios';
import { database } from '../firebase/firebase';

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

export const cleanEmail = email => email.replace(/\./g, ',');

const registerUser = (name, email, password) => axios.post(CREATE_USER_URL, { name, email, password });
const loginUser = (email, password) => axios.post(LOGIN_USER_URL, { email, password });


const dbRefStartups = database.ref().child('startups');
const dbRefThreads = database.ref().child('threads');


const startupInfo = (startup) => {
  return dbRefStartups.push(startup)
}

const startupInfoList = async () => 
  await dbRefStartups.once('value')
        .then((snapshot) => snapshot.val())
        .catch(error => error);

const getStartupInfo = async (id) => {
  return await dbRefStartups.child(id).once('value').then(snapshot => snapshot.val()).catch(error => error);
}

const writeUserData = async (email, displayName, uid , photoURL) => {
  let emailUid = cleanEmail(email);
  return await database.ref('users/' + emailUid).set({
    displayName,
    uid,
    photoURL
  });
}

export {
  registerUser,
  loginUser,
  startupInfo,
  startupInfoList,
  getStartupInfo,
  writeUserData
}