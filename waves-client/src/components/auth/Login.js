import React, { useState, useEffect } from 'react';
import Button from '../../utils/Button';

const Login = () => {
    const [loginUser, setLoginUser] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const onLogin = (e) => {
        e.preventDefault();

    }

    const handleChange = (e) => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
        setErrorMessage(null);
    }

    return (
        <div className='page_wrapper'>
            <div className='container'>
                <div className='register_login_container'>
                    <div className='left'>
                        <h1>New Customers</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <Button
                            type='default'
                            title='Create an account'
                            linkTo='/register'
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className='right'>
                        <h2>Registered Customers</h2>
                        <p>If you have an account please login</p>
                        <div>
                            <form onSubmit={onLogin}>
                                <input
                                    type='email'
                                    name='email'
                                    value={loginUser.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type='password'
                                    name='password'
                                    value={loginUser.password}
                                    onChange={handleChange}
                                    required
                                />
                                <Button
                                    type='submit'
                                    title='LOGIN'
                                    addStyles={{
                                        margin: '10px 0 0 0'
                                    }}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
