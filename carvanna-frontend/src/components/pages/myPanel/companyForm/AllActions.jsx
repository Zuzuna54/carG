import React from "react";
import CompanyForm from "./SubComps/CreateCompanyForm";
import UpdateCompanyForm from "./SubComps/UpdateCompanyForm";
import DeleteOrDisableCompanyForm from "./SubComps/DisableDeleteComapny";
import './AllCompanyActions.scss';

function AllCompanyActions() {
    return (
        <div className="company-actions">
            <CompanyForm />
            <UpdateCompanyForm />
            <DeleteOrDisableCompanyForm />
        </div>
    );
}

export default AllCompanyActions;