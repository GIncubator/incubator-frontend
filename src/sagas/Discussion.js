import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {database} from 'firebase/firebase';
import {
	FETCH_ALL_CHAT_USER,
	FETCH_ALL_CHAT_USER_CONVERSATION,
	FETCH_DISCUSSION_THREADS
} from 'constants/ActionTypes';
import {
	fetchChatUserConversationSuccess,
	fetchChatUserSuccess,
	fetchDiscussionThreadsSuccess,
	showChatMessage
} from 'actions/Discussion';

const getChatUsers = async () =>
    await database.ref('chat/users').once('value')
        .then((snapshot) => {
            const chatUsers = [];
            snapshot.forEach((rawData) => {
                chatUsers.push(rawData.val());
            });
            return chatUsers;
        })
        .catch(error => error);

const getUsersConversation = async () =>
    await database.ref('chat/conversation').once('value')
        .then((snapshot) => {
            const conversations = [];
            snapshot.forEach((rawData) => {
                const conversation = rawData.val();

                // change object to array
                const conversationDatas = [];
                if (conversation.conversationData) {
                    conversation.conversationData.forEach((conversationData) =>
                        conversationDatas.push(conversationData)
                    );
                }
                conversation.conversationData = conversationDatas;
                conversations.push(conversation);
            });

            return conversations;
        })
        .catch(error => error);

const getDiscussionThreads = async () => {
	return [
		{
			title: 'How does our culture impact decisions made by the government?',
			createdBy: 'User 1',
			sentAt: 'September 14, 2016',
			comments: [
				{}, {}
			],
			participants: [
				'user1', 'user2'
			],
			lastActivity: {
				sentAt: 'September 14, 2016',
				user: 'user1'
			}
		},
		{
			title: 'How does our culture impact decisions made by the government?',
			createdBy: 'User 1',
			sentAt: 'September 14, 2016',
			comments: [
				{}, {}
			],
			participants: [
				'user1', 'user2'
			],
			lastActivity: {
				sentAt: 'September 14, 2016',
				user: 'user1'
			}
		}
	]
}

function* fetchChatUserRequest() {
    try {
        const fetchedTodo = yield call(getChatUsers);
        yield put(fetchChatUserSuccess(fetchedTodo));
    } catch (error) {
        yield put(showChatMessage(error));
    }
}

function* fetchChatUserConversationRequest() {
    try {
        const fetchedTodoConversation = yield call(getUsersConversation);
        yield put(fetchChatUserConversationSuccess(fetchedTodoConversation));
    } catch (error) {
        yield put(showChatMessage(error));
    }
}

function* fetchDiscussionThreadsRequest() {
	try {
		const fetchThreads = yield call(getDiscussionThreads);
		yield put(fetchDiscussionThreadsSuccess(fetchThreads));
	} catch (error) {
		// TODO check what this does in action
		yield put(showChatMessage(error));
	}
}

export function* fetchChatUser() {
    yield takeEvery(FETCH_ALL_CHAT_USER, fetchChatUserRequest);
}

export function* fetchChatUserConversation() {
    yield takeEvery(FETCH_ALL_CHAT_USER_CONVERSATION, fetchChatUserConversationRequest);
}

export function* fetchDiscussionThreads() {
	yield takeEvery(FETCH_DISCUSSION_THREADS, fetchDiscussionThreadsRequest);
}

export default function* rootSaga() {
    yield all([
		fork(fetchChatUserConversation),
		fork(fetchChatUser),
		fork(fetchDiscussionThreads)
	]);
}
