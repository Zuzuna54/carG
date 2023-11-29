import axios from 'axios';

// Function to create a generic Axios instance with custom configuration
const createCustomAxios = (baseURL, headers) => {
    return axios.create({
        baseURL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers, // Spread the custom headers
        },
    });
};

// Example usage:
const customAxios = createCustomAxios(`${window.location.origin}/api`, {});

export default customAxios;
