import axios from 'axios';
import customAxios from './customAxios';

// Define the parameters for the request
const params = {
    type: 'CustomerCosts',
    location: 211,
    sedan: 1,
    suv: 0,
    petrol: 1,
    diesel: 0,
    hybrid: 0,
    electric: 0,
    hasengine: 0,
    price: 10000,
    year: 2017,
    capacity: 2200,
};

// Make a GET request with the defined parameters
const getData = () => {

    return customAxios.get('/', { params })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

export const getDataSet = () => {
    return axios
        .get('/apis/dummy_data.json', { params: {} })
        .then((response) => {
            return response.data;
        });
};