// index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import authStateReducer from './authStateReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    authState: authStateReducer
});

export default rootReducer;
