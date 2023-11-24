import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetModelYear, SetEngineType, SetEngineSize, SetSteeringPosition } from '../../../../../redux/actions/calcActions';
import { modelYears, importCostCalculator } from './ImportCostUtils';
import './ImportCostSection.scss';


export default function ImportCostSection() {

    const dispatch = useDispatch();
    const modelYear = useSelector(state => state.calcData.modelYear);
    const engineType = useSelector(state => state.calcData.engineType);
    const engineSize = useSelector(state => state.calcData.engineSize);
    const steeringPosition = useSelector(state => state.calcData.steeringPosition);
    const state = useSelector(state => state);
    console.log('state', engineSize);

    console.log(importCostCalculator(modelYear, engineType, engineSize, steeringPosition))

    const calculateImportCost = () => {
        // Implement your logic to calculate the import cost based on modelYear and engineSize
        const importCost = 0/* Your calculation logic here */
        // Update state or perform any other actions as needed
        console.log('Import Cost:', importCost);
    };

    const handleModelYearChange = (e) => {
        const selectedValue = e.target.value;
        dispatch(SetModelYear(selectedValue));
        dispatch(SetEngineType('Pick an Engine Type'));
        dispatch(SetEngineSize(undefined));
        dispatch(SetSteeringPosition('Pick a Steering Position'));
    }

    const handleEngineTypeChange = (e) => {
        const selectedValue = e.target.value;
        dispatch(SetEngineType(selectedValue));
        dispatch(SetEngineSize(undefined));
        dispatch(SetSteeringPosition('Pick a Steering Position'));
    }

    const handleEngineSizeChange = (e) => {
        const selectedValue = e.target.value;
        dispatch(SetEngineSize(selectedValue));
        dispatch(SetSteeringPosition('Pick a Steering Position'));
    }

    const handleSteeringPositionChange = (e) => {
        const selectedValue = e.target.value;
        console.log('selectedValue', selectedValue);
        dispatch(SetSteeringPosition(selectedValue));
    }



    return (
        <div className="calc-section">

            <div className='model-year-section'>
                <label>Model Year:</label>
                <select value={modelYear} onChange={(e) => handleModelYearChange(e)
                }>
                    <option value="Pick a Model Year">Pick a Model Year</option>
                    {modelYears ? modelYears.map(modelYear => <option key={modelYear} value={modelYear}>{modelYear}</option>) : null}
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

            <div className="steering-wheel-postion">
                <label>Steering Position:</label>
                <select value={steeringPosition} onChange={(e) => handleSteeringPositionChange(e)}>
                    <option value="Pick a Steering Position">Pick a Steering Position</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </div>

            <div className="import-cost">
                <div className="cost-label">
                    Import Cost:
                </div>
                <div className="cost">
                    {`$0`}
                </div>
            </div>

        </div>
    );
}
