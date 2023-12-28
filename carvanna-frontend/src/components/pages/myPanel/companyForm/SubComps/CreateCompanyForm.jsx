import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_COMPANY } from "../../../../../graphql/mutations";
import { GET_COMPANIES_LIST } from '../../../../../graphql/queries';
import { useDispatch } from "react-redux";
import { SetCompaniesList } from '../../../../../redux/actions/companyActions';
import Cookies from "js-cookie";
import './CreateCompanyForm.scss';

const CompanyForm = () => {

    const dispatch = useDispatch();
    const [getCompaniesList, companyData] = useLazyQuery(GET_COMPANIES_LIST,
        {
            fetchPolicy: "network-only"
        });
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

    const [createCompany, { loading }] = useMutation(CREATE_COMPANY, {
        onCompleted: (data) => {

            if (data.createCompany.result === 'success') {

                //Handle success and reset form here, e.g., show a success message and then reset form.
                setIsSuccess(true);
                setIsError(false);
                setFormData({ name: '', description: '', address: '', phone: '', email: '' });

                // Optionally, fetch companies list again or update redux state}
                getCompaniesList();

            }

            if (data.createCompany.result === 'failed') {
                setIsError(true);
                setErrorMessage(data.createCompany.message);
            }

        },
        onError: (error) => {
            setIsError(true);
            setErrorMessage(error.message);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.address || !formData.phone || !formData.email) {
            setIsError(true);
            setErrorMessage('All fields must be filled');
            return;
        }
        createCompany({ variables: formData });
    };

    useEffect(() => {

        if (companyData.data && companyData.data.getCompaniesList) {
            dispatch(SetCompaniesList(companyData.data.getCompaniesList.data));
        }

    }, [companyData]);

    return (
        <div className="company-form">
            <h2>Create Company</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" disabled={loading}>Create Company</button>
                <div className={isSuccess ? 'success-log success' : 'error-log error'}>
                    {isSuccess ? <p>Company created successfully!</p> : <p>{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
};

export default CompanyForm;



