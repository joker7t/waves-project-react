import React, { useEffect } from 'react';
import { setUserDetails } from '../../../actions/userAction';
import { connect } from 'react-redux';
import axios from 'axios';

const Header = ({ setUserDetails, userDetails, user }) => {
    // const [userInfo, setIserInfo]

    useEffect(() => {
        const loadUserDetails = async () => {
            if (user) {
                try {
                    const userInfo = await axios.get('/api/users/auth');
                    setUserDetails(userInfo.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        loadUserDetails();

        //eslint-disable-next-line
    }, []);

    return (
        <header className='bck_b_light'>
            <div className='container' style={{ height: '100%' }}>
                <div className='left'>
                    <div className='logo'>
                        Waves
                    </div>
                </div>
                <div className='right'>
                    <div className='top'>
                        top
                    </div>
                    <div className='bottom'>
                        bottom
                    </div>
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    userDetails: state.auth.userDetails
});

export default connect(mapStateToProps, { setUserDetails })(Header);
