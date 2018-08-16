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
    console.log(startup)

    yield put(submitStartupInfoDone({startUpRegistrationInfo: payload, message: 'Application submitted succesfully'}))
  } catch(error) {
    yield put(showAuthMessage('Not able to save'))
  }
}

const fetchSingleStartupDetails = async (id) =>
  await getStartupInfo(id)
    .then(data => data)
    .catch(error => error);

function* fetchSingleStartupInfoRequest({payload}) {
  const {trackingId, founderEmailAddress} = payload
  const startup = yield call(fetchSingleStartupDetails, trackingId)
  let formattedPayload
  if (startup) {
    const key = Object.keys(startup)[0]
    formattedPayload = startup[key]
    if (formattedPayload.founderEmailAddress !== founderEmailAddress) {
      formattedPayload = null
    }
  }
  yield put(getSingleStartupDetailsDone({startUpInfo: formattedPayload, message: 'Application status check completed.'}));
}

export function* submitStartupInfo() {
  yield takeEvery(ON_STARTUP_INFO_SUBMIT, submitStartupInfoData);
}

export function* fetchSingleStartupInfo() {
  yield takeEvery(ON_SINGLE_STARTUP_INFO_FETCH, fetchSingleStartupInfoRequest);
}

export default function* rootSaga() {
  yield all([
    fork(submitStartupInfo),
    fork(fetchSingleStartupInfo)
  ])
}


