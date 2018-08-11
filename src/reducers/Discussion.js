import Moment from 'moment';
import {
    CREATE_THREAD,
    CREATE_THREAD_SUCCESS,
    WATCH_STARTUP_THREADS_SUCCESS,
    ON_BACK_CLICK,
    ON_SELECT_STARTUP,
    ON_STARTUP_INFO_FETCH,
    ON_STARTUP_INFO_FETCH_DONE,
    WATCH_ON_COMMENTS_DONE
} from 'constants/ActionTypes';

const INIT_STATE = {
   threads: {},
   chatPanel: false,
   conversationData: {},
   showStartupDetailView: false,
   selectedStartup: null,
   startupInfoList: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CREATE_THREAD: {
            return {
                ...state
            }
        }
        case CREATE_THREAD_SUCCESS: {
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
        case ON_SELECT_STARTUP: {
            return {
                ...state,
                chatPanel: false,
                selectedStartup: action.payload,
                showStartupDetailView: true
            }
        }
        case ON_BACK_CLICK: {
            return {
                ...state,
                selectedStartup: null,
                showStartupDetailView: false,
                chatPanel: false
            }
        }
        case ON_STARTUP_INFO_FETCH: {
            return {
                ...state
            }
        }
        case ON_STARTUP_INFO_FETCH_DONE: {
            return {
                ...state,
                startupInfoList: action.payload
            }
        }
        case WATCH_ON_COMMENTS_DONE: {
            return {
                ...state,
                chatPanel: true,
                conversationData: action.payload
            }
        }
        default:
            return state;
    }
}
