import './styles/App.css';
import React, { useEffect } from "react"
import Router from './Router';
import { setAuthenticationStatus } from './redux/actions/authActions';
import { useDispatch } from 'react-redux';


function App() {

    const dispatch = useDispatch()
    const storedToken = localStorage.getItem('token')

    useEffect(() => {

        storedToken ? dispatch(setAuthenticationStatus(true)) : dispatch(setAuthenticationStatus(false))

    }, [storedToken, dispatch])

    return (
        <div className="App">
            <Router />
        </div>
    );
}

export default App;
