import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticationStatus, setUser } from '../../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../graphql/mutations';
import Cookies from 'js-cookie';
import './Login.scss';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginUser] = useMutation(LOGIN_USER);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginError, setIsLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await loginUser({
                variables: { username, password },
            });

            if (data.logInUser.error) {
                setIsLoginError(true);
                setErrorMessage(data.logInUser.message || 'Login failed. Please check your credentials.');
                return;
            }

            if (!data.logInUser.error) {
                setIsLoginError(false);

                const accessToken = data.logInUser.accessToken;
                const refreshToken = data.logInUser.refreshToken;
                Cookies.set('accessToken', accessToken);
                Cookies.set('refreshToken', refreshToken);

                dispatch(setAuthenticationStatus(true));
                dispatch(setUser(data.logInUser));

                navigate('/dashboard/homepage');
            }

        } catch (error) {
            console.error('Login error:', error.message);
            setIsLoginError(true);
            setErrorMessage('An error occurred during login. Please try again.');
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
            <div className="error-log">
                {isLoginError && (
                    <div>
                        <p>Login failed. Please check your credentials.</p>
                    </div>
                )}
            </div>
        </form>
    );
};

export default LoginForm;
