import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../../../../graphql/mutations';
import { GET_COMPANIES_LIST } from '../../../../graphql/queries';
import { useDispatch } from 'react-redux';
import './UserForm.scss';

const UserForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        email: '',
        username: '',
        userType: 'COMPANY_ADMIN',
        companyId: '',
    });
    const { loading, error: queryError, data } = useQuery(GET_COMPANIES_LIST);
    const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data: userData } = await createUser({
                variables: { ...formData },
            });

            if (userData.createUser.result === 'success') {
                setIsSuccess(true);
                setIsError(false);
                setFormData({ password: '', email: '', username: '', userType: 'COMPANY_ADMIN', companyId: '' });

                navigate('/dashboard/my-panel');
            } else {
                setIsError(true);
                setErrorMessage(userData.createUser.message);
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage(error.message || 'Error creating user');
        }
    };

    return (
        <div className='user-form'>
            <h2>Create User</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>User Type:</label>
                    <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleInputChange}
                    >
                        <option value="COMPANY_ADMIN">Company Admin</option>
                        <option value="COMPANY_USER">Company User</option>
                        {/* Add other user types as needed */}
                    </select>
                </div>
                <div>
                    <label>Company:</label>
                    <select
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a company</option>
                        {!loading &&
                            data.getCompaniesList.data &&
                            data.getCompaniesList.data.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                    </select>
                </div>

                <button type="submit" disabled={creatingUser}>Create User</button>
                <div className={isSuccess ? 'success-log success' : 'error-log error'}>
                    {isSuccess ? (
                        <p>User created successfully!</p>
                    ) : isError && (
                        <p>{errorMessage}</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UserForm;

