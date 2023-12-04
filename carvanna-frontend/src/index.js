import App from './App';
import React from 'react';
import './styles/index.css';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    from
} from '@apollo/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LOGIN_USER } from './graphql/mutations';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';


// Set the root element that should be hidden from screen readers
Modal.setAppElement('#root');

// Set up Error Handling
const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            console.log(`Graphql error ${message}`);
            return null;
        });
    }

    if (networkError) {
        console.log(`Network error ${networkError}`);
    }
});

// Set up Link to handle api access with authentication headers
const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
});

const authLink = setContext((_, { headers }) => {
    // Modify headers here
    // Get token from local storage if it exists
    const token = localStorage.getItem('token') || '';
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// Combine errorLink, authLink, and httpLink
const link = from([errorLink, authLink, httpLink]);

// Set up the Apollo client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

// Set up refresh token call with apollo client
const refreshToken = async () => {

    const user = JSON.parse(localStorage.getItem('user')) || null;

    if (user) {
        console.log(user.password)
        client.mutate({
            mutation: LOGIN_USER,
            variables: {
                username: user.username,
                password: user.password,
            },
        }).then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data.login.token);
            localStorage.setItem('user', JSON.stringify(response.data.login.user));
        }).catch((error) => {
            console.log(error);
        });
    }
}

refreshToken();


// Refresh token every 18 minutes
const tokenRefreshInterval = setInterval(() => {

    const token = localStorage.getItem('token');
    if (token) {

        try {

            // const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            // if (decodedToken.lastLogin < currentTime) {
            //     refreshToken();
            // }


        } catch (error) {
            console.error('Error refreshing/decoding token: ', error);
        }

    }

}, 1080000);


ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
