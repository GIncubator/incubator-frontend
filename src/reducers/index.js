import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Settings from './Settings';
import Auth from './Auth';
import Chat from './Chat';

const reducers = combineReducers ({
    routing: routerReducer,
    settings: Settings,
    auth: Auth,
    chatData: Chat
});

export default reducers;
