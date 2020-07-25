import React, { useState } from 'react';
import UserLayout from './UserLayout';
import { connect } from 'react-redux';
import Loader from '../../../utils/Loader';
import Button from '../../../utils/Button';
import axios from 'axios';

const UserInformation = ({ userDetails }) => {
    const [sumitedUser, setSubmitedUser] = useState({
        email: '',
        password: '',
        name: '',
        lastname: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        setSubmitedUser({ ...sumitedUser, [e.target.name]: e.target.value });
        setErrorMessage(null);
    }

    const onSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div>
            <UserLayout>
                {userDetails ?
                    <div style={{ paddingRight: '10px', marginLeft: '20px' }}>
                        <h1>User Profile</h1>
                        <form onSubmit={onSubmit}>
                            <input
                                type='email'
                                name='email'
                                value={sumitedUser.email}
                                onChange={handleChange}
                                required
                                placeholder='Enter your email'
                            />
                            <input
                                type='password'
                                name='password'
                                value={sumitedUser.password}
                                onChange={handleChange}
                                required
                                placeholder='Enter your password'
                            />
                            {errorMessage && <div className='error_label'>{errorMessage}</div>}
                            <Button
                                type='submit'
                                title='UPDATE'
                                addStyles={{
                                    margin: '10px 0 0 0',
                                    padding: '10px 20px 10px 20px'
                                }}
                            />
                        </form>
                    </div>
                    :
                    <Loader />
                }
            </UserLayout>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userDetails: state.auth.userDetails
});

export default connect(mapStateToProps, null)(UserInformation);
