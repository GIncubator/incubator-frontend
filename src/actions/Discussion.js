import {
 	CREATE_THREAD,
	CREATE_THREAD_SUCCESS,
	WATCH_STARTUP_THREADS,
	WATCH_STARTUP_THREADS_SUCCESS
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
