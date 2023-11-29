import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticationStatus } from '../../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import "./Login.scss"

const LoginForm = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoginError, setIsLoginError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dummyCredentials = {
        username: 'Elizbar777',
        password: 'elizbar777',
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here, e.g., send a request to an authentication API
        // Navigate to the dashboard page after successful login with dummy credentials
        if (
            username === dummyCredentials.username &&
            password === dummyCredentials.password
        ) {
            dispatch(setAuthenticationStatus(true));
            navigate('/dashboard/homepage')
        } else {
            setError('Invalid username or password');
            setIsLoginError(true);
        }
    };

    return (
        <form className={isLoginError ? 'error-visible' : ''} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            <div className='error-log'>
                {isLoginError && (
                    <div>
                        <p>{error}</p>
                    </div>
                )}
            </div>

        </form>
    );
};

export default LoginForm;
