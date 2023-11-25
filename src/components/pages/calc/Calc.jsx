import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuctionCarCostSection from './subCalcs/auctionCostSection/AuctionCostSection';
import TransportationCostSection from './subCalcs/transportationCostSection/TransportationCostSection';
import ImportCostSection from './subCalcs/importCostSection/ImportCostSection';
import CalcHeader from './calcHeader/CalcHeader';
import CalcFooter from './calcFooter/CalcFooter';
import { getDataSet } from '../../../axios/DataLoader';
import { SetCalcDataSet, SetError, SetLoading } from '../../../redux/actions/calcActions';
import './Calc.scss';

export default function Calc() {

    const dispatch = useDispatch();
    const [selectedAuction, setSelectedAuction] = useState('');
    // get the data from api
    React.useEffect(() => {
        const process = async () => {
            try {
                dispatch(SetLoading(true));
                dispatch(SetError(null));
                const resp = await getDataSet();
                dispatch(SetCalcDataSet(resp));
                dispatch(SetLoading(false));
            } catch (err) {
                dispatch(SetError(err));
                dispatch(SetLoading(false));
            }
        };
        process();
    }, []);


    return (
        <div className="page-content">
            {/* Select Transportation Company you want to calculate cost for: */}
            <CalcHeader />

            {/* Auction Car Cost Section */}
            <div className="calc">
                <AuctionCarCostSection selectedAuction={selectedAuction} setSelectedAuction={setSelectedAuction} />
                <TransportationCostSection selectedAuction={selectedAuction} setSelectedAuction={setSelectedAuction} />
                <ImportCostSection />
            </div>

            {/* Companies List Section */}
            <CalcFooter />
        </div>
    );
}
