import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetCompaniesList } from '../../../../redux/actions/calcActions';
import "./CalcFooter.scss"


export default function CalcFooter() {

    const dispatch = useDispatch();
    const data = useSelector(state => state.calcData.data);
    const companiesList = useSelector(state => state.calcData.companiesList);
    const totalAuctionCost = useSelector(state => state.calcData.totalAuctionCost);
    const importCost = useSelector(state => state.calcData.importCost);
    const selectedAuction = useSelector(state => state.calcData.selectedAuction);
    const selectedState = useSelector(state => state.calcData.selectedState);
    const selectedLocation = useSelector(state => state.calcData.selectedLocation);
    const companiesListInternal = JSON.parse(JSON.stringify(companiesList));
    companiesListInternal.shift();

    React.useEffect(() => {
        if (!data) return;
        const companies = data.data.companies;
        dispatch(SetCompaniesList(companies));
    }, [data, selectedAuction, selectedLocation, selectedState]);

    // function with an optional parameter


    const handleTotalCost = (transportationCost = 0) => {

        const totalAuction = totalAuctionCost ? totalAuctionCost : 0;
        const totalImport = importCost ? importCost : 0;

        console.log("totalAuction", transportationCost);
        return totalAuction + totalImport + parseFloat(transportationCost);
    }

    const handleTransporationCost = (company) => {
        let output = 0;

        if (selectedAuction && selectedState && selectedLocation) {
            const auctions = company ? company.auctions : [];
            const auction = auctions?.find(auction => auction.name === selectedAuction);
            const states = auction?.states;
            const state = states?.find(state => state.name === selectedState);
            const locations = state?.locations;
            const location = locations?.find(location => location.name === selectedLocation);
            const price = location?.price;
            output += price;
        }
        return output;
    }


    const returnCompanyList = () => {

        return companiesListInternal.map(company => {

            return (
                <div className="company-item" key={company.name}>
                    <div className="company-name">
                        {company.name}
                    </div>
                    <div className="company-logo">
                        <img src="https://png.pngtree.com/png-vector/20190225/ourmid/pngtree-circuit-logo-template-vector-png-image_704226.jpg"></img>
                    </div>
                    <div className="cost-indicator">
                        <div className="sub-value">
                            {totalAuctionCost ? `$${totalAuctionCost}` : "$0"}
                        </div>
                    </div>
                    <div className="cost-indicator">
                        <div className="sub-value">
                            {handleTransporationCost(company) ? `$${handleTransporationCost(company)}` : "$0"}
                        </div>
                    </div>
                    <div className="cost-indicator">
                        <div className="sub-value">
                            {importCost ? `$${importCost}` : "$0"}
                        </div>
                    </div>
                    <div className="cost-indicator">
                        <div className="sub-value">
                            {handleTotalCost() ? `$${handleTotalCost(handleTransporationCost(company))}` : "$0"}
                        </div>
                    </div>
                    <div className="company-rating">
                        {company.rating}
                    </div>
                    <div className="view-more">
                        <button>
                            View More
                        </button>
                    </div>
                </div>
            )
        })
    }

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
            </div>
            {returnCompanyList()}
        </div>
    )
}