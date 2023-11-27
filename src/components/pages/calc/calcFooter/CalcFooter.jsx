import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetCompaniesList, SetFilterValue, SetTransportationCostList } from '../../../../redux/actions/calcActions';
import RatingStars from '../../../shared/RatingStars/RatingStars';
import './CalcFooter.scss';

export default function CalcFooter() {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.calcData.data);
    const companiesList = useSelector((state) => state.calcData.companiesList);
    const totalAuctionCost = useSelector((state) => state.calcData.totalAuctionCost);
    const importCost = useSelector((state) => state.calcData.importCost);
    const selectedAuction = useSelector((state) => state.calcData.selectedAuction);
    const selectedState = useSelector((state) => state.calcData.selectedState);
    const selectedLocation = useSelector((state) => state.calcData.selectedLocation);
    const filterValue = useSelector((state) => state.calcData.filterValue);
    const transportationCostList = useSelector((state) => state.calcData.transportationCostList);


    const sortByProperty = useCallback(
        (array, property, order = 'asc') => {
            const sortOrder = order === 'desc' ? -1 : 1;
            return array.slice().sort((a, b) => {
                const valueA = a[property] || 0;
                const valueB = b[property] || 0;

                return (valueA - valueB) * sortOrder;
            });
        },
        []
    );


    const companiesListInternal = useMemo(() => {
        const clonedList = sortByProperty(JSON.parse(JSON.stringify(companiesList)), filterValue.property, filterValue.order);
        const index = clonedList.findIndex((company) => company.name === 'Estimated Prices');
        if (index > -1) {
            clonedList.splice(index, 1);
        }
        return clonedList;
    }, [companiesList, sortByProperty, filterValue.order, filterValue.property]);


    const handleTransporationCost = useCallback((company) => {
        let output = 0;

        if (selectedAuction && selectedState && selectedLocation) {
            const auctions = company ? company.auctions : [];
            const auction = auctions?.find((auction) => auction.name === selectedAuction);
            const states = auction?.states;
            const state = states?.find((state) => state.name === selectedState);
            const locations = state?.locations;
            const location = locations?.find((location) => location.name === selectedLocation);
            const price = location?.price;
            output += price || 0;
        }

        dispatch(SetTransportationCostList({
            name: company.name,
            value: output
        }));

        return output;
    }, [selectedAuction, selectedState, selectedLocation, dispatch]);


    useEffect(() => {
        if (!data) return;
        const companies = data.data.companies;
        for (let i = 0; i < companies.length; i++) {
            handleTransporationCost(companies[i]);
        }
        dispatch(SetCompaniesList(companies));
    }, [data, selectedLocation, dispatch, handleTransporationCost]);


    const handleTotalCost = useCallback((company = {}) => {
        const totalAuction = totalAuctionCost || 0;
        const totalImport = importCost || 0;
        const transportationCost = transportationCostList[company.name] || 0;
        const total = totalAuction + totalImport + transportationCost;
        company.totalCost = total;
        return total;
    }, [totalAuctionCost, importCost, transportationCostList]);


    const handleFilterValueChange = useCallback(
        (e) => {
            const selectedValue = e.target.value;
            const property = selectedValue.split(' ')[0];
            const order = selectedValue.split(' ')[1];
            const sortedList = sortByProperty(
                companiesListInternal,
                property,
                order
            );
            dispatch(SetFilterValue({
                property: property,
                order: selectedValue.split(' ')[1]
            }));
            dispatch(SetCompaniesList(sortedList));
        },
        [companiesListInternal, dispatch, sortByProperty]
    );


    const returnCompanyList = useMemo(() => {
        return companiesListInternal.map(company => {
            return (
                <div className="company-item" key={company.name}>
                    <div className="company-name">
                        {company.name}
                    </div>
                    <div className="company-logo">
                        <img src="https://png.pngtree.com/png-vector/20190225/ourmid/pngtree-circuit-logo-template-vector-png-image_704226.jpg" alt={company.name}></img>
                    </div>
                    <div className="cost-indicator">
                        <div className="sub-value">
                            {totalAuctionCost ? `$${totalAuctionCost}` : "$0"}
                        </div>
                    </div>
                    <div className="cost-indicator">
                        <div className="sub-value">
                            {transportationCostList[company.name] ? `$${transportationCostList[company.name]}` : "$0"}
                        </div>
                    </div>
                    <div className="cost-indicator">
                        <div className="sub-value">
                            {importCost ? `$${importCost}` : "$0"}
                        </div>
                    </div>
                    <div className="cost-indicator">
                        <div className="sub-value">
                            {handleTotalCost(company) ? `$${handleTotalCost(company)}` : "$0"}
                        </div>
                    </div>
                    <div className="company-rating">
                        <RatingStars rating={company.rating} />
                    </div>
                    <div className="view-more">
                        <button>
                            View More
                        </button>
                    </div>
                </div>
            )
        })
    }, [companiesListInternal, totalAuctionCost, transportationCostList, importCost, handleTotalCost]);

    return (
        <div className="footer-content">
            <div className="company-labels">
                <div className="name">
                    Company Name :
                </div>
                <div className="auction-cost">
                    Auction Cost :
                </div>
                <div className="transportation-cost">
                    Transporation Cost :
                </div>
                <div className="import-cost">
                    Import Cost :
                </div>
                <div className="total">
                    Total :
                </div>
                <div className="rating">
                    Rating :
                </div>
                <div className="filter">
                    <label>Filter By:</label>
                    <select value={filterValue.property + ' ' + filterValue.order} onChange={(e) => handleFilterValueChange(e)}>
                        <option value="rating asc">Rating asc</option>
                        <option value="rating desc">Rating desc</option>
                        <option value="totalCost asc">Total Cost asc</option>
                        <option value="totalCost desc">Total Cost desc</option>
                    </select>
                </div>
            </div>
            {returnCompanyList}
        </div>
    )
}