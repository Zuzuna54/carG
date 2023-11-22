import React, { useState } from 'react';

export default function TransportationCostSection({ selectedAuction, setSelectedAuction }) {
    const [auction, setAuction] = useState('');
    const [state, setState] = useState('');
    const [location, setLocation] = useState('');

    const calculateTransportationCost = () => {
        // Implement your logic to calculate the transportation cost based on auction, state, and location
        const transportationCost = /* Your calculation logic here */
            // Update state or perform any other actions as needed
            console.log('Transportation Cost:', transportationCost);
    };

    return (
        <div className="calc-section">
            <label>Auction:</label>
            <select value={selectedAuction} onChange={(e) => setSelectedAuction(e.target.value)}>
                <option value="">Select Auction</option>
                <option value="Copart">Copart</option>
                <option value="IAAI">IAAI</option>
            </select>
            <label>State:</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            <label>Location:</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            <button onClick={calculateTransportationCost}>Calculate Transportation Cost</button>
        </div>
    );
}
