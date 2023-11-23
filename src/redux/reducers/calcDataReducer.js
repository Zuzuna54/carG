
const initialState = {
    data: null,
    error: null,
    loading: false,
    selectedAuction: '',
    selectedCompany: '',
    selectedState: '',
    selectedLocation: '',
    carCost: undefined,
    locationPrice: 0,
    companyNames: [],
    auctionNames: [],
    stateNames: [],
    locationNames: [],
};

export const calcDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_COMPANY':
            return { ...state, selectedCompany: action.payload };
        case 'SET_SELECTED_AUCTION':
            return { ...state, selectedAuction: action.payload };
        case 'SET_CALC_DATA_SET':
            return { ...state, data: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_COMPANY_NAMES':
            return { ...state, companyNames: action.payload };
        case 'SET_AUCTION_NAMES':
            return { ...state, auctionNames: action.payload };
        case 'SET_STATES':
            return { ...state, stateNames: action.payload };
        case 'SET_SELECTED_STATE':
            return { ...state, selectedState: action.payload };
        case 'SET_LOCATION_NAMES':
            return { ...state, locationNames: action.payload };
        case 'SET_SELECTED_LOCATION':
            return { ...state, selectedLocation: action.payload };
        case 'SET_LOCATION_PRICE':
            return { ...state, locationPrice: action.payload };
        case 'SET_CAR_COST':
            return { ...state, carCost: action.payload };


        // Add other cases for additional actions
        default:
            return state;
    }
}