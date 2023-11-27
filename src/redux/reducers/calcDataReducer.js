
const initialState = {
    data: null,
    error: null,
    loading: false,
    selectedAuction: '',
    selectedCompany: '',
    selectedState: '',
    selectedLocation: '',
    carCost: "",
    auctionFee: 0,
    totalAuctionCost: 0,
    locationPrice: 0,
    companyNames: [],
    auctionNames: [],
    stateNames: [],
    locationNames: [],
    modelYear: 'Pick a Model Year',
    engineType: 'Pick an Engine Type',
    engineSize: "",
    steeringPosition: 'Pick a Steering Position',
    importCost: 0,
    usdToGelExchangeRate: 2.7,
    companiesList: [],
    filterValue: {
        property: 'rating',
        order: '',
    },
    transportationCostList: {},

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
        case 'SET_MODEL_YEAR':
            return { ...state, modelYear: action.payload };
        case 'SET_ENGINE_TYPE':
            return { ...state, engineType: action.payload };
        case 'SET_ENGINE_SIZE':
            return { ...state, engineSize: action.payload };
        case 'SET_STEERING_POSITION':
            return { ...state, steeringPosition: action.payload };
        case 'SET_IMPORT_COST':
            return { ...state, importCost: action.payload };
        case 'SET_AUCTION_FEE':
            return { ...state, auctionFee: action.payload };
        case 'SET_TOTAL_AUCTION_COST':
            return { ...state, totalAuctionCost: action.payload };
        case 'SET_USD_TO_GEL_EXCHANGE_RATE':
            return { ...state, usdToGelExchangeRate: action.payload };
        case 'SET_COMPANIES_LIST':
            return { ...state, companiesList: action.payload };
        case 'SET_FILTER_VALUE':
            return { ...state, filterValue: { ...state.filterValue, property: action.payload.property, order: action.payload.order } };
        case 'SET_TRANSPORTATION_COST_LIST':
            return { ...state, transportationCostList: { ...state.transportationCostList, [action.payload.name]: action.payload.value } };


        // Add other cases for additional actions
        default:
            return state;
    }
}