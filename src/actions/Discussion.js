import {
 	CREATE_THREAD,
	CREATE_THREAD_SUCCESS,
	WATCH_STARTUP_THREADS,
	WATCH_STARTUP_THREADS_SUCCESS,
	ON_BACK_CLICK,
	ON_SELECT_STARTUP,
	WATCH_ON_COMMENTS,
	WATCH_ON_COMMENTS_DONE
} from 'constants/ActionTypes';


export const createThread = (thread) => {
	return {
		type: CREATE_THREAD,
		payload: thread
	}
}

export const createThreadDone = (message) => {
	return {
		type: CREATE_THREAD_SUCCESS,
		payload: message
	}
}

export const watchOnThread = (startupKey) => {
	return {
		type: WATCH_STARTUP_THREADS,
		payload: startupKey
	}
}

export const watchOnThreadDone = (threads) => {
	return {
		type: WATCH_STARTUP_THREADS_SUCCESS,
		payload: threads
	}
}

export const watchOnComments = (data) => {
	return {
		type: WATCH_ON_COMMENTS,
		payload: data
	}
}

export const watchOnThreadCommentDone = (data) => {
	return {
		type: WATCH_ON_COMMENTS_DONE,
		payload: data
	}
}

export const onBackClick = () => {
	return {
		type: ON_BACK_CLICK
	}
}
export const onSelectStartup = (selectedStartupKey) => {
	return {
		type: ON_SELECT_STARTUP,
		payload: selectedStartupKey
	}
}