import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../../../../graphql/mutations';
import { GET_COMPANIES_LIST } from '../../../../graphql/queries';



const UserForm = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        email: '',
        username: '',
        userType: 'COMPANY_ADMIN',
        companyId: '',
    });

    const { loading, error, data } = useQuery(GET_COMPANIES_LIST);

    const [createUser] = useMutation(CREATE_USER);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data: userData } = await createUser({
                variables: { ...formData },
            });

            console.log('User created:', userData.createUser);

            //Handle success here, e.g., show a success message and then redirect to another page.
            alert('User created successfully!');

            navigate('/dashboard/my-panel');

        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleFormSubmit}>
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
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
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
                            data &&
                            data.getCompaniesList.data.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div>
                    <button type="submit">Create User</button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;