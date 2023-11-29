// settingsReducer.js
const initialState = {
    logo: 'defaultLogo.png',
    appColor: '#3498db', // Default color
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_LOGO':
            return { ...state, logo: action.payload };

        case 'UPDATE_APP_COLOR':
            return { ...state, appColor: action.payload };

        default:
            return state;
    }
};

export default settingsReducer;
