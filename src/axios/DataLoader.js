import axios from 'axios';
// import customAxios from './customAxios';

// Define the parameters for the request


// Make a GET request with the defined parameters
// const getData = () => {

//     return customAxios.get('/', { params })
//         .then(response => {
//             console.log('Response:', response.data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });

// }

export const getDataSet = () => {
    return axios
        .get('/apis/dummy_data.json', { params: {} })
        .then((response) => {
            return response.data;
        });
};