import { all, call, fork, put, takeEvery, take } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga';
import { database, auth } from '../firebase/firebase';
import { cleanEmail } from '../services/';
import {
  CREATE_THREAD,
  WATCH_STARTUP_THREADS,
  WATCH_ON_COMMENTS
} from 'constants/ActionTypes';

import {
  createThreadDone,
  watchOnThreadDone,
  watchOnThreadCommentDone
} from '../actions/Discussion';




const getUserDetails = (participants) => {
  return new Promise((resolve, reject) => {
    let users = [];
    participants.forEach(email => {
      database.ref(`/users/${email}`).once('value').then(user => {
        users.push(user.val());
      });
    });
    let id = setInterval(() => {
      if (participants.length === users.length) {
        clearInterval(id);
         resolve(users);
      }
    }, 100);
  });
}

const createFirebaseRefChannel = (firebaseRef) => {
  return eventChannel(emit => {
    firebaseRef.on('value', snapshot => {
      let val = snapshot.val();
      if(val) {
        emit(val);
      }
    });
    return () => {
      firebaseRef.off();
    }
  }, buffers.expanding())
}

function* watchOnStartupThreadComments({payload}) {
  let { startupKey, threadId } = payload;
  let startupCommentsRef = database.ref(`/startups/${startupKey}/threads/${threadId}`);
  const commentsChannel = yield call(createFirebaseRefChannel, startupCommentsRef);
  while (true) {
    let outPayload = yield take(commentsChannel)
    yield put(watchOnThreadCommentDone({ 
      [startupKey]: {
        [threadId]: outPayload
      }
    }));
  }
}

function* watchOnStartupThread({payload}) {
  let startupRef = database.ref(`/startups/${payload}/threads`);
  const threadChannel = yield call(createFirebaseRefChannel, startupRef)

  while (true) {
    let outPayload = yield take(threadChannel)
    yield put(watchOnThreadDone({[payload]: outPayload}))
  }
}

const createThreadFb = async (thread, startupKey) => {
  let threads = database.ref(`/startups/${startupKey}/threads`);
  return await threads.push(thread).then(d=>d.key).catch(e=>e);
};

function* createChattingThread({payload}) {

  let participants = payload.participants.split(',').map(d => cleanEmail(d.trim()));
  participants.push(cleanEmail(auth.currentUser.email));
  let users = yield call(getUserDetails, participants);

  let comments = [{
    message: payload.message,
    createdAt: new Date().toISOString(),
    sentBy: {
      email: auth.currentUser.email,
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL
    }
  }];

  let title = payload.name;
  let thread = { participants: users, comments, title};
  let { startupKey } = payload;
  let threadCreatedKey = yield call(createThreadFb, thread, startupKey);
  yield put(createThreadDone('Thread created successfully'));
}

export function* createThreadSaga() {
  yield takeEvery(CREATE_THREAD, createChattingThread);
}

export function* watchThread() {
  yield takeEvery(WATCH_STARTUP_THREADS, watchOnStartupThread);
}

export function* watchThreadComments() {
  yield takeEvery(WATCH_ON_COMMENTS, watchOnStartupThreadComments);
}

export default function* rootSaga() {
  yield all([
      fork(createThreadSaga),
      fork(watchThread),
      fork(watchThreadComments)
  ])
}