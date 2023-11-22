import React, { useState } from 'react';
import AuctionCarCostSection from './subCalcs/AuctionCostSection';
import TransportationCostSection from './subCalcs/TransportationCostSection';
import ImportCostSection from './subCalcs/ImportCostSection';
import './Calc.scss';

export default function Calc() {

    const [selectedAuction, setSelectedAuction] = useState('');


    return (
        <div className="page-content">
            {/* Select Transportation Company you want to calculate cost for: */}
            <AuctionCarCostSection selectedAuction={selectedAuction} setSelectedAuction={setSelectedAuction} />
            <TransportationCostSection selectedAuction={selectedAuction} setSelectedAuction={setSelectedAuction} />
            <ImportCostSection />
            {/* Companies List Section */}
        </div>
    );
}
