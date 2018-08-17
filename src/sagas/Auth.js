import {all, call, fork, put, takeEvery} from "redux-saga/effects"
import {auth, facebookAuthProvider, githubAuthProvider, googleAuthProvider, twitterAuthProvider} from "firebase/firebase"
import { startupInfo, startupInfoList, getStartupInfo, writeUserData, registerUser, loginUser, fetchUsers } from '../services'
import {
  SIGNIN_FACEBOOK_USER,
  SIGNIN_GITHUB_USER,
  SIGNIN_GOOGLE_USER,
  SIGNIN_TWITTER_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  FETCH_USERS,
  ON_STARTUP_INFO_FETCH,
} from 'constants/ActionTypes'
import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
  userSignUpSuccess,
  submitStartupInfoDone,
  getStartupListDetailsDone,
  getSingleStartupDetailsDone,
  fetchUsersDone
} from '../actions/Auth'
import {
  userFacebookSignInSuccess,
  userGithubSignInSuccess,
  userGoogleSignInSuccess,
  userTwitterSignInSuccess
} from '../actions/Auth'
import {fireBasePasswordToDBUserModel, fireBaseGoogleToDBUserModel} from './../transform'
import * as Api from './../api'
import gravatar from 'gravatar'
import { database } from '../firebase/firebase';

export const fbToUserModel = async (fbAuthUser) => {
  let {
    displayName,
    email,
    photoURL,
    emailVerified,
    uid
  } = fbAuthUser;
  let { claims } = await fbAuthUser.getIdTokenResult();
  let GUSEC_ROLE = claims.GUSEC_ROLE || 'GUSEC_USER';
  return {
    displayName,
    email,
    photoURL,
    emailVerified,
    uid,
    GUSEC_ROLE
  }
}

const createUserWithEmailPasswordRequest = async (name, email, password) => {
  return await registerUser(name, email, password).then(data => {
    return auth.signInWithCustomToken(data.data.token)
  }).then(() => {
    return auth.currentUser;
  })
  .catch(error => error)
}

const saveUserModelDataToFb = async (userModel) => {
  let {email, displayName, uid , photoURL} = userModel;
  return await writeUserData(email, displayName, uid , photoURL).then(d => d).catch(e => e);
}

const signInUserWithEmailPasswordRequest = async (email, password) =>
  await auth.signInWithEmailAndPassword(email, password)
  .then(() => auth.currentUser.getIdToken())
  .then(token => loginUser(token))
  .then(data => {
    return auth.signInWithCustomToken(data.data.token)
  }).then(() => {
    return auth.currentUser
  })
  .catch(error => error)

const signOutRequest = async () =>
  await auth.signOut()
  .then(authUser => authUser)
  .catch(error => error)

const signInUserWithGoogleRequest = async () =>
  await auth.signInWithPopup(googleAuthProvider)
  .then(authUser => authUser)
  .catch(error => error)

const signInUserWithFacebookRequest = async () =>
  await auth.signInWithPopup(facebookAuthProvider)
  .then(authUser => authUser)
  .catch(error => error)

const signInUserWithGithubRequest = async () =>
  await auth.signInWithPopup(githubAuthProvider)
  .then(authUser => authUser)
  .catch(error => error)

const signInUserWithTwitterRequest = async () =>
  await auth.signInWithPopup(twitterAuthProvider)
  .then(authUser => authUser)
  .catch(error => error)


// function* createUserWithEmailPassword({trackingId})
//   const {name, email, password} = payload
//   try {
//       const signUpUser = yield call(createUserWithEmailPasswordRequest, email, password)
//       if (signUpUser.message) {
//         yield put(showAuthMessage(signUpUser.message))
//       } else {
//         const response = yield call(Api.getUser, {filter: `?passwordUid=${signUpUser.user.uid}`})

//         const userModel = fireBasePasswordToDBUserModel(name, signUpUser)
//         if (response.data.length === 0) {
//           const secureUrl = gravatar.url(userModel.email, {s: '100', r: 'x', d: 'identicon'}, true)
//           userModel.picture = secureUrl
//           yield call(Api.createUser, userModel)
//           localStorage.setItem('user', JSON.stringify(userModel))
//         }
//         yield put(userSignUpSuccess(userModel))
//       }
//   } catch (error) {
//       yield put(showAuthMessage(error))
//   }
// }


function* createUserWithEmailPassword({payload}) {
  const {name, email, password} = payload
  try {
      const signUpUser = yield call(createUserWithEmailPasswordRequest, name, email, password);
      console.log(signUpUser);
      if(!(signUpUser instanceof Error)) {
        let userModel = yield call(fbToUserModel, auth.currentUser);
        localStorage.setItem('user', JSON.stringify(userModel));
        const savedUserModelFb = yield call(saveUserModelDataToFb, userModel);
        yield put(userSignUpSuccess(userModel));
      } else {
        yield put(showAuthMessage(signUpUser.message));
      }
  } catch (error) {
      yield put(showAuthMessage(error))
  }
}

