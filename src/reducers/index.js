import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings';
import Auth from './Auth';
import StartupInfo from './StartupInfo';


const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
    auth: Auth,
    startup: StartupInfo
});

export default reducers;
