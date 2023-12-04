import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COMPANY } from "../../../../graphql/mutations";

const CompanyForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        phone: '',
        email: '',
    });

    const [createCompany, { loading, error }] = useMutation(CREATE_COMPANY);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createCompany({ variables: formData });
            console.log('Company created:', data.createCompany);
            // You can handle success, e.g., show a success message or redirect to another page.
        } catch (error) {
            console.error('Error creating company:', error);
            // You can handle errors, e.g., display an error message to the user.
        }
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
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

export default CompanyForm;