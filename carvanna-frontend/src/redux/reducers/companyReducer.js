// Compoany Reducer
const initialState = {
    companiesList: [],
};

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMPANIES_LIST':
            return { ...state, companiesList: action.payload };

        default:
            return state;
    }
}

export default companyReducer;