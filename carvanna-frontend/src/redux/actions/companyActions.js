// Desc: Redux actions for company data

export const SetCompaniesList = (companiesList) => ({
    type: 'SET_COMPANIES_LIST',
    payload: companiesList,
});

export const setAllCompaniesList = (disabledCompaniesList) => ({
    type: 'SET_ALL_COMPANIES_LIST',
    payload: disabledCompaniesList,
});

