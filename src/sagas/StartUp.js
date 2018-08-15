import {all, call, fork, put, takeEvery} from "redux-saga/effects"
import { startupInfo, startupInfoList, getStartupInfo } from '../services'
import {
  ON_STARTUP_INFO_SUBMIT,
  ON_STARTUP_INFO_FETCH,
  ON_SINGLE_STARTUP_INFO_FETCH
} from 'constants/ActionTypes'
import {
  showStartUpMessage,
  submitStartupInfoDone,
  getStartupListDetailsDone,
  getSingleStartupDetailsDone
} from '../actions/StartUp'
import * as Api from './../api'

const submitStartupInfoRequest = async (payload) =>
  await startupInfo(payload)
    .then(data => data)
    .catch(error => error);

function* submitStartupInfoData({payload}) {
  try {
    const startup = yield call(submitStartupInfoRequest, payload);
    yield put(submitStartupInfoDone('Application submitted succesfully'))
  } catch(error) {
    yield put(showAuthMessage('Not able to save'))
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

const fetchSingleStartupDetails = async (id) =>
  await getStartupInfo(id)
    .then(data => data)
    .catch(error => error);

function* fetchSingleStartupInfoRequest({payload}) {
    const startup = yield call(fetchSingleStartupDetails, payload);
    yield put(getSingleStartupDetailsDone(startup));
}

export function* submitStartupInfo() {
  yield takeEvery(ON_STARTUP_INFO_SUBMIT, submitStartupInfoData);
}

export default function* rootSaga() {
  yield all([
    fork(submitStartupInfo),
  ])
}


