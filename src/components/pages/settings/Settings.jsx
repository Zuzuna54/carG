import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLogo, updateAppColor } from '../../../redux/actions//settingsActions';
import './Settings.scss';

const Settings = () => {
    const dispatch = useDispatch();
    const { appColor, logo } = useSelector((state) => state.settings);

    const [newLogo, setNewLogo] = useState(logo);
    const [newAppColor, setNewAppColor] = useState(appColor);

    const handleLogoChange = (e) => {
        // Update local state
        setNewLogo(e.target.value);
    };

    const handleColorChange = (e) => {
        // Update local state
        setNewAppColor(e.target.value);
    };

    const handleSaveChanges = () => {
        // Dispatch actions to update global state
        dispatch(updateLogo(newLogo));
        dispatch(updateAppColor(newAppColor));

        // You can also save the changes to a backend or localStorage
        // ...

        // Optionally, provide user feedback (e.g., success message)
        alert('Settings saved successfully!');
    };

    return (
        <div className="settings-container">
            <h2>App Settings</h2>
            <div>
                <label htmlFor="logo">App Logo:</label>
                <input
                    type="text"
                    id="logo"
                    value={newLogo}
                    onChange={handleLogoChange}
                    placeholder="Enter new logo URL"
                />
            </div>
            <div>
                <label htmlFor="color">App Color:</label>
                <input
                    type="color"
                    id="color"
                    value={newAppColor}
                    onChange={handleColorChange}
                />
            </div>
            <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    )
};

export default Settings;
