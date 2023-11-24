import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetModelYear, SetEngineType, SetEngineSize, SetImportCost } from '../../../../../redux/actions/calcActions';
import { modelYears, importCostCalculator } from './ImportCostUtils';
import './ImportCostSection.scss';


export default function ImportCostSection() {

    const dispatch = useDispatch();
    const modelYear = useSelector(state => state.calcData.modelYear);
    const engineType = useSelector(state => state.calcData.engineType);
    const engineSize = useSelector(state => state.calcData.engineSize);
    const importCost = useSelector(state => state.calcData.importCost);
    const usdToGelExchangeRate = useSelector(state => state.calcData.usdToGelExchangeRate);
    // const steeringPosition = useSelector(state => state.calcData.steeringPosition);

    const handleModelYearChange = (e) => {
        const selectedValue = e.target.value;
        const importCost = importCostCalculator(selectedValue, engineType, engineSize, usdToGelExchangeRate);
        dispatch(SetModelYear(selectedValue));
        dispatch(SetImportCost(importCost));
    }

    const handleEngineTypeChange = (e) => {
        const selectedValue = e.target.value;
        const importCost = importCostCalculator(selectedValue, selectedValue, engineSize, usdToGelExchangeRate);
        dispatch(SetEngineType(selectedValue));
        dispatch(SetImportCost(importCost));
    }

    const handleEngineSizeChange = (e) => {
        const selectedValue = e.target.value;
        const importCost = importCostCalculator(modelYear, engineType, selectedValue, usdToGelExchangeRate);
        dispatch(SetEngineSize(selectedValue));
        dispatch(SetImportCost(importCost));
    }

    // const handleSteeringPositionChange = (e) => {
    //     const selectedValue = e.target.value;
    //     dispatch(SetSteeringPosition(selectedValue));
    // }

    return (
        <div className="calc-section calc-section-transportation">

            <div className="transposration-header">
                <h2>Import Cost Section:</h2>
            </div>

            <div className='model-year-section'>
                <label>Model Year:</label>
                <select value={modelYear} onChange={(e) => handleModelYearChange(e)}>
                    <option value="Pick a Model Year">Pick a Model Year</option>
                    {modelYears ? modelYears().map(modelYear => <option key={modelYear} value={modelYear}>{modelYear}</option>) : null}
                </select>
            </div>

            <div className="engine-type">
                <label>Engine Type:</label>
                <select value={engineType} onChange={(e) => handleEngineTypeChange(e)}>
                    <option value="Pick an Engine Type">Pick an Engine Type</option>
                    <option value="Gas">Gas</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
            </div>

            <div className="engine-size-section">
                <label>Engine Size:</label>
                <input type="text" value={engineSize} onChange={(e) => handleEngineSizeChange(e)} />
            </div>

            {/* <div className="steering-wheel-postion">
                <label>Steering Position:</label>
                <select value={steeringPosition} onChange={(e) => handleSteeringPositionChange(e)}>
                    <option value="Pick a Steering Position">Pick a Steering Position</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </div> */}

            <div className="import-cost">
                <div className="cost-label">
                    Import Cost:
                </div>
                <div className="cost">
                    {`$${importCost}`}
                </div>
            </div>

        </div>
    );
}
