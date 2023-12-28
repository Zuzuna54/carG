import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GET_COMPANIES_LIST } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';
import { SetCompaniesList } from '../../../redux/actions/companyActions';

const MyPanel = () => {

    const navigate = useNavigate();

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
                    <Button className='btn btn-primary' variant='contained' onClick={() => navigate('/dashboard/my-panel/company-actions')}>Company Actions</Button>
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