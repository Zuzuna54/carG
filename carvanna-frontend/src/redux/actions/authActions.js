// authActions.js
export const login = () => ({
    type: 'LOGIN',
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const setAuthenticationStatus = (isAuthenticated) => ({
    type: 'SET_AUTHENTICATION_STATUS',
    payload: isAuthenticated,
});