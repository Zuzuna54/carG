import './styles/App.css';
import React from "react"
import Router from './Router';
import { useSelector } from 'react-redux';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    from
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';


function App() {

    // const accessToken = useSelector(state => state.authState.user.accessToken)
    const accessToken = Cookies.get('accessToken');

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



    // Set up Link to handle authentication headers
    const authLink = setContext((_, { headers }) => {
        // Modify headers here
        // Get token from local storage if it exists
        const token = accessToken;

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

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Router />
            </div>
        </ApolloProvider>
    );
}

export default App;
