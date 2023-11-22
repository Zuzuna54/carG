import React, { useState } from 'react';
import AuctionCarCostSection from './subCalcs/auctionCostSection/AuctionCostSection';
import TransportationCostSection from './subCalcs/transportationCostSection/TransportationCostSection';
import ImportCostSection from './subCalcs/importCostSection/ImportCostSection';
import './Calc.scss';

export default function Calc() {

    const [selectedAuction, setSelectedAuction] = useState('');


    return (
        <div className="page-content">
            {/* Select Transportation Company you want to calculate cost for: */}
            <div className="calc">
                <AuctionCarCostSection selectedAuction={selectedAuction} setSelectedAuction={setSelectedAuction} />
                <TransportationCostSection selectedAuction={selectedAuction} setSelectedAuction={setSelectedAuction} />
                <ImportCostSection />
            </div>

            {/* Companies List Section */}
        </div>
    );
}
