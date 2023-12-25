// index.js
import { combineReducers } from 'redux';
import authStateReducer from './authStateReducer';
import settingsReducer from './settingsReducer';
import calcDataReducer from './calcDataReducer';
import companyReducer from './companyReducer';

const rootReducer = combineReducers({
    authState: authStateReducer,
    settings: settingsReducer,
    calcData: calcDataReducer,
    company: companyReducer,
});

export default rootReducer;
