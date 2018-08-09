import {
  ON_SINGLE_STARTUP_INFO_FETCH,
  ON_SINGLE_STARTUP_INFO_FETCH_DONE
} from "constants/ActionTypes";

const INIT_STATE = {
  startupInfo: {}
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
      case ON_SINGLE_STARTUP_INFO_FETCH: {
          return {
              ...state
          }
      }
      case ON_SINGLE_STARTUP_INFO_FETCH_DONE: {
          return {
              ...state,
              startupInfo: action.payload
          }
      }
      default:
          return state;
  }
}
