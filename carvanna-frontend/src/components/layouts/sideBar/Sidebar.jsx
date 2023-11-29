import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalculatorIcon from '@mui/icons-material/Calculate';  // Corrected import
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SettingsIcon from '@mui/icons-material/Settings';
import './SideBar.scss';

export default function SideBar() {
    const navigate = useNavigate();

    return (
        <div className='sideBar'>
            <List className='nav-menu'>
                <div className='line-div'>
                    <div className='liner'></div>
                </div>

                {/* Home */}
                <ListItem button onClick={() => navigate('/dashboard/homepage')}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>

                {/* Calculator */}
                <ListItem button onClick={() => navigate('/dashboard/calculator')}>
                    <ListItemIcon>
                        <CalculatorIcon />
                    </ListItemIcon>
                    <ListItemText primary='Calculator' />
                </ListItem>

                {/* About Us */}
                <ListItem button onClick={() => navigate('/dashboard/about-us')}>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary='About Us' />
                </ListItem>

                {/* Contact Us/Support */}
                <ListItem button onClick={() => navigate('/dashboard/contact-us')}>
                    <ListItemIcon>
                        <ContactSupportIcon />
                    </ListItemIcon>
                    <ListItemText primary='Contact Us/Support' />
                </ListItem>

                {/* Settings */}
                <ListItem button onClick={() => navigate('/dashboard/settings')}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary='Settings' />
                </ListItem>

                <div className='line-div'>
                    <div className='liner'></div>
                </div>
            </List>
        </div>
    );
}
