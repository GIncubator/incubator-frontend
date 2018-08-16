import {
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  ON_SHOW_LOADER,
  ON_HIDE_LOADER,
  ON_SINGLE_STARTUP_INFO_FETCH,
  ON_SINGLE_STARTUP_INFO_FETCH_DONE,
  ON_STARTUP_INFO_SUBMIT,
  ON_STARTUP_INFO_SUBMIT_DONE
} from "constants/ActionTypes"

const INIT_STATE = {
  startUpRegistrationInfo: {},
  startUpInfo: null
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false
        }
      }
    case HIDE_MESSAGE:
      {
        return {
          ...state,
          alertMessage: '',
          showMessage: false,
          loader: false
        }
      }
    case ON_SHOW_LOADER:
      {
        return {
          ...state,
          loader: true
        }
      }
    case ON_HIDE_LOADER:
      {
        return {
          ...state,
          loader: false
        }
      }
    case ON_SINGLE_STARTUP_INFO_FETCH:
      {
        return {
          ...state,
          showSSIFDoneMessage: false,
          loader: true,
        }
      }
    case ON_SINGLE_STARTUP_INFO_FETCH_DONE:
      {
        return {
          ...state,
          loader: false,
          showSSIFDoneMessage: true,
          alertMessage: action.payload.message,
          startUpInfo: action.payload.startUpInfo
        }
      }
    case ON_STARTUP_INFO_SUBMIT:
      {
        return {
          ...state,
          showSISDoneMessage: false,
          loader: true,
        }
      }
    case ON_STARTUP_INFO_SUBMIT_DONE:
      {
        return {
          ...state,
          loader: false,
          showSISDoneMessage: true,
          alertMessage: action.payload.message,
          startUpRegistrationInfo: action.payload.startUpRegistrationInfo
        }
      }

    default:
      return state
  }
}
