import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { copartCalc, iaaiCalc } from './AuctionCostUtils';
import './AuctionCostSection.scss';
import { SetSelectedAuction } from '../../../../../redux/actions/calcActions';

export default function AuctionCarCostSection() {

    const dispatch = useDispatch();
    const auctionNames = useSelector(state => state.calcData.auctionNames);
    const selectedAuction = useSelector(state => state.calcData.selectedAuction);
    const [carCost, setCarCost] = useState(); // THIS NEEDS TO BE FIXED CALC NEEDS TO CLEAR WHEN AUCTION IS CHANGED
    const [totalAuctionCost, setTotalAuctionCost] = useState({
        carCost: null,
        auctionFees: null,
        totalCost: null,
    });

    const calculateTotalAuctionCost = (carCost) => {
        // Implement your logic to calculate the total auction cost based on carCost
        let calculatedAuctionCost = 0;
        console.log('Selected Auction:', selectedAuction);

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

        // Update state
        setTotalAuctionCost({
            carCost: parseFloat(carCost),
            auctionFees: calculatedAuctionCost,
            totalCost: parseFloat(carCost) + calculatedAuctionCost,
        });
        console.log('Total Auction Cost:', totalAuctionCost);
    };

    const handleAuctionChange = (e) => {
        const selectedValue = e.target.value;
        dispatch(SetSelectedAuction(selectedValue));
        setCarCost();
        setTotalAuctionCost({
            carCost: null,
            auctionFees: null,
            totalCost: null,
        });
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
                    {auctionNames ? auctionNames.map(auction => <option key={auction} value={auction}>{auction}</option>) : null}
                </select>
            </div>

            {/* Car Cost Section */}
            <div className="car-section">
                <label htmlFor="carCost">Car Cost:</label>
                <input
                    type="number"
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
                    {totalAuctionCost.auctionFees ? `$${totalAuctionCost.auctionFees}` : `$0`}
                </div>
            </div>

            {/* Total Cost Section */}
            <div className="total-cost">
                <div className="cost-label">
                    Total Cost:
                </div>
                <div className="cost">
                    {totalAuctionCost.totalCost ? `$${totalAuctionCost.totalCost}` : `$0`}
                </div>
            </div>

        </div>
    );
}
