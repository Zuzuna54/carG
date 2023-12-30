import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { GET_COMPANIES_LIST } from '../../../../../graphql/queries';
import { UPDATE_COMPANY } from '../../../../../graphql/mutations';
import { SetCompaniesList } from '../../../../../redux/actions/companyActions';
import './CreateCompanyForm.scss';

const UpdateCompanyForm = () => {

    const dispatch = useDispatch();
    const companiesList = useSelector(state => state.company.companiesList);
    const [selectedCompanyId, setSelectedCompanyId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        phone: '',
        email: '',
    });
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // Query to get companies list
    const [getCompaniesList, companyData] = useLazyQuery(GET_COMPANIES_LIST, {
        fetchPolicy: "network-only",
        onCompleted: data => {
            if (data.getCompaniesList.result === 'success') {
                dispatch(SetCompaniesList(data.getCompaniesList.data));
            } else {
                setIsError(true);
                setErrorMessage(data.getCompaniesList.message);
            }
        },
        onError: error => {
            console.log(error);
            setIsError(true);
            setErrorMessage("An error occurred while fetching companies.");
        }
    });

    // Use effect to fetch companies list
    useEffect(() => {
        getCompaniesList({
            variables: { status: "ALL" }
        });
    }, [companiesList]);

    // Use effect to update companies list in redux store
    useEffect(() => {

        if (companyData.data && companyData.data.getCompaniesList) {
            dispatch(SetCompaniesList(companyData.data.getCompaniesList.data));
        }

    }, [companyData]);

    // Mutation to update company
    const [updateCompany, { loading }] = useMutation(UPDATE_COMPANY, {
        onCompleted: (data) => {
            if (data.updateCompany.result === 'success') {
                setIsSuccess(true);
                setIsError(false);
                // Optionally, reset form here or perform other actions
                getCompaniesList({
                    variables: { status: "ACTIVE" }
                });
            } else {
                setIsError(true);
                setErrorMessage(data.updateCompany.message);
            }
        },
        onError: (error) => {
            setIsError(true);
            setErrorMessage(error.message);
        },
    });

    // Use effect to set form data when company is selected
    useEffect(() => {
        if (selectedCompanyId && companiesList.length > 0) {
            const company = companiesList.find(c => c.id === selectedCompanyId);
            if (company) {
                setFormData({
                    name: company.name,
                    description: company.description,
                    address: company.address,
                    phone: company.phone,
                    email: company.email,
                });
            }
        }
    }, [selectedCompanyId, companiesList]);

    const handleSelectChange = (e) => {
        setSelectedCompanyId(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add form validation here
        updateCompany({ variables: { ...formData, id: selectedCompanyId } });
        // Handle response
    };


    return (
        <div className="update-company-form">
            <h2>Update Company</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company:</label>
                    <select value={selectedCompanyId} onChange={handleSelectChange}>
                        <option value="">Select a Company</option>
                        {Array.isArray(companiesList) &&
                            companiesList.map((company) => (
                                <option key={company.id} value={company.id}>{company.name}</option>
                            ))}
                    </select>
                </div>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Address:
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Phone:
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <br />
                <button type="submit" disabled={loading}>Update Company</button>
                <div className={isSuccess ? 'success-log success' : 'error-log error'}>
                    {isSuccess ? <p>Company updated successfully!</p> : <p>{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
};

export default UpdateCompanyForm;
