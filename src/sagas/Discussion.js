import { all, call, fork, put, takeEvery, take } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga';
import { database, auth } from '../firebase/firebase';
import { cleanEmail } from '../services/';
import {
  CREATE_THREAD,
  WATCH_STARTUP_THREADS,
  WATCH_ON_COMMENTS,
  PUSH_COMMENT
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
  let startupCommentsRef = database.ref(`/StartUpInfo/${startupKey}/threads/${threadId}/comments`);
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

const createCommentInThread = async (comment, startupKey, threadKey) => {
    let { createdAt, sentBy } = comment;
   await database.ref(`/StartUpInfo/${startupKey}/threads/${threadKey}/comments`).push(comment);
   return database.ref(`/StartUpInfo/${startupKey}/threads/${threadKey}/lastActivity`).set({ createdAt, sentBy });
}

function* pushCommentToThreadRequest({payload}) {
  let {selectedStartup, selectedStartupThread, comment} = payload;
  let outPayload = yield call(createCommentInThread, comment, selectedStartup, selectedStartupThread);
}

function* watchOnStartupThread({payload}) {
  let startupRef = database.ref(`/StartUpInfo/${payload}/threads`);
  const threadChannel = yield call(createFirebaseRefChannel, startupRef)

  while (true) {
    let outPayload = yield take(threadChannel)
    yield put(watchOnThreadDone({[payload]: outPayload}))
  }
}

const createThreadFb = async (thread, startupKey) => {
  let comment = thread.comments[0];
  delete thread.comments;
  let threads = database.ref(`/StartUpInfo/${startupKey}/threads`);
  let threadKey = threads.push().key;
  await threads.child(threadKey).set(thread);
  return await database.ref(`/StartUpInfo/${startupKey}/threads/${threadKey}/comments`)
    .push(comment).then(d => d).catch(e=>e);
  // return await threads.push(thread).then(d => console.log()).catch(e=>e);
};

function* createChattingThread({payload}) {

  let participants = payload.participants.split(',').map(d => cleanEmail(d.trim()));
  participants.push(cleanEmail(auth.currentUser.email));
  let users = yield call(getUserDetails, participants);
  let sentBy =  {
    email: auth.currentUser.email,
    displayName: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL
  };
  let comments = [{
    message: payload.message,
    createdAt: new Date().toISOString(),
    sentBy
  }];

  let title = payload.name;
  let createdAt = new Date().toISOString();
  let lastActivityBy = {
    email: auth.currentUser.email,
    displayName: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
    createdAt
  };
  let thread = { participants: users, comments, title, createdAt, lastActivityBy};
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
export function* pushCommentToThread() {
  yield takeEvery(PUSH_COMMENT, pushCommentToThreadRequest);
}

export default function* rootSaga() {
  yield all([
      fork(createThreadSaga),
      fork(watchThread),
      fork(watchThreadComments),
      fork(pushCommentToThread)
  ])
}
