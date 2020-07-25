import React, { useState, useEffect } from 'react';
import UserLayout from './UserLayout';
import { connect } from 'react-redux';
import Loader from '../../../utils/Loader';
import Button from '../../../utils/Button';
import axios from 'axios';
import { setUserDetails } from '../../../actions/userAction';

const UserInformation = ({ userDetails, setUserDetails }) => {
    const [sumitedUser, setSubmitedUser] = useState({
        email: '',
        name: '',
        lastname: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        userDetails && setSubmitedUser({
            ...sumitedUser,
            email: userDetails.email,
            name: userDetails.name,
            lastname: userDetails.lastname
        });
        //eslint-disable-next-line
    }, [userDetails]);

    const handleChange = (e) => {
        setSubmitedUser({ ...sumitedUser, [e.target.name]: e.target.value });
        setErrorMessage(null);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/update-profile', sumitedUser);
            setUserDetails(res.data);
            setSuccessMessage('Update successfully');
            setErrorMessage(null);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.log(error);
            setErrorMessage('Update failed');
        }
    }

    return (
        <div>
            <UserLayout>
                {userDetails ?
                    <div style={{ paddingRight: '10px', marginLeft: '20px' }}>
                        <h1>User Profile</h1>
                        <form onSubmit={onSubmit}>
                            <input
                                type='text'
                                name='name'
                                value={sumitedUser.name}
                                onChange={handleChange}
                                required
                                placeholder='Enter your name'
                            />
                            <input
                                type='text'
                                name='lastname'
                                value={sumitedUser.lastname}
                                onChange={handleChange}
                                required
                                placeholder='Enter your lastname'
                            />
                            <input
                                type='email'
                                name='email'
                                value={sumitedUser.email}
                                onChange={handleChange}
                                required
                                placeholder='Enter your email'
                            />
                            {errorMessage && <div className='error_label'>{errorMessage}</div>}
                            {successMessage && <div className='form_success'>{successMessage}</div>}
                            <Button
                                type='submit'
                                title='UPDATE PERSONAL INFO'
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

export default connect(mapStateToProps, { setUserDetails })(UserInformation);
