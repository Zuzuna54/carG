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

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});