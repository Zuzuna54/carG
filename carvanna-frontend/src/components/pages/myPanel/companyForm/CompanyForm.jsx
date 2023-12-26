import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_COMPANY } from "../../../../graphql/mutations";
import { GET_COMPANIES_LIST } from '../../../../graphql/queries';
import { useDispatch } from "react-redux";
import { SetCompaniesList } from '../../../../redux/actions/companyActions';
import './CompanyForm.scss';

const CompanyForm = () => {

    const dispatch = useDispatch();
    const [getCompaniesList, companyData] = useLazyQuery(GET_COMPANIES_LIST);
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


const CompanyForm1 = ({ action, selectedCompany }) => {
    const dispatch = useDispatch();
    const [getCompaniesList, companyData] = useLazyQuery(GET_COMPANIES_LIST);
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

    const [createCompany, { loading: creating }] = useMutation(CREATE_COMPANY, {
        onCompleted: (data) => handleResponse(data.createCompany),
        onError: (error) => handleError(error),
    });
    const [updateCompany, { loading: updating }] = useMutation(UPDATE_COMPANY, {
        onCompleted: (data) => handleResponse(data.updateCompany),
        onError: (error) => handleError(error),
    });
    const [disableCompany, { loading: disabling }] = useMutation(DISABLE_COMPANY, {
        onCompleted: (data) => handleResponse(data.disableCompany),
        onError: (error) => handleError(error),
    });
    const [deleteCompany, { loading: deleting }] = useMutation(DELETE_COMPANY, {
        onCompleted: (data) => handleResponse(data.deleteCompany),
        onError: (error) => handleError(error),
    });

    useEffect(() => {
        if (action === 'update' && selectedCompany) {
            setFormData({ ...selectedCompany });
        }
    }, [action, selectedCompany]);

    useEffect(() => {
        if (companyData.data && companyData.data.getCompaniesList) {
            dispatch(SetCompaniesList(companyData.data.getCompaniesList.data));
        }
    }, [companyData, dispatch]);

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

        const variables = action === 'create' || action === 'update' ? formData : { id: formData.id };

        try {
            if (action === 'create') {
                await createCompany({ variables });
            } else if (action === 'update') {
                await updateCompany({ variables });
            } else if (action === 'disable') {
                await disableCompany({ variables });
            } else if (action === 'delete') {
                await deleteCompany({ variables });
            }
        } catch (error) {
            // Error handling is already set up in onError
        }
    };

    const handleResponse = (response) => {
        if (response.result === 'success') {
            setIsSuccess(true);
            setIsError(false);
            setFormData({ name: '', description: '', address: '', phone: '', email: '' });
            getCompaniesList();
        } else {
            setIsError(true);
            setErrorMessage(response.message);
        }
    };

    const handleError = (error) => {
        setIsError(true);
        setErrorMessage(error.message || 'Operation failed');
    };

    const isLoading = creating || updating || disabling || deleting;

    return (
        <div className="company-form">
            <h2>{action.charAt(0).toUpperCase() + action.slice(1)} Company</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields rendering based on the action */}
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
                <button type="submit" disabled={isLoading}>
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                </button>
                <div className={isSuccess ? 'success-log success' : 'error-log error'}>
                    {isSuccess ? <p>Operation successful!</p> : <p>{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
};

// export default CompanyForm1;
