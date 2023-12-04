import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyPanel = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    if (loading) {
        // return <Loading />
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>My Panel</h1>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h3>Company Actions</h3>
                    <Button className='btn btn-primary' variant='contained' onClick={() => navigate('/dashboard/my-panel/create-company')}>Create Company</Button>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h3>User Actions</h3>
                    <Button className='btn btn-primary' variant='contained' onClick={() => navigate('/dashboard/my-panel/create-user')}>Create User</Button>
                    <hr />
                </div>
            </div>
        </div>
    );
}
export default MyPanel;