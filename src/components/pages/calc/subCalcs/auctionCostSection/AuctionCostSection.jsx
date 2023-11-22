import React, { useState } from 'react';
import { copartCalc } from './AuctionCostUtils';
import './AuctionCostSection.scss';

export default function AuctionCarCostSection({ selectedAuction, setSelectedAuction }) {

    const [totalAuctionCost, setTotalAuctionCost] = useState({
        carCost: null,
        auctionFees: null,
        totalCost: null,
    });

    const calculateTotalAuctionCost = (carCost) => {
        // Implement your logic to calculate the total auction cost based on carCost
        const calculatedAuctionCost = copartCalc(parseFloat(carCost));
        // Update state or perform any other actions as needed
        setTotalAuctionCost({
            carCost: parseFloat(carCost),
            auctionFees: calculatedAuctionCost,
            totalCost: parseFloat(carCost) + calculatedAuctionCost,
        });
        console.log('Total Auction Cost:', totalAuctionCost);
    };

    return (
        <div className="calc-section calc-section-auction">

            {/* Auction Section */}

            <div className="auction-header">
                <h2>Auction Cost Section:</h2>

            </div>


            <div className='auction-section'>
                <label>Auction:</label>
                <select value={selectedAuction} onChange={(e) => setSelectedAuction(e.target.value)}>
                    <option value="">Select Auction</option>
                    <option value="Copart">Copart</option>
                    <option value="IAAI">IAAI</option>
                </select>
            </div>


            {/* Car Cost Section */}
            <div className="car-section">
                <label>Car Cost:</label>
                <input type="number" value={totalAuctionCost.carCost} onChange={(e) => calculateTotalAuctionCost(e.target.value)} />
            </div>


            {/* Total Auction Cost Section */}

            <div className="total-fee-cost">
                <div className="fee-label">
                    Auction Fee:
                </div>
                <div className="fee-cost">
                    ${totalAuctionCost.auctionFees}
                </div>
            </div>

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