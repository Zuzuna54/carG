import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMPANY } from "../../../../graphql/mutations";
import { GET_COMPANIES_LIST } from '../../../../graphql/queries';
import { useDispatch, useSelector } from "react-redux";
import { SetCompaniesList } from '../../../../redux/actions/companyActions';

const CompanyForm = () => {
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

    const dispatch = useDispatch();
    const companiesList = useSelector(state => state.company.companiesList);


    const { error: queryError, data: queryData } = useQuery(GET_COMPANIES_LIST, {
        skip: companiesList.length < 0,
    });

    console.log('Companies list:', queryData);


    useEffect(() => {
        if (queryData) {
            dispatch(SetCompaniesList(queryData.getCompaniesList.data));
        }
    }, [queryData, dispatch]);

    const [createCompany, { loading }] = useMutation(CREATE_COMPANY, {
        onCompleted: (data) => {
            setIsSuccess(true);
            setIsError(false);
            setFormData({ name: '', description: '', address: '', phone: '', email: '' });
            // Optionally, fetch companies list again or update redux state
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

    return (
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
            <div className={isSuccess ? 'success-log' : 'error-log'}>
                {isSuccess ? (
                    <p>Company created successfully!</p>
                ) : isError && (
                    <p>{errorMessage}</p>
                )}
            </div>
        </form>
    );
};

export default CompanyForm;
