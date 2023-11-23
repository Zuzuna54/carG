
export const SetCarCost = (carCost) => ({
    type: 'SET_CAR_COST',
    payload: carCost,
});

export const SetSelectedCompany = (selectedCompany) => ({
    type: 'SET_SELECTED_COMPANY',
    payload: selectedCompany,
});

export const SetCompanyNames = (companyNames) => ({
    type: 'SET_COMPANY_NAMES',
    payload: companyNames,
});

export const SetAuctionNames = (auctionNames) => ({
    type: 'SET_AUCTION_NAMES',
    payload: auctionNames,
});

export const SetStates = (selectedState) => ({
    type: 'SET_STATES',
    payload: selectedState,
});

export const SetSelectedState = (selectedState) => ({
    type: 'SET_SELECTED_STATE',
    payload: selectedState,
});

export const SetLocationNames = (locationList) => ({
    type: 'SET_LOCATION_NAMES',
    payload: locationList,
});

export const SetSelectedLocation = (selectedLocation) => ({
    type: 'SET_SELECTED_LOCATION',
    payload: selectedLocation,
});

export const SetLocationPrice = (locationPrices) => ({
    type: 'SET_LOCATION_PRICE',
    payload: locationPrices,
});

export const SetCalcDataSet = (calcDataSet) => ({
    type: 'SET_CALC_DATA_SET',
    payload: calcDataSet,
});

export const SetError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
});

export const SetLoading = (loading) => ({
    type: 'SET_LOADING',
    payload: loading,
});

export const SetSelectedAuction = (selectedAuction) => ({
    type: 'SET_SELECTED_AUCTION',
    payload: selectedAuction,
});
// Compare this snippet from carvanna/src/redux/actions/calcActions.js: