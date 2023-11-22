import React, { useState } from 'react';
import { copartCalc } from './AuctionCostUtils';
import { number } from 'prop-types';

export default function AuctionCarCostSection({ selectedAuction, setSelectedAuction }) {
    const [auctionCost, setAuctionCost] = useState('');
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
        <div className="calc-section">
            <label>Auction:</label>
            <select value={selectedAuction} onChange={(e) => setSelectedAuction(e.target.value)}>
                <option value="">Select Auction</option>
                <option value="Copart">Copart</option>
                <option value="IAAI">IAAI</option>
            </select>

            {/* Car Cost Section */}
            <label>Car Cost:</label>
            <input type="number" value={totalAuctionCost.carCost} onChange={(e) => calculateTotalAuctionCost(e.target.value)} />

            {/* Total Auction Cost Section */}
            {totalAuctionCost.totalCost ? (
                <div className="total-auction-cost">
                    <div>Car Cost: ${totalAuctionCost.carCost}</div>
                    <div>Auction Fees: ${totalAuctionCost.auctionFees}</div>
                    <div>Total Cost: ${totalAuctionCost.totalCost}</div>
                </div>
            ) : null}
        </div>
    );
}