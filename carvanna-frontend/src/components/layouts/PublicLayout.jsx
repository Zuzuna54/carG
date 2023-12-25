import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './sideBar/Sidebar';
import Header from './header/Header';
import './Layout.scss';
import { REFRESH_ACCESS_TOKEN } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';

function PublicLayout() {

    // // refresh token
    // const [refreshAccessToken] = useMutation(REFRESH_ACCESS_TOKEN);

    // React.useEffect(() => {
    //     const timeout = setTimeout(async () => {
    //         try {
    //             const { data } = await refreshAccessToken();
    //             console.log(data)
    //             const accessToken = data.refreshAccessToken.accessToken;
    //             localStorage.setItem('accessToken', accessToken);
    //         } catch (error) {
    //             console.error('Error refreshing access token:', error.message);
    //         }
    //     }, 500); // Refresh the access token every 14 minutes

    //     // return () => clearTimeout(timeout); // Cleanup the timeout on unmount
    // }, [refreshAccessToken]);

    return (
        <div className='main-page'>
            <Header />
            <div className='main-page-content'>

                <SideBar />
                <div className='mainPage-content-container'>
                    <Outlet />
                </div>
            </div>

        </div>

    );
}

export default PublicLayout;
