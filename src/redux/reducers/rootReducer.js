// index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import authStateReducer from './authStateReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    authState: authStateReducer,
    settings: settingsReducer,
});

export default rootReducer;
