import {
  HIDE_MESSAGE,
	ON_HIDE_LOADER,
	SHOW_MESSAGE,
	ON_SHOW_LOADER,
	ON_STARTUP_INFO_SUBMIT,
	ON_STARTUP_INFO_SUBMIT_DONE,
	ON_STARTUP_INFO_FETCH,
	ON_STARTUP_INFO_FETCH_DONE,
	ON_SINGLE_STARTUP_INFO_FETCH,
	ON_SINGLE_STARTUP_INFO_FETCH_DONE,
} from 'constants/ActionTypes'

export const showStartUpMessage = (message) => {
	return {
		type: SHOW_MESSAGE,
		payload: message
	}
}
export const showStartUpLoader = () => {
	return {
		type: ON_SHOW_LOADER,
	}
}

export const hideStartUpMessage = () => {
	return {
		type: HIDE_MESSAGE,
	}
}
export const hideStartUpLoader = () => {
	return {
		type: ON_HIDE_LOADER,
	}
}

export const submitStartupInfo = (startupInfo) => {
	startupInfo.applicationStatus = 'SUBMITTED'
	return {
		type: ON_STARTUP_INFO_SUBMIT,
		payload: startupInfo
	}
}

export const submitStartupInfoDone = ({startUpRegistrationInfo, message}) => {
	return {
		type: ON_STARTUP_INFO_SUBMIT_DONE,
		payload: {startUpRegistrationInfo, message}
	}
}

export const getStartupListDetails = () => {
	return {
		type: ON_STARTUP_INFO_FETCH
	}
}

export const getStartupListDetailsDone = (startupInfoList) => {
	return {
		type: ON_STARTUP_INFO_FETCH_DONE,
		payload: startupInfoList || []
	}
}

export const getSingleStartupDetails = (id) => {
	return {
		type: ON_SINGLE_STARTUP_INFO_FETCH,
		payload: id
	}
}

export const getSingleStartupDetailsDone = (startupInfo) => {
	return {
		type: ON_SINGLE_STARTUP_INFO_FETCH_DONE,
		payload: startupInfo
	}
}