function* signInUserWithGoogle() {
  try {
    const signUpUser = yield call(signInUserWithGoogleRequest)
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message))
    } else {
      const response = yield call(Api.getUser, {filter: `?googleUid=${signUpUser.user.uid}`})

      const userModel = fireBaseGoogleToDBUserModel(signUpUser)
      if (response.data.length === 0) {
        yield call(Api.createUser, userModel)
        localStorage.setItem('user', JSON.stringify(userModel))
      }
      yield put(userGoogleSignInSuccess(userModel))
    }
  } catch (error) {
    yield put(showAuthMessage(error))
  }
}

function* signInUserWithFacebook() {
  try {
    const signUpUser = yield call(signInUserWithFacebookRequest)
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message))
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid)
      yield put(userFacebookSignInSuccess(signUpUser.user.uid))
    }
  } catch (error) {
    yield put(showAuthMessage(error))
  }
}

function* signInUserWithGithub() {
  try {
    const signUpUser = yield call(signInUserWithGithubRequest)
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message))
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid)
      yield put(userGithubSignInSuccess(signUpUser.user.uid))
    }
  } catch (error) {
    yield put(showAuthMessage(error))
  }
}

function* signInUserWithTwitter() {
  try {
    const signUpUser = yield call(signInUserWithTwitterRequest)
    if (signUpUser.message) {
      if (signUpUser.message.length > 100) {
        yield put(showAuthMessage('Your request has been canceled.'))
      } else {
        yield put(showAuthMessage(signUpUser.message))
      }
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid)
      yield put(userTwitterSignInSuccess(signUpUser.user.uid))
    }
  } catch (error) {
    yield put(showAuthMessage(error))
  }
}

function* signInUserWithEmailPassword({payload}) {
  const {email, password} = payload
  try {
    const signInUser = yield call(signInUserWithEmailPasswordRequest, email, password)
    if(!(signInUser instanceof Error)) {
      let userModel = yield call(fbToUserModel, signInUser)
      localStorage.setItem('user', JSON.stringify(userModel))
      yield put(userSignInSuccess(userModel));
    } else {
      yield put(showAuthMessage(signInUser.message));
    }

  } catch (error) {
      yield put(showAuthMessage(error))
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest)
    if (signOutUser === undefined) {
      localStorage.removeItem('user')
      yield put(userSignOutSuccess(signOutUser))
    } else {
      yield put(showAuthMessage(signOutUser.message))
    }
  } catch (error) {
    yield put(showAuthMessage(error))
  }
}

const fetchUsersRequest = async (payload) =>
  await fetchUsers(payload)
    .then(data => {
      return data
    })
    .catch(error => error);

function* fetchUsersSaga({payload}) {
  try {
    const users = yield call(fetchUsersRequest, payload)
    yield put(fetchUsersDone(users))
  } catch(error) {
    yield put(showAuthMessage('Not able to fetch users'))
  }
}

const fetchStartupDetails = async () =>
  await startupInfoList()
    .then(data => data)
    .catch(error => error);

function* fetchStartupInfoListRequest() {
    const startupList = yield call(fetchStartupDetails);
    yield put(getStartupListDetailsDone(startupList));
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword)
}

export function* signInWithGoogle() {
  yield takeEvery(SIGNIN_GOOGLE_USER, signInUserWithGoogle)
}

export function* signInWithFacebook() {
  yield takeEvery(SIGNIN_FACEBOOK_USER, signInUserWithFacebook)
}

export function* signInWithTwitter() {
  yield takeEvery(SIGNIN_TWITTER_USER, signInUserWithTwitter)
}

export function* signInWithGithub() {
  yield takeEvery(SIGNIN_GITHUB_USER, signInUserWithGithub)
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword)
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut)
}

export function* fetchUsersIntercept() {
  yield takeEvery(FETCH_USERS, fetchUsersSaga);
}

export function* fetchStartupInfoList() {
  yield takeEvery(ON_STARTUP_INFO_FETCH, fetchStartupInfoListRequest);
}


export default function* rootSaga() {
  yield all([fork(signInUser),
    fork(createUserAccount),
    fork(signInWithGoogle),
    fork(signInWithFacebook),
    fork(signInWithTwitter),
    fork(signInWithGithub),
    fork(signOutUser),
    fork(fetchUsersIntercept),
    fork(fetchStartupInfoList)
  ])
}
