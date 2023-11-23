// index.js
import { combineReducers } from 'redux';
import authStateReducer from './authStateReducer';
import settingsReducer from './settingsReducer';
import { calcDataReducer } from './calcDataReducer';

const rootReducer = combineReducers({
    authState: authStateReducer,
    settings: settingsReducer,
    calcData: calcDataReducer,
});

export default rootReducer;
