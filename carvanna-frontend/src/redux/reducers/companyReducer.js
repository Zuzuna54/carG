// Compoany Reducer
const initialState = {
    companiesList: [],
    allCompaniesList: [],
};

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMPANIES_LIST':
            return { ...state, companiesList: action.payload };
        case 'SET_ALL_COMPANIES_LIST':
            return { ...state, allCompaniesList: action.payload };


        default:
            return state;
    }
}

export default companyReducer;