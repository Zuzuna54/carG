import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import Modal from 'react-modal';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    from
} from '@apollo/client';
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

const link = from([errorLink, authLink, httpLink]);

// Set up the Apollo client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

// Set up refresh token call with apollo client



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
