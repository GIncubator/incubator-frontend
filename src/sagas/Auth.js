import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import {auth, facebookAuthProvider, githubAuthProvider, googleAuthProvider, twitterAuthProvider} from 'firebase/firebase'
import {
  registerUser,
  loginUser,
  startupInfo
} from '../services'
import {
  SIGNIN_FACEBOOK_USER,
  SIGNIN_GITHUB_USER,
  SIGNIN_GOOGLE_USER,
  SIGNIN_TWITTER_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  ON_STARTUP_INFO_SUBMIT
} from 'constants/ActionTypes'
import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
  userSignUpSuccess,
  submitStartupInfoDone
} from '../actions/Auth'
import {
  userFacebookSignInSuccess,
  userGithubSignInSuccess,
  userGoogleSignInSuccess,
  userTwitterSignInSuccess
} from '../actions/Auth'
import {fireBasePasswordToDBUserModel, fireBaseGoogleToDBUserModel} from './../transform'
import * as Api from './../api'

// const createUserWithEmailPasswordRequest = async (name, email, password) =>
//   await registerUser(name, email, password)
//   .then(authUser => authUser)
//   .catch(error => error)

// const signInUserWithEmailPasswordRequest = async (email, password) =>
//   await loginUser(email, password)
//   .then(authUser => authUser)
//   .catch(error => error)

const createUserWithEmailPasswordRequest = async (email, password) =>
  await auth.createUserWithEmailAndPassword(email, password)
  .then(authUser => authUser)
  .catch(error => error)

const signInUserWithEmailPasswordRequest = async (email, password) =>
  await auth.signInWithEmailAndPassword(email, password)
  .then(authUser => authUser)
  .catch(error => error)

const signOutRequest = async () =>
  await auth.signOut()
  .then(authUser => authUser)
  .catch(error => error)

// const signInUserWithGoogleRequest = async () => {
//     return await Promise.resolve().then(() => {
//         let newWin = window.open('http://localhost:4000/auth/google/start')
//         newWin.onmessage = (msg) => {
//             console.log(msg)
//         }
//     })
// }

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

function* createUserWithEmailPassword({payload}) {
  const {name, email, password} = payload
  try {
      const signUpUser = yield call(createUserWithEmailPasswordRequest, email, password)
      if (signUpUser.message) {
        yield put(showAuthMessage(signUpUser.message))
      } else {
        const response = yield call(Api.getUser, {filter: `?passwordUid=${signUpUser.user.uid}`})

        const userModel = fireBasePasswordToDBUserModel(name, signUpUser)
        if (response.data.length === 0) {
          yield call(Api.createUser, userModel)
          localStorage.setItem('user', JSON.stringify(userModel))
        }
        yield put(userSignUpSuccess(userModel))
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
    if (signInUser.message) {
      yield put(showAuthMessage(signInUser.message))
    } else {
      const response = yield call(Api.getUser, {filter: `?passwordUid=${signInUser.user.uid}`})
      const userModel = fireBasePasswordToDBUserModel(response.data.displayName, signInUser)
      localStorage.setItem('user', JSON.stringify(userModel))
      yield put(userSignInSuccess(userModel))
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
      localStorage.removeItem('token')
      yield put(userSignOutSuccess(signOutUser))
    } else {
      yield put(showAuthMessage(signOutUser.message))
    }
  } catch (error) {
    yield put(showAuthMessage(error))
  }
}

const submitStartupInfoRequest = async (payload) =>
  await startupInfo(payload)
    .then(data => data)
    .catch(error => error);

function* submitStartupInfoData({payload}) {
  try {
    const startup = yield call(submitStartupInfoRequest, payload);
    console.log(startup)
    if(startup.data.error) {
        yield put(showAuthMessage(startup.data.error))
    } else {
        yield put(submitStartupInfoDone())
    }
  } catch(error) {
    yield put(showAuthMessage(error))
  }
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

export function* submitStartupInfo() {
  yield takeEvery(ON_STARTUP_INFO_SUBMIT, submitStartupInfoData);
}

export default function* rootSaga() {
  yield all([fork(signInUser),
    fork(createUserAccount),
    fork(signInWithGoogle),
    fork(signInWithFacebook),
    fork(signInWithTwitter),
    fork(signInWithGithub),
    fork(signOutUser),
    fork(submitStartupInfo)
  ])
}
