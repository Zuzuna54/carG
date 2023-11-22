import React, { useState } from 'react';

export default function ImportCostSection() {
    const [modelYear, setModelYear] = useState('');
    const [engineSize, setEngineSize] = useState('');

    const calculateImportCost = () => {
        // Implement your logic to calculate the import cost based on modelYear and engineSize
        const importCost = /* Your calculation logic here */
            // Update state or perform any other actions as needed
            console.log('Import Cost:', importCost);
    };

    return (
        <div className="calc-section">
            <label>Model Year:</label>
            <input type="text" value={modelYear} onChange={(e) => setModelYear(e.target.value)} />
            <label>Engine Size:</label>
            <input type="text" value={engineSize} onChange={(e) => setEngineSize(e.target.value)} />
            <button onClick={calculateImportCost}>Calculate Import Cost</button>
        </div>
    );
}
