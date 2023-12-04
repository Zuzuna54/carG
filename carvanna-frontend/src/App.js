import './styles/App.css';
import React, { useEffect } from "react"
import Router from './Router';
import { setAuthenticationStatus } from './redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    from
} from '@apollo/client';
import { REFRESH_ACCESS_TOKEN } from './graphql/mutations';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';




function App() {

    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.authState.user.accessToken)
    const accessTokenStr = localStorage.getItem('accessToken') || '';

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
        console.log(token);
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
                mutation: REFRESH_ACCESS_TOKEN,
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

        // const token = localStorage.getItem('token');
        // if (token) {

        //     try {

        //         // const decodedToken = jwtDecode(token);
        //         const currentTime = Date.now() / 1000;

        //         // if (decodedToken.lastLogin < currentTime) {
        //         //     refreshToken();
        //         // }


        //     } catch (error) {
        //         console.error('Error refreshing/decoding token: ', error);
        //     }

        // }

    }, 1080000);


    useEffect(() => {

        accessTokenStr ? dispatch(setAuthenticationStatus(true)) : dispatch(setAuthenticationStatus(false))
        console.log(accessTokenStr)

    }, [accessToken, dispatch])

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Router />
            </div>
        </ApolloProvider>
    );
}

export default App;
