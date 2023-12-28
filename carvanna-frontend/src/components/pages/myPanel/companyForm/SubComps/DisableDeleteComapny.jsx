import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_COMPANY, DISABLE_COMPANY } from '../../../../../graphql/mutations';
import { useSelector, useDispatch } from 'react-redux';
import { SetCompaniesList } from '../../../../../redux/actions/companyActions';
import './CreateCompanyForm.scss';

const DeleteOrDisableCompanyForm = () => {
    const dispatch = useDispatch();
    const companiesList = useSelector(state => state.company.companiesList);
    const [selectedCompanyId, setSelectedCompanyId] = useState('');
    const [action, setAction] = useState('disable'); // 'delete' or 'disable'
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const [deleteCompany, { loading: deleting }] = useMutation(DELETE_COMPANY, mutationConfig('delete'));
    const [disableCompany, { loading: disabling }] = useMutation(DISABLE_COMPANY, mutationConfig('disable'));

    function mutationConfig(actionType) {
        return {
            onCompleted: (data) => {
                if (actionType === 'delete' && data.deleteCompany.result === 'success') {
                    handleSuccess();
                    dispatch(SetCompaniesList(companiesList.filter(c => c.id !== selectedCompanyId)));
                } else if (actionType === 'disable' && data.disableCompany.result === 'success') {
                    handleSuccess();
                    const updatedList = companiesList.map(company => {
                        if (company.id === selectedCompanyId) {
                            return { ...company, status: 'Disabled' };
                        }
                        return company;
                    });
                    dispatch(SetCompaniesList(updatedList));
                } else {
                    handleError(data[actionType + 'Company'].message);
                }
            },
            onError: (error) => {
                handleError(error.message);
            }
        };
    }

    const handleSuccess = () => {
        setIsSuccess(true);
        setIsError(false);
        setSelectedCompanyId('');
    };

    const handleError = (message) => {
        setIsError(true);
        setErrorMessage(message);
        setIsSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCompanyId) {
            handleError(`Please select a company to ${action}`);
            return;
        }
        if (action === 'delete') {
            deleteCompany({ variables: { id: selectedCompanyId } });
        } else {
            disableCompany({ variables: { id: selectedCompanyId } });
        }
    };

    return (
        <div className="delete-disable-company-form">
            <h2>{action === 'delete' ? 'Delete' : 'Disable'} Company</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company:</label>
                    <select value={selectedCompanyId} onChange={(e) => setSelectedCompanyId(e.target.value)}>
                        <option value="">Select a Company</option>
                        {companiesList.map(company => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Action:</label>
                    <select value={action} onChange={(e) => setAction(e.target.value)}>
                        <option value="disable">Disable</option>
                        <option value="delete">Delete</option>
                    </select>
                </div>
                <button type="submit" disabled={deleting || disabling}>
                    {action === 'delete' ? 'Delete' : 'Disable'} Company
                </button>
                <div className={isSuccess ? 'success-log success' : 'error-log error'}>
                    {isSuccess ? <p>Company {action === 'delete' ? 'deleted' : 'disabled'} successfully!</p> : <p>{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
};

export default DeleteOrDisableCompanyForm;
