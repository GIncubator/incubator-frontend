import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings';
import Auth from './Auth';
import StartupInfo from './StartupInfo';
import Discussion from './Discussion';
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
	startup: StartupInfo,
  discussion: Discussion,
  form: formReducer
});

export default reducers;
