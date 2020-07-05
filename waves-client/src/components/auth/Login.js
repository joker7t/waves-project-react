import React, { useState } from 'react';
import Button from '../../utils/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import PropTypes from "prop-types";
import setJwtToken from '../../utils/setJwtToken';
import { login } from '../../actions/userAction';

const Login = ({ login }) => {
    const [loginUser, setLoginUser] = useState({
        email: 'toan@gmail.com',
        password: '123456'
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', loginUser);
            const { userdata } = res.data;
            localStorage.setItem("token", userdata);
            setJwtToken(userdata);
            const decodedToken = jwt_decode(userdata);
            login(decodedToken.user);
        } catch (error) {
            console.log(error);
            setErrorMessage('Wrong Credentials');
        }
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
                                    placeholder='Enter your email'
                                />
                                <input
                                    type='password'
                                    name='password'
                                    value={loginUser.password}
                                    onChange={handleChange}
                                    required
                                    placeholder='Enter your password'
                                />
                                {errorMessage && <div className='error_label'>{errorMessage}</div>}
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

Login.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(Login);
