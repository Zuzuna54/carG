// reducers.js

const initialState = {
    isAuthenticated: false,
};

export const authStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTHENTICATION_STATUS':
            return {
                ...state,
                isAuthenticated: action.payload,
            };
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authStateReducer;