import React, { useState } from 'react';
import Button from '../../utils/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import PropTypes from "prop-types";
import setJwtToken from '../../utils/setJwtToken';
import { register } from '../../actions/userAction';

const Register = ({ register }) => {
    const [registerUser, setRegisterUser] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = registerUser;

        if (password !== confirmPassword) {
            setErrorMessage('Confirm password does not match');
        } else {
            try {
                const res = await axios.post('/api/users/register', registerUser);
                const { userdata } = res.data;
                localStorage.setItem("token", userdata);
                setJwtToken(userdata);
                const decodedToken = jwt_decode(userdata);
                register(decodedToken.user);
            } catch (error) {
                console.log(error);
                setErrorMessage('Register failed');
            }
        }
    }

    const handleChange = (e) => {
        setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
        setErrorMessage(null);
    }

    return (
        <div className='page_wrapper'>
            <div className='container'>
                <div className='register_login_container'>
                    <div className='left'>
                        <form onSubmit={onSubmit}>
                            <h2>Personal information</h2>
                            <div className='form_block_two'>
                                <div className='block'>
                                    <input
                                        type='text'
                                        name='name'
                                        value={registerUser.name}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter your name'
                                    />
                                </div>
                                <div className='block'>
                                    <input
                                        type='text'
                                        name='lastname'
                                        value={registerUser.lastname}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter your lastname'
                                    />
                                </div>
                            </div>

                            <div>
                                <input
                                    type='email'
                                    name='email'
                                    value={registerUser.email}
                                    onChange={handleChange}
                                    required
                                    placeholder='Enter your email'
                                />
                            </div>

                            <h2>Verify password</h2>
                            <div className='form_block_two'>
                                <div className='block'>
                                    <input
                                        type='password'
                                        name='password'
                                        value={registerUser.password}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter your password'
                                    />
                                </div>
                                <div className='block'>
                                    <input
                                        type='password'
                                        name='confirmPassword'
                                        value={registerUser.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder='Enter your password again'
                                    />
                                </div>
                            </div>
                            {errorMessage && <div className='error_label'>{errorMessage}</div>}
                            <Button
                                type='submit'
                                title='register'
                                addStyles={{
                                    margin: '10px 0 0 0'
                                }}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

Register.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(null, { register })(Register);