import Moment from 'moment';
import {
    CREATE_THREAD,
    CREATE_THREAD_SUCCESS,
    WATCH_STARTUP_THREADS_SUCCESS
} from 'constants/ActionTypes';

const INIT_STATE = {
   threads: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CREATE_THREAD: {
            return {
                ...state
            }
        }
        case CREATE_THREAD_SUCCESS: {
            console.log(action.payload);
            return {
                ...state
            }
        }
        case WATCH_STARTUP_THREADS_SUCCESS: {
            return {
                ...state,
                threads: action.payload
            }
        }
        default:
            return state;
    }
}
