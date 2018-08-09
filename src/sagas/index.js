import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import discussionSagas from './Discussion';

export default function* rootSaga(getState) {
    yield all([
		authSagas(),
		discussionSagas()
    ]);
}
