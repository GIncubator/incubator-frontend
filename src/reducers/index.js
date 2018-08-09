import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings';
import Auth from './Auth';
import Discussion from './Discussion';

const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
	auth: Auth,
	discussion: Discussion
});

export default reducers;
