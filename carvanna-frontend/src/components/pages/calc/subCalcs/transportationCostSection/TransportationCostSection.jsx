import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    SetSelectedAuction,
    SetStates,
    SetSelectedState,
    SetLocationNames,
    SetSelectedLocation,
    SetLocationPrice,
    SetAuctionFee,
    SetTotalAuctionCost,
} from '../../../../../redux/actions/calcActions';
import './TransportationCostSection.scss';

export default function TransportationCostSection() {

    const dispatch = useDispatch();
    const data = useSelector(state => state.calcData.data);
    const selectedAuction = useSelector(state => state.calcData.selectedAuction);
    // const auctionNames = useSelector(state => state.calcData.auctionNames);
    const selectedCompany = useSelector(state => state.calcData.selectedCompany);
    const statesNames = useSelector(state => state.calcData.stateNames);
    const selectedState = useSelector(state => state.calcData.selectedState);
    const locationNames = useSelector(state => state.calcData.locationNames);
    const selectedLocation = useSelector(state => state.calcData.selectedLocation);
    const locationPrice = useSelector(state => state.calcData.locationPrice);

    React.useEffect(() => {
        if (!data) return;

        const companies = data.data.companies;
        const company = companies.find(company => company.name === "Estimated Prices");
        const auctions = company ? company.auctions : [];
        const auction = auctions.find(auction => auction.name === selectedAuction);
        const statesNames = auction ? auction.states.map(state => state.name) : [];
        const state = auction ? auction.states.find(state => state.name === selectedState) : null;
        const locationNames = state ? state.locations.map(location => location.name) : [];
        const location = state ? state.locations.find(location => location.name === selectedLocation) : null;
        const price = location ? location.price : null;

        dispatch(SetStates(statesNames));
        dispatch(SetLocationNames(locationNames));
        dispatch(SetLocationPrice(price));

    }, [data, selectedCompany, selectedAuction, selectedState, selectedLocation, dispatch]);

    const handleAuctionChange = (e) => {
        const selectedValue = e.target.value;
        dispatch(SetSelectedAuction(selectedValue));
        dispatch(SetSelectedState(''));
        dispatch(SetSelectedLocation(''));
        dispatch(SetAuctionFee(0));
        dispatch(SetTotalAuctionCost(0));
    };

    const handleStateChange = (e) => {
        const selectedValue = e.target.value;
        dispatch(SetSelectedState(selectedValue));
        dispatch(SetSelectedLocation(''));
    }

    const handleLocationChange = (e) => {
        const selectedValue = e.target.value;
        dispatch(SetSelectedLocation(selectedValue));
    }

    return (
        <div className="calc-section calc-section-transportation">

            <div className="transposration-header">
                <h2>Transportation Cost Section:</h2>
            </div>

            <div className='auction-section'>
                <label>Auction:</label>
                <select value={selectedAuction} onChange={(e) => handleAuctionChange(e)}>
                    <option value="">Select Auction</option>
                    <option value="Copart">Copart</option>
                    <option value="IAAI">IAAI</option>
                    {/* {auctionNames ? auctionNames.map(auction => <option key={auction} value={auction}>{auction}</option>) : null} */}
                </select>
            </div>

            <div className="state-section">
                <label>State:</label>
                <select value={selectedState} onChange={(e) => handleStateChange(e)}>
                    <option value="">Select State</option>
                    {statesNames ? statesNames.map(state => <option key={state} value={state}>{state}</option>) : null}
                </select>
            </div>

            <div className="location-section">
                <label>Location:</label>
                <select value={selectedLocation} onChange={(e) => handleLocationChange(e)}>
                    <option value="">Select Location</option>
                    {locationNames ? locationNames.map(location => <option key={location} value={location}>{location}</option>) : null}
                </select>

            </div>

            <div className="transportation-price">
                <div className="cost-label">
                    Transportation Cost:
                </div>
                <div className="cost">
                    {locationPrice ? `$${locationPrice}` : `$0`}
                </div>
            </div>

        </div>
    );
}
