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
    const locationPrice = useSelector(state => state.calcData.locationPrice);
    const companiesListInternal = JSON.parse(JSON.stringify(companiesList));
    companiesListInternal.shift();

    React.useEffect(() => {
        if (!data) return;
        const companies = data.data.companies;
        dispatch(SetCompaniesList(companies));
    }, [data]);

    const handleTotalCost = () => {

        const totalAuction = totalAuctionCost ? totalAuctionCost : 0;
        const totalImport = importCost ? importCost : 0

        return totalAuction + totalImport;
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
                            {totalAuctionCost ? `$${totalAuctionCost}` : "$0"}
                        </div>
                    </div>
                    <div className="cost-indicator">
                        <div className="sub-value">
                            {importCost ? `$${importCost}` : "$0"}
                        </div>
                    </div>
                    <div className="cost-indicator">
                        <div className="sub-value">
                            {handleTotalCost() ? `$${handleTotalCost()}` : "$0"}
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