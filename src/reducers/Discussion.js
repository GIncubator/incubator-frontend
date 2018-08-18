import Moment from 'moment';
import {
    CREATE_THREAD,
    CREATE_THREAD_SUCCESS,
    WATCH_STARTUP_THREADS_SUCCESS,
    ON_BACK_CLICK,
    ON_SELECT_STARTUP,
    ON_STARTUP_INFO_FETCH,
    ON_STARTUP_INFO_FETCH_DONE,
    WATCH_ON_COMMENTS_DONE,
    WATCH_ON_COMMENTS,
    ON_BACK_CLICK_FROM_CHAT_PANEL,
    FETCH_START_UP,
    FETCH_START_UP_DONE
} from 'constants/ActionTypes';

const INIT_STATE = {
   threads: null,
   conversationData: null,
   selectedStartup: null,
   selectedStartupThread: null,
   startupInfoList: null,
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
        // case ON_SELECT_STARTUP: {
        //     return {
        //         ...state,
        //         selectedStartup: action.payload,

        //     }
        // }
        case FETCH_START_UP: {
          return {
              ...state,

          }
        }
        case FETCH_START_UP_DONE: {
          return {
              ...state,
              selectedStartup: action.payload,

          }
        }
        case ON_BACK_CLICK: {
            return {
                ...state,
                selectedStartup: null,
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
        case WATCH_ON_COMMENTS: {
          return {
              ...state,
              selectedStartupThread: action.payload.threadId
          }
        }
        case WATCH_ON_COMMENTS_DONE: {
            return {
                ...state,
                conversationData: action.payload
            }
        }
        case ON_BACK_CLICK_FROM_CHAT_PANEL: {
            return {
                ...state
            }
        }
        default:
            return state;
    }
}
