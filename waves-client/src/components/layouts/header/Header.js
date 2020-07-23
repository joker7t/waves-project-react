import React, { useEffect } from 'react';
import { setUserDetails, login } from '../../../actions/userAction';
import setJwtToken from '../../../utils/setJwtToken';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Header = ({ setUserDetails, userDetails, user, login }) => {

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
    }, [user]);

    const showUserCart = () => {
        let count = 0;
        userDetails && userDetails.carts.forEach(cart => {
            if (cart.quantity) {
                count = count + cart.quantity;
            } else {
                count++;
            }
        });
        return count;
    }

    const buildPrivateLinks = () => {
        if (user) {
            return <React.Fragment>
                <Link to='/user/cart' className='cart_link'>
                    My Cart <span>{showUserCart()}</span>
                </Link>
                <Link to='/user/dashboard'>
                    My Account
                </Link>
                <span onClick={onLogout} className='log_out_link'>
                    Logout
                </span>
            </React.Fragment>
        } else {
            return <Link to='/login'>
                Login
            </Link>
        }
    }

    const onLogout = () => {
        localStorage.removeItem("token");
        setJwtToken(false);
        login(null);
        setUserDetails(null);
    }

    return (
        <header className='bck_b_light'>
            <div className='container' style={{ height: '100%' }}>
                <div className='left'>
                    <div className='logo' style={{ cursor: 'pointer' }}>
                        <Link to='/' style={{ marginLeft: '0px' }}>
                            Waves
                        </Link>
                    </div>
                </div>
                <div className='right'>
                    <div className='top'>
                        {buildPrivateLinks()}
                    </div>
                    <div className='bottom'>
                        <Link to='/'>
                            Home
                        </Link>
                        <Link to='/shop'>
                            Guitars
                        </Link>
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

export default connect(mapStateToProps, { setUserDetails, login })(Header);
