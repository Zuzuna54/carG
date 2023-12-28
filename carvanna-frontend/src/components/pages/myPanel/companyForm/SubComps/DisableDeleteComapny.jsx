import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_COMPANY, DISABLE_COMPANY, ENABLE_COMPANY } from '../../../../../graphql/mutations';
import { useSelector, useDispatch } from 'react-redux';
import { SetCompaniesList } from '../../../../../redux/actions/companyActions';
import './CreateCompanyForm.scss';

const DeleteOrDisableCompanyForm = () => {
    const dispatch = useDispatch();
    const companiesList = useSelector(state => state.company.companiesList) || [];
    const [selectedCompanyIdForEnable, setSelectedCompanyIdForEnable] = useState('');
    const [selectedCompanyIdForDisable, setSelectedCompanyIdForDisable] = useState('');
    const [selectedCompanyIdForDelete, setSelectedCompanyIdForDelete] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [disabledCompaniesList, setDisabledCompaniesList] = useState([]);
    const [enabledCompaniesList, setEnabledCompaniesList] = useState([]);

    const [enableCompany, { loading: enabling }] = useMutation(ENABLE_COMPANY, mutationConfig('enable'));
    const [disableCompany, { loading: disabling }] = useMutation(DISABLE_COMPANY, mutationConfig('disable'));
    const [deleteCompany, { loading: deleting }] = useMutation(DELETE_COMPANY, mutationConfig('delete'));

    function mutationConfig(actionType) {
        return {
            onCompleted: (data) => {
                if (actionType === 'delete' && data.deleteCompany.result === 'success') {
                    handleSuccess('deleted');
                    dispatch(SetCompaniesList(companiesList.filter(c => c.id !== selectedCompanyIdForDelete)));
                } else if (actionType === 'disable' && data.disableCompany.result === 'success') {
                    handleSuccess('disabled');
                    const updatedList = companiesList.map(company => {
                        if (company.id === selectedCompanyIdForDisable) {
                            return { ...company, status: 'Disabled' };
                        }
                        return company;
                    });
                    dispatch(SetCompaniesList(updatedList));
                } else if (actionType === 'enable' && data.enableCompany.result === 'success') {
                    handleSuccess('enabled');
                    const updatedList = companiesList.map(company => {
                        if (company.id === selectedCompanyIdForEnable) {
                            return { ...company, status: 'Active' };
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

    const handleSuccess = (action) => {
        setIsSuccess(true);
        setIsError(false);
        setErrorMessage(`Company ${action} successfully!`);
        setSelectedCompanyIdForEnable('');
        setSelectedCompanyIdForDisable('');
        setSelectedCompanyIdForDelete('');
    };

    const handleError = (message) => {
        setIsError(true);
        setErrorMessage(message);
        setIsSuccess(false);
    };

    const handleSubmit = async (e, action) => {
        e.preventDefault();
        let selectedCompanyId;
        switch (action) {
            case 'enable':
                selectedCompanyId = selectedCompanyIdForEnable;
                break;
            case 'disable':
                selectedCompanyId = selectedCompanyIdForDisable;
                break;
            case 'delete':
                selectedCompanyId = selectedCompanyIdForDelete;
                break;
            default:
                handleError('Invalid action');
                return;
        }

        if (!selectedCompanyId) {
            handleError(`Please select a company to ${action}`);
            return;
        }

        switch (action) {
            case 'enable':
                enableCompany({ variables: { id: selectedCompanyId } });
                break;
            case 'disable':
                disableCompany({ variables: { id: selectedCompanyId } });
                break;
            case 'delete':
                deleteCompany({ variables: { id: selectedCompanyId } });
                break;
            default:
                handleError('Invalid action');
        }
    };

    return (
        <div className="delete-disable-enable-company-form">
            <h2>Manage Companies</h2>
            <form>
                <div>
                    <label>Enable Company:</label>
                    <select value={selectedCompanyIdForEnable} onChange={(e) => setSelectedCompanyIdForEnable(e.target.value)}>
                        <option value="">Select a Company</option>
                        {companiesList?.filter(company => company.status === 'Disabled').map(company => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                    </select>
                    <button onClick={(e) => handleSubmit(e, 'enable')} disabled={enabling}>Enable</button>
                </div>
                <div>
                    <label>Disable Company:</label>
                    <select value={selectedCompanyIdForDisable} onChange={(e) => setSelectedCompanyIdForDisable(e.target.value)}>
                        <option value="">Select a Company</option>
                        {companiesList.filter(company => company.status === 'Active').map(company => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                    </select>
                    <button onClick={(e) => handleSubmit(e, 'disable')} disabled={disabling}>Disable</button>
                </div>
                <div>
                    <label>Delete Company:</label>
                    <select value={selectedCompanyIdForDelete} onChange={(e) => setSelectedCompanyIdForDelete(e.target.value)}>
                        <option value="">Select a Company</option>
                        {companiesList.map(company => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                    </select>
                    <button onClick={(e) => handleSubmit(e, 'delete')} disabled={deleting}>Delete</button>
                </div>
                <div className={isSuccess ? 'success-log success' : 'error-log error'}>
                    {isSuccess ? <p>{errorMessage}</p> : <p>{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
};

export default DeleteOrDisableCompanyForm;
