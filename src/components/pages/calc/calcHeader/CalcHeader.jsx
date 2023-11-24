import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetSelectedCompany, SetCompanyNames, SetAuctionNames, SetSelectedAuction, SetSelectedState, SetSelectedLocation } from '../../../../redux/actions/calcActions';
import "./CalcHeader.scss"

export default function CalcHeader() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.calcData.data);
    const selectedCompany = useSelector(state => state.calcData.selectedCompany);
    let companyNames = useSelector(state => state.calcData.companyNames);

    React.useEffect(() => {
        if (!data) return;

        const companies = data.data.companies;
        const companyNamesList = companies.map(company => company.name);
        const company = companies.find(company => company.name === selectedCompany);
        const auctionNames = company ? company.auctions.map(auction => auction.name) : [];

        dispatch(SetAuctionNames(auctionNames));
        dispatch(SetCompanyNames(companyNamesList));

    }, [data, selectedCompany]);

    const handleCompanyChange = (e) => {
        const selectedValue = e.target.value;
        dispatch(SetSelectedCompany(selectedValue));
        dispatch(SetSelectedAuction(''));
        dispatch(SetSelectedState(''));
        dispatch(SetSelectedLocation(''));
    };

    return (
        <div className="calc-header">
            <h1>Bidder Cost Calculator</h1>
            <h3>Select company to calculate your car transportation and import cost</h3>
            {/* <div className='calc-header-sub'>
                <div className='company-select'>
                    <label>Select Company:</label>
                    <select value={selectedCompany} onChange={(e) => handleCompanyChange(e)}>
                        <option value="">Select Company</option>
                        {companyNames ? companyNames.map(company => <option key={company} value={company}>{company}</option>) : null}
                    </select>
                </div>
            </div> */}
        </div>
    );
}