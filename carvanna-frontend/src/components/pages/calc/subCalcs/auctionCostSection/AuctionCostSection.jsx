import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { copartCalc, iaaiCalc } from './AuctionCostUtils';
import './AuctionCostSection.scss';
import { SetSelectedAuction, SetCarCost, SetAuctionFee, SetTotalAuctionCost, SetSelectedState, SetSelectedLocation } from '../../../../../redux/actions/calcActions';

export default function AuctionCarCostSection() {

    const dispatch = useDispatch();
    // const auctionNames = useSelector(state => state.calcData.auctionNames);
    const selectedAuction = useSelector(state => state.calcData.selectedAuction);
    const auctionFee = useSelector(state => state.calcData.auctionFee);
    const totalAuctionCost = useSelector(state => state.calcData.totalAuctionCost);
    const carCost = useSelector(state => state.calcData.carCost);
    const state = useSelector(state => state)
    console.log(state)

    const calculateTotalAuctionCost = useCallback((carCost, selectedAuction) => {
        // Implement your logic to calculate the total auction cost based on carCost
        let calculatedAuctionCost = 0;
        switch (selectedAuction) {
            case 'Copart':
                calculatedAuctionCost = copartCalc(carCost);
                break;
            case 'IAAI':
                calculatedAuctionCost = iaaiCalc(carCost);
                break;
            default:
                calculatedAuctionCost = 0;
                break;
        }
        dispatch(SetCarCost(carCost));
        dispatch(SetAuctionFee(calculatedAuctionCost));
        dispatch(SetTotalAuctionCost(parseFloat(carCost) + calculatedAuctionCost));
        return calculatedAuctionCost;

    }, [dispatch]);

    React.useEffect(() => {
        if (!selectedAuction) return;
        calculateTotalAuctionCost(carCost, selectedAuction);
    }, [selectedAuction, carCost, calculateTotalAuctionCost]);


    const handleAuctionChange = (e) => {
        const selectedValue = e.target.value;
        calculateTotalAuctionCost(carCost, selectedValue);
        dispatch(SetSelectedAuction(selectedValue));
        dispatch(SetSelectedState(''));
        dispatch(SetSelectedLocation(''));
        dispatch(SetAuctionFee(0));
        dispatch(SetTotalAuctionCost(0));

    };



    return (
        <div className="calc-section calc-section-auction">

            {/* Auction Section */}
            <div className="auction-header">
                <h2>Auction Cost Section:</h2>
            </div>

            <div className='auction-section'>
                <label htmlFor="auction">Auction:</label>
                <select
                    id="auction"
                    value={selectedAuction}
                    onChange={handleAuctionChange}
                >
                    <option value="">Select Auction</option>

                    <option value="Copart">Copart</option>
                    <option value="IAAI">IAAI</option>
                    {/* {auctionNames ? auctionNames.map(auction => <option key={auction} value={auction}>{auction}</option>) : null} */}
                </select>
            </div>

            {/* Car Cost Section */}
            <div className="car-section">
                <label htmlFor="carCost">Car Cost:</label>
                <input
                    type="text"
                    id="carCost"
                    value={carCost}
                    onChange={(e) => calculateTotalAuctionCost(e.target.value)}
                />
            </div>

            {/* Auction Fee Cost Section */}
            <div className="total-fee-cost">
                <div className="fee-label">
                    Auction Fee:
                </div>
                <div className="fee-cost">
                    {`$${auctionFee}`}
                </div>
            </div>

            {/* Total Cost Section */}
            <div className="total-cost">
                <div className="cost-label">
                    Total Auction Cost:
                </div>
                <div className="cost">
                    {totalAuctionCost ? `$${totalAuctionCost}` : `$0`}
                </div>
            </div>

        </div>
    );
}
