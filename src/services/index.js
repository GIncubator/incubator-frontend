import axios from 'axios'
import { database } from '../firebase/firebase'

const CREATE_USER_URL = 'http://localhost:4000/auth/firebase/register'
const LOGIN_USER_URL = 'http://localhost:4000/auth/firebase/login'
const STARTUP_INFO_URL = 'http://localhost:4000/api/v1/startupinfo'

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  }
}

export const cleanEmail = email => email.replace(/\./g, ',')

const registerUser = (name, email, password) => axios.post(CREATE_USER_URL, {
  name,
  email,
  password
})

const loginUser = (idToken) => axios.post(LOGIN_USER_URL, {
  idToken
})

const dbRefStartups = database.ref().child('StartUpInfo')
const dbRefThreads = database.ref().child('threads')
const dbRefUsers = database.ref().child('users')

const startupInfo = (startup) => {
  return dbRefStartups.push(startup)
}

const startupInfoList = async () =>
  await dbRefStartups.once('value')
  .then((snapshot) => snapshot.val())
  .catch(error => error)

const getStartupInfo = async (trackingId) => {
  const query = dbRefStartups
    .orderByChild('trackingId')
    .equalTo(trackingId)
    .limitToFirst(1)

  return await query
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(error => error)
}

const getStartUpInfoById = async (startUpId) =>
  await database
    .ref().child(`StartUpInfo/${startUpId}`)
    .once('value')
    .then(snap => snap.val())
    .catch(err => err)

const writeUserData = async (email, displayName, uid, photoURL) => {
  let emailUid = cleanEmail(email)

  return await database
    .ref('users/' + emailUid)
    .set({
      email,
      displayName,
      uid,
      photoURL
    })
}

const fetchUsers = async () =>
  await dbRefUsers.once('value')
  .then(snapshot => snapshot.val())
  .catch(error => error)

const updateStartUpInfo = async (startUpId, applicationStatus) =>
  await database
  .ref(`StartUpInfo/${startUpId}`)
  .update({
    applicationStatus
  })

export {
  registerUser,
  loginUser,
  startupInfo,
  startupInfoList,
  getStartupInfo,
  writeUserData,
  fetchUsers,
  updateStartUpInfo,
  getStartUpInfoById
}
